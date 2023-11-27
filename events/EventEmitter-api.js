const EventEmitter = require('events');

const ev = new EventEmitter()

// on
let onTimes = 0
ev.on('事件1', () => {
  console.log(`on事件1执行了${++onTimes}次`);
})

// 触发三次，执行了三次
ev.emit('事件1')
ev.emit('事件1')
ev.emit('事件1')


// once
let onceTimes = 0
ev.once('once事件', () => {
  console.log(`once事件执行了${++onceTimes}次`);
})

// 触发两次，只会被执行一次
ev.emit('once事件')
ev.emit('once事件')

// off
let callbackFn = (a, b) => {
  console.log(`事件2执行了参数a=${a},b=${b}`);
}
ev.on('事件2', callbackFn)
ev.emit('事件2', 1, 2)
ev.off('事件2', callbackFn)
ev.emit('事件2')
