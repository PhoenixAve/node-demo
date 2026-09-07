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
        }, 1) as unknown as number;
    };
}



// 每个任务函数的callback参数类型
type TETaskCallbackVo = () => void
// 每个任务函数的类型
type TETaskVo = (callback?: TETaskCallbackVo) => void | Promise<void>
// 运行方式类型
type TERunType = 'requestIdleCallback' | 'setTimeout' | 'requestAnimationFrame' | 'immediate';
// 实例配置
interface TEOptionsVo {
    // 执行方式
    runType?: TERunType,
    // 当runType=requestIdleCallback时，可以设置timeout，指定任务的强制执行时间
    timeout?: number
}
class TaskExecutor {
    private queue: TETaskVo[] = [];
    #options: TEOptionsVo = {
        runType: 'requestIdleCallback',
    };
    private limit = 0; // <=0 表示不限制
    private runningCount = 0;
    private isAbort = false;
    constructor(limit = 1, options?: TEOptionsVo) {
        this.limit = limit < 1 ? 1 : limit;
        Object.assign(this.#options, options);
    }
    add(task) {
        if (typeof task === 'function') {
            this.queue.push(task);
            this.run();
        }
    }
    private run() {
        if (this.runningCount < this.limit && this.queue.length > 0) {
            const task = this.queue.shift() as TETaskVo;
            this.runningCount++;
            this.runTask(task);
        }
    }
    // 执行每一个任务
    runTask(task: TETaskVo) {
        if (this.isAbort || typeof task !== 'function') return;
        const callback = async () => {
            const next = () => {
                this.runningCount--;
                this.run()
            }
            task(next)
        }
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
    }, 2000)
})
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
