let { Duplex } = require("stream");

class MyDuplex extends Duplex {
  constructor(source) {
    super();
    this.source = source;
  }
  _read() {
    let data = this.source.shift() || null;
    this.push(data);
  }
  _write(chunk, en, next) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString();
    }
    process.stdout.write(chunk);
    process.nextTick(next);
  }
}

// 模拟底层数据
let source = ["a", "b", "c"];
let myDuplex = new MyDuplex(source);

myDuplex.on("data", (chunk) => {
  console.log(chunk.toString());
});

myDuplex.write("123", () => {
  console.log(111111);
});
