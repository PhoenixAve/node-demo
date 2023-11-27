// write的执行流程

const fs = require('fs');
const { resolve } = require('../utils');

let ws = fs.createWriteStream(resolve('test.txt'), {
  highWaterMark: 3
})

// 第一次次直接将数据写入文件中
let flag = ws.write('1')
console.log(flag);

// 第二次就是将数据写入缓存中
flag = ws.write('2')
console.log(flag);

// 第三次出现了false，当累计写入量大于或等于highWaterMark时就会返回false
// 生产速度和消费速度是不一样的，一般情况下生产速度要比消费速度快很多
// 如果flag为false，并不是说明当前数据不能被写入，只是表示当前的消费速度已经跟不上生产速度了，所以一般这个时候我们会将可读流的模块修改为暂停模式，当生产者暂停之后，消费者会慢慢销消化它内部缓存中的数据，直到可以再次被执行写入操作
// 当缓存区可以继续写入数据时，如何让生产者直到？drain事件
flag = ws.write('3')
console.log(flag);

flag = ws.write('4')
console.log(flag);