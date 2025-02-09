// 小程序自定义组件, 内联事件
const bulidinEvents = [
  'touchstart', //	手指触摸动作开始
  'touchmove', //		手指触摸后移动
  'touchcancel', //		手指触摸动作被打断，如来电提醒，弹窗
  'touchend', //		手指触摸动作结束
  'tap', //		手指触摸后马上离开
  'longpress', //		手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发	1.5.0
  'longtap', //		手指触摸后，超过350ms再离开（推荐使用longpress事件代替）
  'transitionend', //		会在 WXSS transition 或 wx.createAnimation 动画结束后触发
  'animationstart', //		会在一个 WXSS animation 动画开始时触发
  'animationiteration', //		会在一个 WXSS animation 一次迭代结束时触发
  'animationend', //		会在一个 WXSS animation 动画完成时触发
  'touchforcechange', // 在支持 3D Touch 的 iPhone 设备，重按时会触发
];

function triggerEvent(name) {
  return function (e) {
    // 如果命中了自定义组件内联事件,不需要重复触发
    if (!bulidinEvents.includes(name)) {
      this.triggerEvent(name, e.detail);
    }
  };
}

export default function (events, methodPrefix) {
  const methods = {};
  events.forEach((item) => {
    methods[(methodPrefix ? methodPrefix : '') + item.name] = triggerEvent(
      item.name
    );
  });
  return methods;
}
