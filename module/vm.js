const fs = require('fs');
const path = require('path');
const vm = require('vm');

const resolve =(dir) => path.resolve(__dirname, dir)
const content = fs.readFileSync(resolve('./vm.txt'), 'utf-8')

// // eval
// let age = 33
// eval(content)
// console.log(age);

// // new Function
// let age = 33
// console.log(age);
// let fn = new Function('age', "return age+1")
// console.log(fn(age));

// // VM
// vm.runInThisContext(content)
// console.log(age); 12
// // runInThisContext默认是无法使用外部变量的，下面的代码会报错
// let age = 10
// vm.runInThisContext("age += 10")
// console.log(age);