import { app, $app } from '../../../../../app/weapps-api';
import { $page, $w } from '../../../pages/chat/api';
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
export default async function({event, data}) {
  const {
    msg,
    history,
    bot
  } = data.target
   if ($w.page.dataset.state.ai_bot_current_bot.is_need_recommand === false) {
    return 
   }
   
  // 同步代码实现
    const res = await $w.cloud.callFunction({
      name: 'cloudbase_module',
      data: {
        name: 'ai_bot_get_recommend_questions',
        data: {
          msg,
          history,
          bot
        }
      }
    })
    const content = res.result?.choices?.[0]?.message?.content
    const splitSymbols = ['\n'];
    let questions
    for (let s of splitSymbols) {
      if (Array.isArray(questions) && questions.length >= 3){
        break;
      }
      questions = content.split(s).map(item => item.trim()).filter(item => {
        return !!item && !(item.includes('用户可能问的') || item.match(/^[1-3]\./))
      })
    }
    if (Array.isArray(questions) && questions.length >= 3) {
      $w.page.dataset.state.ai_bot_recomand_questions = questions.slice(0, 3)
      $w.page.handler.ai_bot_scroll_to_bottom({})
    }
}