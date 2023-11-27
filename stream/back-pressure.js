// 被压机制

let fs = require("fs");
const { resolve } = require("../utils");

let rs = fs.createReadStream(resolve("test.txt"), {
  highWaterMark: 4,
});

let ws = fs.createWriteStream(resolve("test1.txt"), {
  highWaterMark: 1,
});


// // 自己实现背压机制
// let flag = true;

// rs.on("data", (chunk) => {
//   flag = ws.write(chunk, () => {
//     console.log("数据写完了");
//   });
//   if (!flag) {
//     rs.pause();
//   }
// });

// ws.on('drain', () => {
//   rs.resume();
// })


// // 通过pipe实现
// rs.pipe(ws);