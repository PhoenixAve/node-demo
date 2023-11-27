// console.log(0);

const fs = require("fs");

// setTimeout(() => {          // callback1
//   console.log(1);
//   setTimeout(() => {        // callback2
//     console.log(2);
//   }, 0);
//   setImmediate(() => {      // callback3
//     console.log(3);
//   })
//   process.nextTick(() => {  // callback4
//     console.log(4);  
//   })
// }, 0);

// setImmediate(() => {        // callback5
//   console.log(5);
//   process.nextTick(() => {  // callback6
//     console.log(6);  
//   })
// })

// setTimeout(() => {          // callback7              
//   console.log(7);
//   process.nextTick(() => {  // callback8
//     console.log(8);   
//   })
// }, 0);

// process.nextTick(() => {    // callback9
//   console.log(9);  
// })

// console.log(10);


// 示例一
// console.log('start');

// setTimeout(() => {
//   console.log('S1')
//   Promise.resolve().then(() => {
//     console.log('P1')
//   })
//   process.nextTick(() => {
//     console.log('tick1');
//   })
// }, 0);

// Promise.resolve().then(() => {
//   console.log('P2')
// })

// process.nextTick(() => {
//   console.log('tick2');
// })

// setImmediate(() => {
//   console.log('setImmediate')
//   Promise.resolve().then(() => {
//     console.log('P3')
//   })
// });

// console.log('end');


// // 示例二
// // 老版本是某个阶段的队列全部执行完才执行微任务，新版变为和浏览器一样

// console.log('start');

// setTimeout(() => {
//   console.log('S1');
//   Promise.resolve().then(() => {
//     console.log('P1');
//   })
//   process.nextTick(() => {
//     console.log('tick1');
//   })
// }, 0);

// Promise.resolve().then(() => {
//   console.log('P2');
// })

// setTimeout(() => {
//   console.log('S2');
//   Promise.resolve().then(() => {
//     console.log('P3');
//   })
//   process.nextTick(() => {
//     console.log('tick2');
//   })
// }, 0);

// console.log('end');

// // 示例三
// // 主模块中运行时顺序不一定，器将受进程性能的约束（这可能会受到计算机上其他正在运行应用程序的影响）
// // 非主模块运行时，顺序为setImmediate > timeout
// setTimeout(() => {
//   console.log('timeout');
// }, 0);

// setImmediate(() => {
//   console.log('immediate');
// });

// fs.readFile('event/text.txt', (err, data) => {
//   if (err) throw err;
//   setImmediate(() => {
//     console.log('immediate');
//   })
//   setTimeout(() => {
//     console.log('timeout');
//   })
// })

// 示例四
console.log('start');

setTimeout(() => {
  console.log('S1');
  Promise.resolve().then(() => {
    console.log('P1', Date.now());
  })
})

fs.readFile('event/text.txt', (err, data) => {
  console.log('first read');
  if (err) throw err;
  setImmediate(() => {
    console.log('setImmediate', Date.now());
  })
  setTimeout(() => {
    console.log('S2');
  })
})
for (let index = 0; index < 5; index++) {
  fs.readFile('event/text.txt', (err, data) => {
    console.log('read index ', index);
    if (err) throw err;
  })
}

console.log('end');