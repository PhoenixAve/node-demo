// 文件可写流实现

const fs = require("fs");
const EventsEmitter = require("events");

const Queue = require("./linked-queue");

const { resolve } = require("../utils/index");

class MyWriteStream extends EventsEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "w";
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.encoding = options.encoding || "utf-8";
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.open();
    this.writeoffset = this.start;
    this.writing = false;
    this.writeLen= 0;
    this.needDrain = false;
    this.cache = new Queue();
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit("error", err);
      }
      this.fd = fd;
      this.emit('open', this.fd);
    });
  }
  write(chunk, encoding, callback) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);

    this.writeLen += chunk.length;
    let flag = this.writeLen < this.highWaterMark;
    this.needDrain = !flag;
    const cb = () => {
      callback && callback();
      // 清空排队内容
      this._clearBuffer();
    }
    if (this.writing) {
      // 当前正在执行写入，应该将内容放到缓存区里排队
      this.cache.enQueue({
        chunk, encoding, callback: cb
      });
      console.log(this.cache);
    } else {
      // 当前不是正在写入，执行写入
      this._write(chunk, encoding, cb);
    }
    return flag;
  }
  _write(chunk, encoding, callback) {
    this.writing = true;
    if (typeof this.fd !== 'number') {
      // 防止将write操作放到异步中
      this.once('open', () => {
        return this._write(chunk, encoding, callback)
      })
    } else {
      fs.write(this.fd, chunk, this.start, chunk.length, this.writeoffset, (err, written, buffer) => {
        this.writeoffset += written;
        this.writeLen -= written;
        callback && callback();
      })
    }
  }
  _clearBuffer () {
    const data = this.cache.deQueue();
    if (data) {
      this._write(data.element.chunk, data.element.encoding, data.element.callback);
    } else if (this.needDrain) {
      this.needDrain = false;
      this.emit('drain')
    }
  }
}

const ws = new MyWriteStream(resolve("./ws.txt"), {
  highWaterMark: 2
});

ws.on("open", (fd) => {
  console.log("open=>", fd);
});


let flag = ws.write('1', 'utf-8', ()=>{
  console.log('ok1');
})


flag = ws.write('10', 'utf-8', ()=>{
  console.log('ok2');
})

flag = ws.write('我爱祖国', 'utf-8', ()=>{
  console.log('ok3');
})

ws.on('drain', () => {
  console.log('drain');
})