const { Readable } = require("stream");

// 模拟底层数据
let source = ["我", "爱", "北京天安门"];

// 自定义类继承Readable
class MyReadable extends Readable {
  constructor(source) {
    super();
    this.source = source;
  }
  _read() {
    // 为null标识数据读取完成
    let data = this.source.shift() || null;
    this.push(data);
  }
}

// 实例化
let myReadable = new MyReadable(source);

// 暂停模式
myReadable.on("readable", () => {
  // console.log(1); 默认暂停模式，会执行两次
  let data = null;
  while ((data = myReadable.read()) !== null) {
    // 输出结果只有两份，因为在readable时缓存区就已经有数据了，当调用read时又会再次读取
    console.log(data.toString()); // mtdata   databp
  }
});


// 流动模式
myReadable.on('data', (chunk) => {
  console.log(chunk.toString()); // mt   data   databp
})