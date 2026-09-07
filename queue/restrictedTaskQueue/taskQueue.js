/**
 * https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask
 * 代码和浏览器的用户界面运行在同一线程中，共享同一个事件循环。如果代码阻塞或进入无限循环，浏览器会卡死，降低用户体验。
 * 之前微任务队列仅被内部使用来驱动promise等。queueMicrotask()使开发者可以创建一个统一的微任务队列，能在任何时候将代码安排在一个安全的时间运行（即使js执行上下文栈没有执行上下文剩余）。
 *
 */
"use strict";
if (typeof window.queueMicrotask !== "function") {
  window.queueMicrotask = (callback) => {
    Promise.resolve()
      .then(callback)
      .catch((error) =>
        setTimeout(() => {
          throw error;
        })
      );
  };
}
//可以使用 in 运算符检查私有字段（或私有方法）是否存在。当私有字段或私有方法存在时，运算符返回 true，否则返回 false。
class TaskQueue {
  #workers;
  #size = 0;
  #mark = 0;
  #tasks = [];
  #isMicro = true;
  #isAbort = false;
  #opts = {
    isPromise: false,
    type: "queueMicrotask",
  };
  #callback = (...args) => {
    console.log(...args);
  };
  static EVENT_TASK = "task";
  static EVENT_ABORT = "abort";
  static EVENT_FINISH = "finish";
  /**
   *
   * @param {*} workers 同步执行多个任务
   * @param {*} opts {isPromise:bool,type:enum} 是否使用Promise.all包裹执行并行任务 type,queueMicrotask,requestAnimationFrame,requestIdleCallback
   */
  constructor(workers = 1, opts = {}) {
    this.#workers = workers;
    Object.assign(this.#opts, opts);
  }
  #urgentCallback(tasks) {
    const runFc = () => {
      const taskResults = [];
      const maxTask = tasks.length;
      tasks.forEach((resolve, index) =>
        resolve((data) => {
          taskResults[index] = data;
          // 保障不使用Promise.all时任务执行结果顺序
          if (
            !taskResults.includes(undefined) &&
            maxTask === taskResults.length
          ) {
            this.#runTasks(taskResults);
          }
        })
      );
    };
    if (this.#isMicro) {
      switch (this.#opts.type) {
        case "requestAnimationFrame":
          requestAnimationFrame(runFc);
          break;
        case "requestIdleCallback":
          requestIdleCallback(runFc);
          break;
        default:
          queueMicrotask(runFc);
          break;
      }
    } else {
      runFc();
    }
  }
  #pollTasks(start, end) {
    const tasks = this.#tasks.slice(start, end);
    this.#mark = end;
    if (this.#opts.isPromise) {
      Promise.all(tasks.map((task) => new Promise(task))).then((data) => {
        this.#runTasks(data);
      });
    } else {
      this.#urgentCallback(tasks);
    }
  }
  #runTasks(data = null) {
    const start = this.#mark;
    const end = Math.min(this.#size, start + this.#workers);
    if (!this.#isAbort) {
      // 手动取消释放
      if (start === end) {
        this.#callback(TaskQueue.EVENT_FINISH, data);
        this.#clear();
      } else {
        if (data) {
          this.#callback(TaskQueue.EVENT_TASK, data);
        }
        this.#pollTasks(start, end);
      }
    } else {
      this.#clear();
    }
  }
  #clear() {
    this.#size = 0;
    this.#mark = 0;
    this.#tasks = [];
    this.#isMicro = true;
    this.#callback = (...args) => {
      console.log(...args);
    };
  }
  /**
   * 注入任务
   * @param {*} task
   */
  add(task) {
    this.#size++;
    this.#tasks.push(task);
  }
  setTasks (tasks) {
    this.#tasks = tasks;
    this.#size = tasks.length;
  }
  /**
   * 取消任务
   */
  abort() {
    this.#isAbort = true;
    this.#callback(TaskQueue.EVENT_ABORT);
  }
  /**
   * 执行任务
   * @param {*} callback 每次任务结束回调
   * @param {*} isMicro 是否启动任务进行微任务队列分片，避免同步任务阻塞
   */
  run(callback, isMicro = true) {
    this.#isAbort = false;
    this.#isMicro = isMicro;
    this.#callback = callback;
    this.#runTasks();
  }
}