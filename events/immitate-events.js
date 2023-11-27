function MyEvent() {
  // 准备一个数据结构用于缓存订阅者信息
  this._events = Object.create(null)
}

MyEvent.prototype.on = function(type, callback) {
  // 判断当前次的事件是否已经存在，然后决定如何做缓存
  if (this._events[type]) {
    this._events.push(callback)
  } else {
    this._events[type] = [callback]
  }
}

MyEvent.prototype.emit = function (type, ...args) {
  const callbacks = this._events[type] || []
  callbacks.forEach(callback => {
    callback.call(this, ...args)
  })
}

MyEvent.prototype.off = function (type, callback) {
  const callbacks = this._events[type];
  this._events[type] = callbacks.filter(item => callback !== item && item.link !== callback)
}


MyEvent.prototype.once = function (type, callback) {
  let cb = function (...args) {
    callback.call(this, ...args)
    this.off(type, cb)
  }
  // 解决once后无法off的问题
  cb.link = callback
  this.on(type, cb)
}
let ev = new MyEvent()

let fn = function(...data) {
  console.log('事件1执行了',data);
}

// ev.on('事件1', fn)
// ev.emit('事件1', 1, 2)
// ev.off('事件1', fn)
// ev.emit('事件1', 1, 2)

ev.once('事件2', fn)
ev.off('事件2', fn)
ev.emit('事件2', 3, 4)