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
class TaskExecutor {
    queue = [];
    #options = {
        runType: 'requestIdleCallback',
    };
    limit = 0; // <=0 表示不限制
    runningCount = 0;
    isAbort = false;
    constructor(limit = 1, options) {
        this.limit = limit < 1 ? 1 : limit;
        Object.assign(this.#options, options);
    }
    add(task) {
        if (typeof task === 'function') {
            this.queue.push(task);
            this.run();
        }
    }
    run() {
        if (this.runningCount < this.limit && this.queue.length > 0) {
            const task = this.queue.shift();
            this.runningCount++;
            this.runTask(task);
        }
    }
    // 执行每一个任务
    runTask(task) {
        if (this.isAbort || typeof task !== 'function')
            return;
        const callback = async () => {
            const next = () => {
                this.runningCount--;
                this.run();
            };
            task(next);
        };
        const { runType, timeout } = this.#options;
        switch (runType) {
            case 'setTimeout':
                setTimeout(callback, 0);
                break;
            case 'requestAnimationFrame':
                requestAnimationFrame(callback);
                break;
            case 'requestIdleCallback':
                globalThis.requestIdleCallback(callback, { timeout });
                break;
            case 'immediate':
            default:
                callback();
        }
    }
}
// 使用示例
const executor = new TaskExecutor(2);
// 添加任务，指定不同的执行方式
executor.add((done) => setTimeout(() => {
    console.log('Immediate task executed');
    done();
}, 1000)); // 默认同步执行
executor.add((done) => {
    setTimeout(() => {
        console.log('Timeout task executed');
        done();
    }, 2000);
});
executor.add((done) => {
    setTimeout(() => {
        console.log('Idle callback task executed');
        done();
    }, 1000);
});
executor.add((done) => {
    setTimeout(() => {
        console.log('Animation frame task executed');
        done();
    }, 900);
});
