ArrayBuffer.prototype.split = function (sep) {
  let len = Buffer.from(sep).length;
  let ret = []
  let start = 0
  let offset = 0
  while(offset = this.indexOf(sep, start) !== -1) {
    ret.push(this.slice(start, offset))
    start = offset + len
  }
  // 部分环境可能无法输出最后一个空字符（当最后一部分是要查找的内容时）
  ret.push(this.slice(start))
  return ret
}

let buf = '吃zce吃馒头，吃面条，我吃所有吃吃吃'

let bufArr = buf.split('吃')

console.log(bufArr);