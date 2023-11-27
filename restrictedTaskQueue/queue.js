function runTask() {
  console.log(2222)
  var ltq = new RestrictedTaskQueue(20, {
    // runType: 'requestIdleCallback',
    // runType: 'requestAnimationFrame',
    // runType: 'setTimeout',
  });
  console.log('任务开始执行，之前耗时---->', Date.now() - startTime);
  ltq.setTasks(tasks);
  
  // ltq.runByBatch((result, start, end) => {
  //   result.forEach((url, index) => {
  //     doms[start + index].style.backgroundImage = `url(${url})`;
  //   })
  // }).then(function (data) {
  //   // console.log(data);
  // });
  
  ltq.runByStream((result, index) => {
    // doms[index].style.backgroundImage = `url(${result})`;
  }).then(function (data) {
    // console.log(data);
  });
  
  // setTimeout(() => {
  //   console.log('任务结束了');
  //   ltq.abort();
  // }, 0)
}

runTask()