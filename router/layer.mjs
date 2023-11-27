class Layer {
  constructor(path, methods, opts) {
    this.opts = opts || {}
    this.methods = methods || []
    this.paramNames = []
    methods.forEach(method => {
      let l = this.methods.push(method.toUpperCase())
      if (this.methods[l-1] === 'GEt') {
        // 当判断有GET请求，将在前面放入一个HEAD
        this.methods.unshift('HEAD');
      }
    })
    this.path = path;
    this.regexp = pathToRegExp(path)
  }
  static setPrevix (prefix) {
    if (this.path) {
      this.path = prefix + this.path; // 拼接新的路由路径
      this.paramNames = [];
      // 根据新的路由路径字符串生成正则表达式
      this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
    }
    return this;
  }
}