(() => {
  console.log("任务执行方式：while");
  console.log("任务开始执行，之前耗时---->", Date.now() - startTime);
  while (tasks.length > 0) {
    const task = tasks.shift();
    task();
  }
  console.log("任务执行结束，总耗时--->", Date.now() - startTime);
})();
