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
export default async function ({ event, data }) {
  const { target: { message, botId } } = data
  const raw = {
    "botId": botId,
    "msg": message,
    "name": this.$WEAPPS_COMP.dataset.state.botInfo.name,
    "introduction": this.$WEAPPS_COMP.dataset.state.botInfo.introduction,
    "agentSetting": this.$WEAPPS_COMP.dataset.state.botInfo.agentSetting,
  };
  const res = await this.$WEAPPS_COMP.__internal__?.$w?.app.ai.bot.getRecommendQuestions(raw)
  let result = ''
  for await (let str of res.textStream) {
    result += str
    this.$WEAPPS_COMP.dataset.state.recommendQuestions = result.split('\n')
    if (this.$WEAPPS_COMP.dataset.state.ai_bot_ui_scroll_to_bottom) {
      this.$WEAPPS_COMP.handler.ai_bot_scroll_to_bottom({});
    }
  }

}