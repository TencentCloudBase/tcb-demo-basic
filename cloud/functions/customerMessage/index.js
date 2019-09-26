const cloud = require('wx-server-sdk')
const ms = require('ms')

cloud.init({
  // env: 'dev-hnrfx'
  // env: 'tcb-advanced-a656fc'
})

const TBPBot = require('./bots/tbp').TBPBot
const DialogStatus = require('./bots/tbp').DialogStatus

const db = cloud.database()
const _ = db.command
const CustomerMessageLog = db.collection('customer_message_log')

const STATUS = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE'
}

const MSG_TYPES = {
  text: 'text',
  image: 'image',
  miniprogrampage: 'miniprogrampage',
  event: 'event',
}

const HELP_TIPS = '您可以回复以下内容寻求帮助：\n重置会话请回复：reset\n订机票可回复：订机票'

async function handleEnterEvent(event) {
  const { FromUserName } = event
  const reply = {
    touser: FromUserName,
    msgtype: MSG_TYPES.text,
    text: {
      content: `您好，请问有什么可以帮助您的？\n${HELP_TIPS}`
    }
  }
  return await cloud.openapi.customerServiceMessage.send(reply)
}

async function handleMiniprogrampageMsg(event) {

}

async function handleImageMsg(event) {
  const { FromUserName } = event
  const reply = {
    touser: FromUserName,
    msgtype: event.MsgType
  }
  reply.image = { media_id: event.MediaId }
  return await cloud.openapi.customerServiceMessage.send(reply)
}

async function handleTextMsgWithTBPBot(event) {
  const { FromUserName, ToUserName } = event

  const BotId = '61a6d821-b1e9-4c5c-a789-fb6150670f1b'
  const BotEnv = 'dev'
  const roomId = `${BotEnv}!${FromUserName}!${ToUserName}`

  let result = null

  const reply = {
    touser: FromUserName,
    msgtype: event.MsgType
  }

  // 获取上一次会话
  const {data: items} = await CustomerMessageLog.where({
    roomId: roomId,
    status: STATUS.OPEN
  }).orderBy('_id', 'desc').get()

  let doc = items[0]

  // 会话上下文有效时间20分钟
  if (doc && (new Date() - doc.updatedAt > ms('20m'))) {
    const tbp = new TBPBot(BotId, BotEnv, doc._id)
    await Promise.all([
      tbp.textReset(),
      CustomerMessageLog.doc(doc._id).update({
        data: {
          reason: 'EXPIRED',
          status: STATUS.CLOSE,
          updateAt: new Date()
        }
      })
    ])
    doc = null
  }

  // 如果不存在会话则创建
  doc = doc ? doc : await CustomerMessageLog.add({
    data: {
      botId: BotId,
      botEnv: BotEnv,
      roomId: roomId,
      fromUserName: FromUserName,
      toUserName: ToUserName,
      status: STATUS.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
      logs: []
    }
  })

  const tbp = new TBPBot(BotId, BotEnv, doc._id)
  if (event.Content.toLowerCase() === 'reset') {
    await Promise.all([
      tbp.textReset(),
      CustomerMessageLog.doc(doc._id).update({
        data: {
          reason: 'RESET',
          status: STATUS.CLOSE,
          updateAt: new Date()
        }
      })
    ])
    reply.text = {
      content: `已为您重置会话上下文。\n${HELP_TIPS}`
    }
  }
  else {
    const tbpResult = await tbp.textProcess(event.Content)

    if (tbpResult.ResponseText === '对不起，我不明白你的意思。') {
      reply.text = {
        content: `智能客服未能理解您的意思，已经自动为您转人工客服，请稍后...`
      }
  
      result = {
        ToUserName: FromUserName,
        FromUserName: event.ToUserName,
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: 'transfer_customer_service'
      }
    }
    else {
      reply.text = {
        content: tbpResult.ResponseText
      }
    }

    await CustomerMessageLog.doc(doc._id).update({
      data: {
        status: tbpResult.DialogStatus === DialogStatus.COMPLETE ? STATUS.CLOSE : STATUS.OPEN,
        updatedAt: new Date(),
        logs: _.push({
          inputMessage: event.Content,
          replyMessage: tbpResult.ResponseText,
          event,
          reply,
          createdAt: new Date()
        })
      }
    })
  }

  await cloud.openapi.customerServiceMessage.send(reply)
  return result
}

async function handleTextMsgWithTBPBotSample(event) {
  const { FromUserName, ToUserName } = event

  const BotId = '61a6d821-b1e9-4c5c-a789-fb6150670f1b'
  const BotEnv = 'dev'
  const roomId = `${BotEnv}!${FromUserName}!${ToUserName}`

  let result = null

  const reply = {
    touser: FromUserName,
    msgtype: event.MsgType
  }

  const tbp = new TBPBot(BotId, BotEnv, roomId)

  if (event.Content.toLowerCase() === 'reset') {
    await Promise.all([
      tbp.textReset()
    ])
    reply.text = {
      content: `已为您重置会话上下文。\n${HELP_TIPS}`
    }
  }
  else {
    const tbpResult = await tbp.textProcess(event.Content)

    if (tbpResult.ResponseText === '对不起，我不明白你的意思。') {
      reply.text = {
        content: `智能客服未能理解您的意思，已经自动为您转人工客服，请稍后...`
      }
  
      result = {
        ToUserName: FromUserName,
        FromUserName: event.ToUserName,
        CreateTime: Math.floor(Date.now() / 1000),
        MsgType: 'transfer_customer_service'
      }
    }
    else {
      reply.text = {
        content: tbpResult.ResponseText
      }
    }
  }

  await cloud.openapi.customerServiceMessage.send(reply)
  return result
}

exports.main = async (event, context) => {
  let result

  switch (event.MsgType) {
    case MSG_TYPES.event:
      if (event.Event === 'user_enter_tempsession') {
        result = await handleEnterEvent(event)
      }
      break;
  
   case MSG_TYPES.miniprogrampage:
       result = await handleMiniprogrampageMsg(event)
       break;
  
   case MSG_TYPES.image:
       result = await handleImageMsg(event)
       break;

   case MSG_TYPES.text:
      result = await handleTextMsgWithTBPBot(event)
      // result = await handleTextMsgWithTBPBotSample(event)
      break;

    default:
      break;
  }

  return result ? result : 'success'
}
