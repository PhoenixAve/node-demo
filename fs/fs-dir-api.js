const fs = require("fs");
const path = require("path");

const resolve = (p) => path.resolve(__dirname, p);

// // access
// fs.access(resolve('a.txt'), (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('有操作权限');
//   }
// })

// // stat
// fs.stat(resolve('a.txt'), (err, statObj) => {
//   console.log(statObj.size);
//   console.log(statObj.isFile());
//   console.log(statObj.isDirectory());
// })

// // mkdir
// // 默认只创建最后一层，如果前面的路径不存在，则报错，recursive则会递归创建
// fs.mkdir(resolve('a/b/c'), { recursive: true }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('创建成功');
//   }
// })

// // fmdir
// // 默认只删除最后一层目录，如果前面的路径不存在，或者文件夹非空会报错
// fs.rmdir(resolve('a/b/c'), {re}, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('删除成功');
//   }
// })

// // readdir
// fs.readdir(resolve('a'), (err, files) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(files);
//   }
// })

// // unlink
// fs.unlink(resolve("a/a.txt"), (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('删除成功');
//   }
// });
