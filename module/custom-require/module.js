function Module(id){
  this.id = id
  this.exports = {}
}

Module._resolveFilename = function (filename) {
  // 利用path将filename转为绝对路径
  const absPath = path.resolve(__dirname, filename)
  if (fs.existsSync(absPath)) {
    // 条件成立，文件存在
    return absPath
  } else {
    
  }
  return absPath
}
