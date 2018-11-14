/* eslint-disable camelcase */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const {
  WXMINIUser,
  WXUniformMessage,
} = require('wx-js-utils')

// 云函数入口函数
exports.main = async (event) => {
  const {
    touser,
    appId,
    secret,
    weapp_template_msg,
    mp_template_msg
  } = event

  const wxMiniUser = new WXMINIUser({appId, secret})
  const access_token = await wxMiniUser.getAccessToken()

  const wxUniformMessage = new WXUniformMessage()

  return wxUniformMessage.sendMessage({
    access_token,
    touser,
    weapp_template_msg,
    mp_template_msg
  })
}
