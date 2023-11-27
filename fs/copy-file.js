const fs = require("fs");
const path = require("path");

// 1 打开a文件，利用read将数据保存到buffer中暂存起来
// 2 打开b文件，利用write将buffer中数据写入到b文件中

let buf = Buffer.alloc(10);
// // 拷贝部分数据
// // 打开指定文件
// fs.open(path.resolve(__dirname, 'a.txt'), 'r', (err, rfd) => {
//   // 从打开的文件中读取数据
//   fs.read(rfd, buf, 0, 10, 0, (err, readBytes, buffer) => {
//     // 打开b文件，用于执行数据写入操作
//     fs.open(path.resolve(__dirname, 'b.txt'), 'w', (err, wfd) => {
//       // 将buffer中的数据写入到b文件中
//       fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//         console.log('写入成功');
//       })
//     })
//   })
// })

// 数据完全拷贝
const BUFFER_SIZE = buf.length;
let readPosition = 0;
// 打开指定文件
fs.open(path.resolve(__dirname, "a.txt"), "r", (err, rfd) => {
  // 打开b文件，用于执行数据写入操作
  fs.open(path.resolve(__dirname, "b.txt"), "a+", (err, wfd) => {
    function next() {
      // 从打开的文件中读取数据
      fs.read(
        rfd,
        buf,
        0,
        BUFFER_SIZE,
        readPosition,
        (err, readBytes, buffer) => {
          if (!readBytes) {
            // 如果条件成立，说明内容已经读取完毕
            fs.close(rfd, () => {});
            fs.close(wfd, () => {});
            console.log("拷贝完成");
            return;
          }
          readPosition += readBytes
          // 将buffer中的数据写入到b文件中
          fs.write(wfd, buf, 0, readBytes, (err, written) => {
            next()
          });
        }
      );
    }
    next();
  });
});
