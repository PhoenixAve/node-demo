/**
 * 按指定最大执行数量在空闲时间执行函数，避免影响主线程渲染
 */
"use strict";
// requestIdleCallback的兼容性处理
if (typeof globalThis.requestIdleCallback !== 'function') {
    globalThis.requestIdleCallback = function (handler) {
        const startTime = Date.now();
        return setTimeout(() => {
            handler({
                didTimeout: false,
                timeRemaining: () => {
                    return Math.max(0, 50.0 - (Date.now() - startTime));
                }
            });
        }, 1);
    };
}
/**
 * 按照最大并行执行数量批量执行非主要任务
 * 文档：https://km.sankuai.com/collabpage/1387072510
 */
class RestrictedTaskQueue {
    #tasks = [];
    #limit = 1;
    #options = {
        runType: 'requestIdleCallback',
    };
    #results = [];
    #isAbort = false;
    #runMode = '';
    #runningCount = 0;
    #hasRun = false;
    #runningIndex = 0;
    constructor(limit = 1, options) {
        this.#limit = limit || 1;
        Object.assign(this.#options, options);
    }
    // 一次性设置任务
    setTasks(tasks) {
        this.#tasks = tasks;
        this.#results = [];
    }
    // 一个个添加任务
    add(task) {
        this.#tasks.push(task);
    }
    #runnAble(runMode) {
        return !this.#runMode || this.#runMode === runMode;
    }
    addAndRun(task, options) {
        if (!this.#runnAble('addAndRun'))
            return;
        this.#runMode = 'addAndRun';
        this.#hasRun = true;
        this.#tasks.push(task);
        this.runOnAdd(options);
    }
    runOnAdd(options) {
        const limit = options?.limit || this.#limit;
        if (this.#runningCount < limit && this.#tasks.length > this.#runningIndex) {
            const task = this.#tasks[this.#runningIndex++];
            this.#runningCount++;
            const next = (result) => {
                this.#runningCount--;
                this.runOnAdd(options);
                this.#results.push(result);
            };
            this.#runTask(task, next, options);
        }
    }
    // 停止队列的执行
    abort() {
        this.#isAbort = true;
        this.#empty();
    }
    #empty() {
        this.#tasks = [];
        this.#results = [];
    }
    #runBefore() {
        this.#results = [];
        this.#isAbort = false;
    }
    #runFinished(resolve) {
        resolve(this.#results);
        this.#empty();
    }
    // 流式执行，不会因为某一个任务的阻塞而阻塞整个流程
    runByStream(callback, options) {
        if (this.#hasRun)
            return Promise.reject(new Error('不可以多次执行'));
        this.#hasRun = true;
        const limit = options?.limit || this.#limit;
        this.#runBefore();
        return new Promise((resolve, reject) => {
            try {
                let offset = 0;
                let finishedCount = 0;
                const taskLength = this.#tasks.length;
                const highWaterMark = Math.min(limit, taskLength);
                const runTask = (index) => {
                    if (this.#isAbort)
                        return this.#runFinished(resolve);
                    const task = this.#tasks[index];
                    const next = (result) => {
                        // 说明当前任务已经执行完毕
                        this.#runCallback(callback, result, index);
                        this.#results[index] = result;
                        finishedCount++;
                        if (finishedCount >= taskLength) {
                            this.#runFinished(resolve);
                            return;
                        }
                        if (offset < taskLength && !this.#isAbort) {
                            runTask(offset++);
                        }
                    };
                    this.#runTask(task, next, options);
                };
                // 确保同步队列可以按照预期顺利执行
                offset = highWaterMark;
                for (let index = 0; index < highWaterMark; index++) {
                    runTask(index);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // 批量执行，如果某一个任务比较耗时，会导致后续任务一直等待
    runByBatch(callback, options) {
        if (this.#hasRun)
            return Promise.reject(new Error('不可以多次执行'));
        const limit = options?.limit || this.#limit;
        this.#runBefore();
        return new Promise((resolve, reject) => {
            try {
                const taskLength = this.#tasks.length;
                const start = 0;
                const end = Math.min(limit, taskLength);
                const runTask = (start, end) => {
                    if (this.#isAbort)
                        return this.#runFinished(resolve);
                    if (start >= end) {
                        this.#runFinished(resolve);
                        return;
                    }
                    const needRunTasks = this.#tasks.slice(start, end);
                    const taskResult = [];
                    let finishedCount = 0;
                    const next = (index) => (result) => {
                        taskResult[index] = result;
                        finishedCount++;
                        // 这里不能用taskResult.length去进行比较，因为可能数组先执行完最后一个，此时数组只有一个数，但是长度等于needRunTasks.length
                        if (needRunTasks.length === finishedCount) {
                            // 本轮任务执行完成， 开始进行下一轮
                            this.#runCallback(callback, taskResult, start, end - 1);
                            this.#results.push(...taskResult);
                            start = end;
                            end += Math.min(limit, taskLength - end);
                            runTask(start, end);
                        }
                    };
                    needRunTasks.forEach((task, index) => {
                        this.#runTask(task, next(index));
                    });
                };
                runTask(start, end);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // 执行每一个任务
    #runTask(task, next, options) {
        if (this.#isAbort || typeof task !== 'function')
            return;
        const callback = () => {
            task(next);
        };
        const { runType, timeout } = Object.assign({}, this.#options, options);
        switch (runType) {
            case 'setTimeout':
                setTimeout(callback, 0);
                break;
            case 'requestAnimationFrame':
                requestAnimationFrame(callback);
                break;
            case 'requestIdleCallback':
            default:
                globalThis.requestIdleCallback(callback, { timeout });
                break;
        }
    }
    // 确保用户传入的回调为函数
    #runCallback(callback, ...args) {
        if (typeof callback === 'function') {
            callback(...args);
        }
    }
}
// 使用示例
const executor = new RestrictedTaskQueue(2);
// 添加任务，指定不同的执行方式
executor.addAndRun((resolve) => setTimeout(() => {
    console.log('Immediate task executed');
    resolve('1');
}, 1000)); // 默认同步执行
executor.addAndRun((resolve) => {
    // return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
        console.log('Timeout task executed');
        resolve('2');
    }, 3000);
    // });
});
executor.addAndRun((resolve) => {
    setTimeout(() => {
        console.log('Idle callback task executed');
        resolve('3');
    }, 1000);
});
executor.addAndRun((resolve) => {
    setTimeout(() => {
        console.log('Animation frame task executed');
        resolve('4');
    }, 900);
});
