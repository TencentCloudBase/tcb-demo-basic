import { app, $app } from '../../../../../app/weapps-api';
import { $page, $w } from '../../../pages/chat/api';

export default function Typewriter(onConsume) {
  this.queue = [];
  this.consuming = false;
  this.timer = null;
  this.onConsume = onConsume;
}
// 动态计算打字速度
Typewriter.prototype.dynamicSpeed = function () {
  const speed = 2000 / this.queue.length;
  return speed > 20 ? 20 : speed;
};
// 添加字符串到队列
Typewriter.prototype.add = function (str) {
  if (!str) return;
  this.queue.push(...str.split(''));
};
// 消费队列中的字符
Typewriter.prototype.consume = function () {
  if (this.queue.length > 0) {
    const str = this.queue.shift();
    str && this.onConsume(str);
  }
};
// 处理下一个字符
Typewriter.prototype.next = function () {
  if (!this.consuming) return; // 如果已经调用了 done，就不再执行
  this.consume();
  this.timer = setTimeout(() => {
    this.next();
  }, this.dynamicSpeed());
};
// 开始打字动画
Typewriter.prototype.start = function () {
  this.consuming = true;
  this.next();
};
// 完成打字动画并清空队列
Typewriter.prototype.done = function () {
  this.consuming = false;
  clearTimeout(this.timer);
  this.onConsume(this.queue.join(''));
  this.queue = [];
};