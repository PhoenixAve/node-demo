// 模拟文件可读流

const fs = require("fs");
const EventEmitter = require("events");
const { resolve } = require("../utils");

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "r";
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 64 * 1024; // 64kb
    this.readOffset = 0;
    this.open();
    this.on("newListener", (type) => {
      console.log("newListener type", type);
      switch (type) {
        case "data":
          this.read();
      }
    });
  }
  open() {
    // 原生open方法来打开文件
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit("error", err);
      } else {
        this.fd = fd;
        this.emit("open", fd);
      }
    });
  }
  read() {
    if (typeof this.fd !== "number") {
      // open的回调是异步的，如果同步监听data事件，那么此时fd可能还不存在，所以通过下面的方式
      return this.once("open", this.read);
    }
    let buf = Buffer.alloc(this.highWaterMark);
    let howMuchToRead = this.end
      ? Math.min(this.end - this.readOffset + 1, this.highWaterMark)
      : this.highWaterMark;
    fs.read(
      this.fd,
      buf,
      0,
      howMuchToRead,
      this.readOffset,
      (err, readBytes) => {
        if (readBytes) {
          this.readOffset += readBytes;
          this.emit("data", buf.slice(0, readBytes));
          this.read();
        } else {
          // 没有数据可读了
          this.emit("end");
          this.close();
        }
      }
    );
    console.log(this.fd);
  }
  close() {
    fs.close(this.fd, (err) => {
      if (err) {
        this.emit("error", err);
      } else {
        this.emit("close");
      }
    });
  }
}

let rs = new MyFileReadStream(resolve("test.txt"), {
  end: 7,
  highWaterMark: 3,
});

rs.on("open", (fd) => {
  console.log("open", fd);
});

rs.on("error", (err) => {
  console.log("error", err);
});

rs.on("data", (chunk) => {
  console.log("chunk", chunk.toString());
});

rs.on("end", () => {
  console.log("end");
});

rs.on("close", () => {
  console.log("close");
});
