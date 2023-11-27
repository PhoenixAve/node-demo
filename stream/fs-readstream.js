// 文件可读流的创建与消费
const fs = require('fs');
const { resolve } = require('../utils');

let rs = fs.createReadStream(resolve('test.txt'), {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3,
  // 每次最多读几个字符
  highWaterMark: 4
});

// // 通过data事件消费数据
// rs.on('data', (chunk) => {
//   console.log(chunk.toString());
//   // 暂停读取
//   rs.pause();
//   setTimeout(() => {
//     // 1秒后重新读取
//     rs.resume()
//   }, 1000)
// })

// // 通过readable事件消费数据
// rs.on('readable', () => {
//   let data
//   while((data = rs.read(1)) !== null) {
//     console.log(data.toString());
//     console.log('----------', rs._readableState.length)
//   }
// })


// 常见事件与应用

rs.on('open', (fd) => {
  console.log(fd, '文件打开了');
})

rs.on('close', () => {
  // 当数据消费完之后，就会触发关闭事件
  console.log('文件关闭了');
})

let bufferArr = []
rs.on('data', (chunk) => {
  // 当数据消费完之后，就会触发关闭事件
  bufferArr.push(chunk);
})

rs.on('end', () => {
  console.log(Buffer.concat(bufferArr).toString())
  console.log('read end')
})

rs.on('error', (err) => {
  console.log('出错了', err);
})