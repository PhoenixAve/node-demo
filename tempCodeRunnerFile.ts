class LimitPromiseQueue {
    private arrFn: Array<(...args: Array<unknown>) => unknown> = [];
    private limit = Infinity;
    private abort = false;
    constructor(limit: number) {
        this.limit = limit || 4;
    }
    public add(fn: (...args: Array<unknown>) => unknown) {
        this.abort = false;
        this.arrFn.push(fn);
    }
    public run() {
        let offset = 0;
        let finishedNum = 0;
        const len = this.arrFn.length;
        const next = async (index: number) => {
            if (this.abort) return;
            const fn = this.arrFn[index];
            await fn();
            finishedNum++;
            if (finishedNum >= len) {
                console.log('执行完成', finishedNum);
                return;
            }
            if (offset < len) {
                next(offset++);
            }
        };
        for (; offset < Math.min(len, this.limit); offset++) {
            next(offset);
        }
    }
    public empty() {
        // 清空队列，并停止后续执行
        this.abort = true;
        this.arrFn = [];
    }
}


const ltq = new LimitPromiseQueue(4);


for (let index = 0; index < 10; index++) {
    console.log(index);

    ltq.add(() => {
        console.log(index);
    });
}

ltq.run();
