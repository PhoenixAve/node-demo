const { Writable } = require("stream");

class MyWritable extends Writable {
  constructor() {
    super();
  }

  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + "<---");
    // 写完之后再调用done
    process.nextTick(done);
  }
}

let myWriteable = new MyWritable();

myWriteable.write("我爱祖国", "utf-8", () => {
  console.log("end");
});
