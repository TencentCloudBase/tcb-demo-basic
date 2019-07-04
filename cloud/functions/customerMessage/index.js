const cloud = require('wx-server-sdk')
const fetch = require('node-fetch')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event:', event)

  const { OPENID } = cloud.getWXContext()

  let result

  if (event.Content == '转人工') {

    await cloud.openapi.customerServiceMessage.send({
      touser: OPENID,
      msgtype: 'text',
      text: {
        content: `人工客服正在接入中，请稍后。。`
      }
    })

    result = {
      ToUserName: OPENID,
      FromUserName: event.ToUserName,
      CreateTime: Math.floor(Date.now() / 1000),
      MsgType: 'transfer_customer_service'
    }

  } else {
    let content = {
      touser: OPENID,
      msgtype: event.MsgType
    }

    switch(event.MsgType) {
      case 'image':
      content.image = { media_id: event.MediaId } 
      break
      case 'text':
        content.text = {
          content: `已收到您的问询，此问题为: “${event.Content}” \n\n如需人工服务请回复“转人工”`
        }
        
        try{
          let motto = await fetch('https://www.liutianyou.com/api/?charset=utf-8').then(res => res.text())
          let lines = motto.split(/\n/)
          content.text.content += `\n\nQuote: “${lines[lines.length - 1]}”`
        }catch(e) {
          console.warn(e)
        }

      break
    }

    console.log('content', content)

    result = await cloud.openapi.customerServiceMessage.send(content)

  }

  console.log('result:', result)

  return result
}
