const path = require("path");
const fs = require("fs");
const vm = require("vm");

// 模块加载流程
// 1. 路径分析：依据标识符确定模块位置
// 缓存优先
// 2. 文件定位：确定目标模块中具体的文件及文件类型
// 3. 编译执行：采用对应的方式完成文件的编译执行

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._resolveFilename = function (filename) {
  // 利用path将filename转为绝对路径
  const absPath = path.resolve(__dirname, filename);
  if (fs.existsSync(absPath)) {
    // 条件成立，文件存在
    return absPath;
  } else {
    // 文件定位
    const suffix = Object.keys(Module._extensions);
    for (let i = 0; i < suffix.length; i++) {
      const newPath = absPath + suffix[i];
      if (fs.existsSync(newPath)) {
        return newPath;
      }
    }
  }
  throw new Error(`${filename} is no exists`);
};

Module._extensions = {
  ".js"(module) {
    // 读取
    let content = fs.readFileSync(module.id, 'utf-8')
    // 包装
    content = Module._wrapper[0] + content + Module._wrapper[1]
    // VM 
    let compileFn = vm.runInThisContext(content)
    // 准备参数值
    let exports = module.exports
    let dirname = path.dirname(module.id)
    let filename = module.id
    // 调用
    compileFn.call(exports, exports, myRequire, module, filename, dirname)
  },
  ".json"(module) {
    let content = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
    module.exports = content
  },
};

Module._wrapper = [
  "(function(exports, require, module, __filename, __dirname){",
  "})"
]

Module._cache = {};

Module.prototype.load = function () {
  let extname = path.extname(this.id)
  Module._extensions[extname](this)
}

function myRequire(filename) {
  // 1. 获取绝对路径
  const mPath = Module._resolveFilename(filename);
  // 2. 缓存优先
  let cacheModule = Module._cache[mPath];
  if (cacheModule) return cacheModule.exports;
  // 3. 创建空对象，加载目标模块
  let module = new Module(mPath);
  // 4. 缓存已加载的模块
  Module._cache[mPath] = module;
  // 5. 执行加载（编译执行）
  module.load()
  // 6. 返回数据
  return module.exports
}

let obj = myRequire("./v");

console.log(obj);

let json = myRequire("./v.json");

console.log(json);
