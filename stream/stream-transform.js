let { Transform } = require("stream");

class MyTransform extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, en, callback) {
    // 对数据进行转换
    this.push(chunk.toString().toUpperCase());
    callback(null)
  }
}

let myTransform = new MyTransform();

myTransform.write("abc");

myTransform.on("data", (chunk) => {
  console.log(chunk.toString());
});

myTransform.pipe(process.stdout)