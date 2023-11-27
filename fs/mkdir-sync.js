
// 创建目录同步实现
// 1. 将来调用时需要接手类似于a/b/c，这样的路径，他们之间是采用/分隔
// 2. 利用/分隔符将路径进行拆分，将每一项放入一个数组中进行管理['a','b','c']
// 3. 对上述数组进行遍历，我们需要拿到每一项，然后与前一项进行拼接 /
// 4. 判断一下当前拼接之后的路径是否具有可操作权限，否则需要执行创建

const fs = require("fs");
const path = require("path");

function makeDirSync (dirPath) {
  let items = dirPath.split(path.sep)
  for (let i = 1; i <= items.length; i++) {
    let dir = items.slice(0, i).join(path.sep)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
  }
  console.log(items);
}

makeDirSync('a/b/c/')
