//  koa-router中提供两种方式注册路由：
// 具体的HTTP动词注册方式，例如：router.get('/users', ctx => {})
// 支持所有的HTTP动词注册方式，例如：router.all('/users', ctx => {})

// http.METHODS && http.METHODS.map(function lowerCaseMethod (method) {
//   return method.toLowerCase()
// })

class Router {
  constructor(opts) {
    this.opts = opts || {};
    this.methods = this.opts.methods || [
      "HEAD",
      "OPTIONS",
      "GET",
      "PUT",
      "PATCH",
      "POST",
      "DELETE",
    ];
    this.params = {}; // 保存param前置处理函数
    this.stack = []; // 存储layer
    this.initMethod();
  }
  initMethod() {
    this.methods.forEach((method) => {
      Router.prototype[method] = function (path) {
        this.register(path, [method]);
        return this;
      };
    });
  }
  // register方法主要负责实例化Layer对象、更新路由前缀和前置param处理函数
  register(path, methods, opts) {
    // 允许path为数组
    if (Array.isArray(path)) {
      path.forEach((pathItem) => {
        this.register(pathItem, methods, opts);
      });
      return this;
    }

    // 实例化Layer
    var route = new Layer(path, methods, {
      end: opts.end === false ? opts.end : true,
      name: opts.name,
      sensitive: opts.sensitive || this.opts.sensitive || false,
      strict: opts.strict || this.opts.strict || false,
      prefix: opts.prefix || this.opts.prefix || "",
      ignoreCaptures: opts.ignoreCaptures,
    });

    if (this.opts.prefix) {
      route.setPrefix(this.opts.prefix);
    }

    // 设置param前置处理函数
    Object.keys(this.params).forEach(function (param) {
      route.param(param, this.params[param]);
    }, this);
    // 将路由实例推入router的stack中
    this.stack.push(route);
    return route;
  }
  use () {
    
  }
}
