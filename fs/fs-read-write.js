const fs = require("fs");
const path = require("path");

// read: 所谓的读操作就是将数据从磁盘文件中读取或者写入到buffer中
let buf = Buffer.alloc(10);

// fs.open(path.resolve(__dirname, "data.txt"), "r", (err, rfd) => {
//   console.log(rfd);
//   fs.read(rfd, buf, 1, 4, 2, (err, readBytes, data) => {
//     try {
//       console.log(readBytes);
//       console.log(data);
//       console.log(data.toString());
//     } catch (error) {
//       console.log(error);
//     }
//   });
//    fs.close(rfd,(err) => {
//      console.log('file closed');
//    })
// });

// write 将缓冲区里的内容写入到磁盘文件中
buf = Buffer.from("1234567890");
fs.open(path.resolve(__dirname, "b.txt"), "w", (err, wfd) => {
  fs.write(wfd, buf, 0, 3, 0, (err, written, buffer) => {
    console.log(written);
    console.log(buffer);
    console.log(buffer.toString());
      fs.close(rfd,(err) => {
        console.log('file closed');
      })
  });
});
