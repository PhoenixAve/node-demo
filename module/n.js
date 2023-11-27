// // 模块的导入导出
// const age = 18
// const addFn = (x,y)=>{
//   return x+y
// }

// module.exports = {
//   age,
//   addFn
// }


// // module
// console.log(module);


// // exports 
// exports.name = 'yjc'

// // 同步加载
// let name = 'yjc'
// let iTime = new Date()

// while(new Date() - iTime < 4000) {}
// module.exports = name
// console.log('m.js被加载导入了');

console.log(require.main === module);