import { app, $app } from '../../../../../app/weapps-api';
import { $page, $w } from '../../../pages/chat/api';
/**
 * 
 * 监听服务端的消息
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
  const cloud = await $w.cloud.getCloudInstance()
  const db = cloud.database()
  const dbName = $w.page.dataset.state.ai_bot_db_name;
  const id = data.target._id
  const lable = '推送消息' + id
  console.time(lable)
  const typewriter = new $w.page.handler.ai_bot_steam_typewriter(consumeMsg)
  typewriter.start();
  // 消费消息
  async function consumeMsg(str) {
    clearTimeout($w.page.dataset.state.ai_bot_watcher_timer);
    let msg = $w.page.dataset.state.ai_bot_chat_history.find(item => item._id === id);
    // 用户主动中止
    if ($w.page.dataset.state.ai_bot_status === 'idle') {
      if (typewriter.consuming) {
        typewriter.done()
      }
      // await $w.cloud.callDataSource({
      //   dataSourceName: "ai_bot_chat_history_yhksihv",
      //   methodName: "wedaUpdateV2",
      //   params: {
      //     // 更新数据
      //     data: {
      //       content: msg.content
      //     },
      //     // 筛选内容，筛选内容推荐使用编辑器数据筛选器生成
      //     filter: {
      //       where: {
      //         $and: [
      //           {
      //             _id: {
      //               $eq: id,
      //             },
      //           },
      //         ],
      //       },
      //     },
      //   },
      // });
      return
    }
    // 超时处理，避免等待太久
    $w.page.dataset.state.ai_bot_watcher_timer = setTimeout(() => {
      $w.page.handler.ai_bot_stop_msg_output({});
      $w.page.handler.ai_bot_update_msg({
        data: {
          target: {
            _id: id,
            data: {
              status: 'timeout'
            }
          }
        }
      })
    }, 30 * 1000)
    msg.content += str.replace(/\u0004/, '');
    if ($w.page.dataset.state.ai_bot_ui_scroll_to_bottom) {
      $w.page.handler.ai_bot_scroll_to_bottom({});
    } 
    // 因为使用了 websocket 来替代 SSE，消息完毕后加一个字符代表消息已经发送完毕了
    // 比如使用不可见字符 U+0004 (End of Transmission)  来表示
    // 这样客户端碰到这个字符就知道什么时候消息发送完了，可以把长连接close掉
    if (str.includes('\u0004')) {
      console.log('消息发送完毕')
      console.timeEnd(lable)
      $w.page.handler.ai_bot_stop_msg_output({});
      await $w.cloud.callDataSource({
        dataSourceName: "ai_bot_chat_history_yhksihv",
        methodName: "wedaUpdateV2",
        params: {
          // 更新数据
          data: {
            content: msg.content
          },
          // 筛选内容，筛选内容推荐使用编辑器数据筛选器生成
          filter: {
            where: {
              $and: [
                {
                  _id: {
                    $eq: id,
                  },
                },
              ],
            },
          },
        },
      });
    }
  }
  // 关闭监听
  $w.page.dataset.state.ai_bot_watcher?.close?.();
  $w.page.dataset.state.ai_bot_watcher = db.collection(dbName)
    // 取按 orderBy 排序之后的前 10 个
    .limit(1)
    .where({
      _id: id,
      bot: $w.page.dataset.state.ai_bot_current_bot._id
    })
    .watch({
      onChange: async function (snapshot) {
        console.log('docs\'s changed events', snapshot.docChanges)
        console.log('query result snapshot after the event', snapshot.docs)
        console.log('is init data', snapshot.type === 'init')
        if (snapshot.docChanges && snapshot.docChanges.length > 0) {
          if ($page.dataset.state.ai_bot_status !== 'loading') {
            return
          }
          const newMsg = Object.assign({}, snapshot.docs[0]);
          let diff
          let msg = $w.page.dataset.state.ai_bot_chat_history.find(item => item._id === newMsg._id);
          if (!msg) {
            $w.page.dataset.state.ai_bot_chat_history = [...$w.page.dataset.state.ai_bot_chat_history, newMsg];
            msg = newMsg
            diff = newMsg.content
          } else {
            if (newMsg.content.startsWith($w.page.dataset.state.ai_bot_last_msg_content)) {
              diff = newMsg.content.slice($w.page.dataset.state.ai_bot_last_msg_content.length); // 从newMsg.content中去除开头的msg.content
            } else {
              diff = newMsg.content;
            }
          }
          $w.page.dataset.state.ai_bot_last_msg_content = newMsg.content
          typewriter.add(diff || '')
        }
      },
      onError: function (err) {
        // $w.page.handler.ai_bot_stop_msg_output({});
        throw err;
      }
    })
}