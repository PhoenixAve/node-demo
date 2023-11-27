// 创建目录异步实现

const fs = require("fs");
const { promisify } = require("util");

// function mkDir(dirPath, cb) {
//   let parts = dirPath.split('/')
//   let index = 1

//   function next () {
//     if (index > parts.length) return cb && cb();
//     let current = parts.slice(0, index++).join('/')
//     if (!fs.existsSync(current)) {
//       fs.mkdir(current, next)
//     } else {
//       next()
//     }
//   }
//   next()
// }

// mkDir('a/b/c', () => {
//   console.log('创建成功');
// })

const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

async function myMkdir(dirPath, cb) {
  let parts = dirPath.split("/");
  for (let i = 1; i <= parts.length; i++) {
    const current = parts.slice(0, i).join('/');
    try {
      await access(current);
    } catch (error) {
      await mkdir(current);
    }
  }
  cb && cb();
}

myMkdir('a/b/c', () => {
  console.log('创建成功');
})