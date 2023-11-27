const EventEmitter = require('events');

const myEvent = new EventEmitter();

const evName = Symbol('事件');

myEvent.on(evName, () => {
  console.log(evName, '事件1执行了');
})

myEvent.on(evName, () => {
  console.log(evName, '事件2执行了');
})

myEvent.emit(evName);