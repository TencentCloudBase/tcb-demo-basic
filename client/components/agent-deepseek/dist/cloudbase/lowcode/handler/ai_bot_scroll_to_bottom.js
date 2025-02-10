import { getWedaAPI } from '@cloudbase/weda-client';
const app = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.app?.[prop] }});
const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});
const $w = new Proxy({}, { get: function(obj, prop){ return getWedaAPI()?.$w?.[prop] }});

/**
 * 
 * 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
 * 可通过 app 获取或修改全局应用的 变量 状态 等信息
 * 具体可以console.info 在编辑器Console面板查看更多信息
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 * 帮助文档 https://cloud.tencent.com/document/product/1301/57912
 **/
/**
 * @param {Object} event - 事件对象
 * @param {string} event.type - 事件名
 * @param {any} event.detail - 事件携带自定义数据
 *
 * @param {Object} data
 * @param {any} data.target - 获取事件传参的数据
 **/
export default debounce(function({event, data}) {
  // console.log('ai_bot_scroll_to_bottom',this.$WEAPPS_COMP.dataset.state.ai_bot_ui_scroll_to_bottom)
   if (!this.$WEAPPS_COMP.dataset.state.ai_bot_ui_scroll_to_bottom) return 
   
    setTimeout(() => {
      if (!this.$WEAPPS_COMP.dataset.state.ai_bot_scroll_top) {
          this.$WEAPPS_COMP.dataset.state.ai_bot_scroll_top = 1
      }
      this.$WEAPPS_COMP.dataset.state.ai_bot_scroll_top += (this.$WEAPPS_COMP.dataset.state.ai_bot_ui_scroll_height || 9999) + Math.random() * 100
      this.$WEAPPS_COMP.dataset.state.ai_bot_ui_scroll_to_bottom = true
    }, 0)
}, 100)
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}