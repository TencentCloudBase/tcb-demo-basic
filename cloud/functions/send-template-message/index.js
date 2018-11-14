/* eslint-disable camelcase */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const {
  WXMINIUser,
  WXMINIMessage,
} = require('wx-js-utils')

// 云函数入口函数
exports.main = async (event) => {
  const {
    appId,
    secret,
    templateId,
    formId,
    data,
    page,
    openId
  } = event

  const wxMiniUser = new WXMINIUser({appId, secret})
  const access_token = await wxMiniUser.getAccessToken()

  const wxMiniMessage = new WXMINIMessage({openId, formId, templateId})

  return wxMiniMessage.sendMessage({
    access_token,
    data,
    page
  })
}
