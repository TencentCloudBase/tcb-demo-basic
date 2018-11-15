// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const {
  weappTemplateId,
  weappSecret,
  mpAppId,
  mpTemplateId
} = require('./config') // 小程序 secret id


const sendTemplateMessage = require('./lib/send-template-message')
const sendUniformMessage = require('./lib/send-uniform-message')

// 云函数入口函数
exports.main = async (event) => {
  const {
    OPENID: openId,
    APPID: appId
  } = cloud.getWXContext()
  const {
    messageType,
    formId,
    page,
    data,
    url
  } = event

  // 发送统一服务消息
  // 有weapp_template_msg优先发送小程序消息
  // 没有weapp_template_msg但有mp_template_msg会发送公众号模板消息
  if (+messageType === 1) {
    // 发送模板消息
    return sendTemplateMessage({
      appId,
      openId,
      secret: weappSecret,
      templateId: weappTemplateId,
      formId,
      page,
      data
    })
  } else if (+messageType === 2) {
    return sendUniformMessage({
      touser: openId,
      appId,
      secret: weappSecret,
      weappTemplateMsg: {
        template_id: weappTemplateId,
        form_id: formId,
        page,
        data
      }
    })
  } else if (+messageType === 3) {
    return sendUniformMessage({
      touser: openId,
      appId,
      secret: weappSecret,
      mpTemplateMsg: {
        appid: mpAppId,
        template_id: mpTemplateId,
        url,
        miniprogram: {
          appid: appId,
          // pagepath这个地址会到线上校验，也就是说如果小程序未发布，这里会报地址错误，建议上线后再测此功能
          pagepath: page
        },
        data
      }
    })
  }
}
