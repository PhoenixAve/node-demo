var ltq = new TaskQueue(100, {
  // type: 'requestIdleCallback'
  type: 'queueMicrotask'
});
console.log('任务开始执行，之前耗时---->', Date.now() - startTime);
ltq.setTasks(tasks);
let start = 0
ltq.run(function (type, data) {
  data.forEach((url, index) => {
    console.log('url index',url, start + index )
    doms[start + index].style.backgroundImage = `url(${url})`;
  })
  start += data.length
  console.log('任务执行结束，总耗时--->', Date.now() - startTime);
})

setTimeout(() => {
  ltq.abort();
  console.log('任务被终止了');
})