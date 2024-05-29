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
  if ((['initing', 'sending', 'loading']).includes($w.page.dataset.state.ai_bot_status)) return
  $w.page.dataset.state.ai_bot_status = 'sending'
  try {
    $w.page.dataset.state.ai_bot_recomand_questions = []
    const msg = {
      content: data.target?.trim(),
      bot: $w.page.dataset.state.ai_bot_current_bot._id,
      role: 'user',
      draft: true
    }
    $w.page.dataset.state.ai_bot_chat_history = [...$w.page.dataset.state.ai_bot_chat_history, msg]
    $w.page.handler.ai_bot_scroll_to_bottom({})
    $w.textarea1.setValue({
      value: ''
    });
    const [_welcome, ...history] = $w.page.dataset.state.ai_bot_chat_history
    msg.draft = false
    $w.page.dataset.state.ai_bot_status = 'loading'
    $w.page.handler.ai_bot_get_recommend_questions({
      data: {
        target: {
          msg: msg.content,
          history: validateAndFixChatList(history),
          bot: msg.bot
        }
      }
    }
    )
    const id = generateUniqueIdWithTimestamp();
    if ($w.page.dataset.state.ai_bot_current_bot.stream ?? true) {
      // 流式监听消息流
      $w.page.handler.ai_bot_watch_stream_msg({
        data: {
          target: {
            _id: id
          }
        }
      })
    }
    $w.page.handler.ai_bot_scroll_to_bottom({})
    // 发送消息接口
    const res = await $w.cloud.callFunction({
      name: 'cloudbase_module',
      data: {
        name: 'ai_bot_send_msg',
        data: {
          _id: id,
          msg: msg.content,
          history: validateAndFixChatList(history),
          bot: msg.bot,
          wedaUserId: $w.auth.currentUser.userId,
          stream: true,
          botInfo: $w.page.dataset.params.debug === "1" ? $page.dataset.state.ai_bot_current_bot : undefined
        }
      }
    })
    if (!res.result?.errcode) {
      const reply = res.result?.data;
      const recommend_questions = res.result?.data?.recommend_questions;
      // 非流式输出
      if (reply.content) {
        $w.page.handler.ai_bot_stop_msg_output({})
        $w.page.handler.ai_bot_update_msg({
          data: {
            target: {
              _id: id,
              data: reply
            }
          }
        })
        if ($w.page.dataset.state.ai_bot_ui_scroll_to_bottom) {
          $w.page.handler.ai_bot_scroll_to_bottom({});
        }
      }
      if (Array.isArray(recommend_questions) && recommend_questions?.length) {
        $w.page.dataset.state.ai_bot_recomand_questions = recommend_questions.slice(0, 5)
      }
      $w.page.handler.ai_bot_scroll_to_bottom({})
    } else {
      console.log(res)
    }
  } catch (e) {
    console.log(e)
  }
  $w.page.handler.ai_bot_scroll_to_bottom({})
}
function validateAndFixChatList(chatList = []) {
  const result = []
  chatList.forEach((item, i) => {
    const j = result.length
    const { role, content } = item
    if (j % 2 === 0 && role === 'assistant') {
      result.push({
        item,
        role
      })
    }
    if (j % 2 === 1 && role === 'user') {
      result.push({
        item,
        role
      })
    }
  })
  return result
};
function generateUniqueIdWithTimestamp() {
  const length = 32;
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let uniqueId = '';
  for (let i = 0; i < length; i++) {
    uniqueId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return uniqueId + '-' + Date.now();
}