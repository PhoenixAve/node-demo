/**
 * 按指定最大执行数量在空闲时间执行函数，避免影响主线程渲染
 */
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RestrictedTaskQueue_instances, _RestrictedTaskQueue_tasks, _RestrictedTaskQueue_limit, _RestrictedTaskQueue_options, _RestrictedTaskQueue_results, _RestrictedTaskQueue_isAbort, _RestrictedTaskQueue_startRunningTime, _RestrictedTaskQueue_empty, _RestrictedTaskQueue_runBefore, _RestrictedTaskQueue_runFinished, _RestrictedTaskQueue_runTask, _RestrictedTaskQueue_runCallback;
if (typeof globalThis.requestIdleCallback !== 'function') {
    globalThis.requestIdleCallback = function (handler) {
        var startTime = Date.now();
        return setTimeout(function () {
            handler({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50.0 - (Date.now() - startTime));
                }
            });
        }, 1);
    };
}
var RestrictedTaskQueue = /** @class */ (function () {
    function RestrictedTaskQueue(limit, options) {
        if (limit === void 0) { limit = 1; }
        _RestrictedTaskQueue_instances.add(this);
        _RestrictedTaskQueue_tasks.set(this, []);
        _RestrictedTaskQueue_limit.set(this, 1);
        _RestrictedTaskQueue_options.set(this, {
            runType: 'requestIdleCallback'
        });
        _RestrictedTaskQueue_results.set(this, []);
        _RestrictedTaskQueue_isAbort.set(this, false);
        _RestrictedTaskQueue_startRunningTime.set(this, 0);
        __classPrivateFieldSet(this, _RestrictedTaskQueue_limit, limit || 1, "f");
        Object.assign(__classPrivateFieldGet(this, _RestrictedTaskQueue_options, "f"), options);
    }
    // 一次性设置任务
    RestrictedTaskQueue.prototype.setTasks = function (tasks) {
        __classPrivateFieldSet(this, _RestrictedTaskQueue_tasks, tasks, "f");
        __classPrivateFieldSet(this, _RestrictedTaskQueue_results, [], "f");
    };
    // 一个个添加任务
    RestrictedTaskQueue.prototype.add = function (task) {
        __classPrivateFieldGet(this, _RestrictedTaskQueue_tasks, "f").push(task);
    };
    // 停止队列的执行
    RestrictedTaskQueue.prototype.abort = function () {
        __classPrivateFieldSet(this, _RestrictedTaskQueue_isAbort, true, "f");
        __classPrivateFieldGet(this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_empty).call(this);
    };
    // 流式执行，不会因为某一个任务的阻塞而阻塞整个流程
    RestrictedTaskQueue.prototype.runByStream = function (callback, options) {
        var _this = this;
        var limit = (options === null || options === void 0 ? void 0 : options.limit) || __classPrivateFieldGet(this, _RestrictedTaskQueue_limit, "f");
        __classPrivateFieldGet(this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runBefore).call(this, limit, 'runByStream', options);
        return new Promise(function (resolve, reject) {
            try {
                var offset_1 = 0;
                var finishedCount_1 = 0;
                var taskLength_1 = __classPrivateFieldGet(_this, _RestrictedTaskQueue_tasks, "f").length;
                var highWaterMark = Math.min(limit, taskLength_1);
                var runTask_1 = function (index) {
                    if (__classPrivateFieldGet(_this, _RestrictedTaskQueue_isAbort, "f"))
                        return;
                    var task = __classPrivateFieldGet(_this, _RestrictedTaskQueue_tasks, "f")[index];
                    var next = function (result) {
                        // 说明当前任务已经执行完毕
                        __classPrivateFieldGet(_this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runCallback).call(_this, callback, result, index);
                        __classPrivateFieldGet(_this, _RestrictedTaskQueue_results, "f")[index] = result;
                        finishedCount_1++;
                        if (finishedCount_1 >= taskLength_1) {
                            __classPrivateFieldGet(_this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runFinished).call(_this, resolve);
                            return;
                        }
                        if (offset_1 < taskLength_1 && !__classPrivateFieldGet(_this, _RestrictedTaskQueue_isAbort, "f")) {
                            runTask_1(offset_1++);
                        }
                    };
                    __classPrivateFieldGet(_this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runTask).call(_this, task, next, options);
                };
                // 确保同步队列可以按照预期顺利执行
                offset_1 = highWaterMark;
                for (var index = 0; index < highWaterMark; index++) {
                    runTask_1(index);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    };
    // 批量执行，如果某一个任务比较耗时，会导致后续任务一直等待
    RestrictedTaskQueue.prototype.runByBatch = function (callback, options) {
        var _this = this;
        var limit = (options === null || options === void 0 ? void 0 : options.limit) || __classPrivateFieldGet(this, _RestrictedTaskQueue_limit, "f");
        __classPrivateFieldGet(this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runBefore).call(this, limit, 'runByBatch', options);
        return new Promise(function (resolve, reject) {
            try {
                var taskLength_2 = __classPrivateFieldGet(_this, _RestrictedTaskQueue_tasks, "f").length;
                var start = 0;
                var end = Math.min(limit, taskLength_2);
                var runTask_2 = function (start, end) {
                    if (__classPrivateFieldGet(_this, _RestrictedTaskQueue_isAbort, "f"))
                        return;
                    if (start >= end) {
                        __classPrivateFieldGet(_this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runFinished).call(_this, resolve);
                        return;
                    }
                    var needRunTasks = __classPrivateFieldGet(_this, _RestrictedTaskQueue_tasks, "f").slice(start, end);
                    var taskResult = [];
                    var finishedCount = 0;
                    var next = function (index) { return function (result) {
                        var _a;
                        taskResult[index] = result;
                        finishedCount++;
                        // 这里不能用taskResult.length去进行比较，因为可能数组先执行完最后一个，此时数组只有一个数，但是长度等于needRunTasks.length
                        if (needRunTasks.length === finishedCount) {
                            // 本轮任务执行完成， 开始进行下一轮
                            __classPrivateFieldGet(_this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runCallback).call(_this, callback, taskResult, start, end - 1);
                            (_a = __classPrivateFieldGet(_this, _RestrictedTaskQueue_results, "f")).push.apply(_a, taskResult);
                            start = end;
                            end += Math.min(limit, taskLength_2 - end);
                            runTask_2(start, end);
                        }
                    }; };
                    needRunTasks.forEach(function (task, index) {
                        __classPrivateFieldGet(_this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_runTask).call(_this, task, next(index));
                    });
                };
                runTask_2(start, end);
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return RestrictedTaskQueue;
}());
_RestrictedTaskQueue_tasks = new WeakMap(), _RestrictedTaskQueue_limit = new WeakMap(), _RestrictedTaskQueue_options = new WeakMap(), _RestrictedTaskQueue_results = new WeakMap(), _RestrictedTaskQueue_isAbort = new WeakMap(), _RestrictedTaskQueue_startRunningTime = new WeakMap(), _RestrictedTaskQueue_instances = new WeakSet(), _RestrictedTaskQueue_empty = function _RestrictedTaskQueue_empty() {
    __classPrivateFieldSet(this, _RestrictedTaskQueue_tasks, [], "f");
    __classPrivateFieldSet(this, _RestrictedTaskQueue_results, [], "f");
}, _RestrictedTaskQueue_runBefore = function _RestrictedTaskQueue_runBefore(limit, runMode, options) {
    __classPrivateFieldSet(this, _RestrictedTaskQueue_results, [], "f");
    __classPrivateFieldSet(this, _RestrictedTaskQueue_isAbort, false, "f");
    __classPrivateFieldSet(this, _RestrictedTaskQueue_startRunningTime, Date.now(), "f");
    console.log('================任务开始执行================');
    console.log("\u62DF\u91C7\u7528\u7684\u65B9\u6CD5\u4E3A\uFF1A" + runMode);
    console.log("\u4EFB\u52A1\u6267\u884C\u65B9\u5F0F\u4E3A\uFF1A" + ((options === null || options === void 0 ? void 0 : options.runType) || __classPrivateFieldGet(this, _RestrictedTaskQueue_options, "f").runType || 'requestIdleCallback'));
    console.log("\u6700\u5927\u5E76\u884C\u6267\u884C\u6570\u91CF\u4E3A\uFF1A" + limit + " \u4E2A");
}, _RestrictedTaskQueue_runFinished = function _RestrictedTaskQueue_runFinished(resolve) {
    // 执行完成
    console.log('================任务执行结束================');
    console.log("\u5171\u8BA1\u6267\u884C " + __classPrivateFieldGet(this, _RestrictedTaskQueue_tasks, "f").length + " \u4E2A\u4EFB\u52A1");
    console.log("\u6267\u884C\u603B\u8017\u65F6\uFF1A" + (Date.now() - __classPrivateFieldGet(this, _RestrictedTaskQueue_startRunningTime, "f")) + "ms");
    resolve(__classPrivateFieldGet(this, _RestrictedTaskQueue_results, "f"));
    __classPrivateFieldGet(this, _RestrictedTaskQueue_instances, "m", _RestrictedTaskQueue_empty).call(this);
}, _RestrictedTaskQueue_runTask = function _RestrictedTaskQueue_runTask(task, next, options) {
    if (__classPrivateFieldGet(this, _RestrictedTaskQueue_isAbort, "f"))
        return;
    var callback = function () {
        task(next);
    };
    var _a = Object.assign({}, __classPrivateFieldGet(this, _RestrictedTaskQueue_options, "f"), options), runType = _a.runType, timeout = _a.timeout;
    switch (runType) {
        case 'setTimeout':
            setTimeout(callback, 0);
            break;
        case 'requestAnimationFrame':
            requestAnimationFrame(callback);
            break;
        case 'requestIdleCallback':
        default:
            requestIdleCallback(callback, { timeout: timeout });
            break;
    }
}, _RestrictedTaskQueue_runCallback = function _RestrictedTaskQueue_runCallback(callback) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof callback === 'function') {
        callback.apply(void 0, args);
    }
};
