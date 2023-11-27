// 文件可写流

const fs = require('fs');
const { resolve } = require('../utils');

const ws = fs.createWriteStream(resolve('test.txt'), {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3
})

// // 多次写入默认是串行执行的

// ws.write('我爱祖国', (error) => {
//   console.log('中文写完了');
// })

// ws.write('12345', (error) => {
//   console.log('数字写完了');
// })


// let buf = Buffer.from('abc')
// ws.write(buf, (error) => {
//   console.log('buffer写完了');
// })

// 常用事件
ws.on('open', () => {
  console.log('文件打开了');
})

// close是在数据写入操作完成之后执行
ws.on('close', () => {
  console.log('文件关闭了');
})

ws.on('error', () => {
  console.log('出错了');
})

// end执行之后，就意味着数据写入完成了
ws.end()