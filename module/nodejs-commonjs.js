// // 导入
// let obj = require('./m')
// console.log(obj)

// // module
// let obj = require('./m');

// // exports 
// let obj = require('./m');
// console.log(obj);

// // 同步加载
// let obj = require('./m');
// console.log('当前js代码执行了');
// console.log(obj);

let obj = require('./m');
console.log(require.main === module);