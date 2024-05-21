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
export default async function ({ event, data }) {
  if ($w.query_ai_bot_agent_detail.data) {
    $w.page.dataset.state.ai_bot_current_bot = $w.query_ai_bot_agent_detail.data
    if ($w.page.dataset.state.ai_bot_recomand_questions?.length === 0 && $w.page.dataset.state.ai_bot_current_bot?.init_questions?.length > 0) {
      const initQuestions = $w.page.dataset.state.ai_bot_current_bot.init_questions;
      if (initQuestions.length > 3) {
        // 随机选择3个问题
        const randomQuestions = [];
        while (randomQuestions.length < 3) {
          const randomIndex = Math.floor(Math.random() * initQuestions.length);
          const question = initQuestions[randomIndex];
          if (!randomQuestions.includes(question)) {
            randomQuestions.push(question);
          }
        }
        $w.page.dataset.state.ai_bot_recomand_questions = randomQuestions;
      } else {
        $w.page.dataset.state.ai_bot_recomand_questions = initQuestions;
      }
    }
    $w.page.dataset.state.ai_bot_avatar = await $w.cloud.getTempFileURL($w.page.dataset.state.ai_bot_current_bot.avatar);
    $w.page.dataset.state.ai_bot_background = await $w.cloud.getTempFileURL($w.page.dataset.state.ai_bot_current_bot.background);
  }
}
