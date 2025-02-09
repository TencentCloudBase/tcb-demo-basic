/* eslint-disable */
function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  // 初始化
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  // 调用func
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  // 启动延时
  function startTimer(pendingFunc, wait) {
    return setTimeout(pendingFunc, wait);
  }

  // 延时开始前
  function leadingEdge(time) {
    lastInvokeTime = time;
    // 启动延时
    timerId = startTimer(timerExpired, wait);
    // 如果是leading模式，延时前调用func
    return leading ? invokeFunc(time) : result;
  }

  //计算剩余的延时时间：
  //1. 不存在maxWait：(上一次debouncedFunc调用后)延时不能超过wait
  //2. 存在maxWait：func调用不能被延时超过maxWait
  //根据这两种情况计算出最短时间
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  //判断当前时间是否能调用func:
  //1.首次调用debouncedFunc
  //2.距离上一次debouncedFunc调用后已延迟wait毫秒
  //3.func调用总延迟达到maxWait毫秒
  //4.系统时间倒退
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  // 延时器回调
  function timerExpired() {
    const time = Date.now();
    // 如果满足时间条件，结束延时
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // 没满足时间条件，计算剩余等待时间，继续延时
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  //延时结束后
  function trailingEdge(time) {
    timerId = undefined;
    //如果是trailing模式，调用func
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  //debouncedFunc
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      //timerId不存在有两种原因：
      //1. 首次调用
      //2. 上次延时调用结束
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      // 存在func调用最长延时限制时，执行func并启动下一次延时，可实现throttle
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  return debounced;
}

export default debounce;
