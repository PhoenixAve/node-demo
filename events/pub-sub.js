// 发布订阅模式实现

class PubSub {
  constructor() {
    this._events = {}
  }

  // 注册
  subscribe (event, callback) {
    if (this._events[event]) {
      this._events[event].push(callback)
    } else {
      this._events[event] = [callback]
    }
  }

  // 发布操作
  publish(event, ...args) {
    const callbacks = this._events[event]
    if (callbacks) {
      // 不写箭头函数是为了绑定this
      callbacks.forEach(function (callback) {
        callback.call(this, ...args)
      })
    }
  }
}

let ps = new PubSub();

ps.subscribe('事件1', () => {
  console.log('事件1执行了--1');
})

ps.subscribe('事件1', () => {
  console.log('事件1执行了--2');
})

ps.publish('事件1')
ps.publish('事件1')