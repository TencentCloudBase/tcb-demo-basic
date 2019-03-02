
const {
  WXMINIUser,
  WXUniformMessage,
} = require('wx-js-utils')

// 云函数入口函数
module.exports = async (param) => {
  const {
    touser,
    appId,
    secret,
    weappTemplateMsg,
    mpTemplateMsg
  } = param

  const wXMINIUser = new WXMINIUser({appId, secret})
  const accessToken = await wXMINIUser.getCacheAccessToken()

  const wxUniformMessage = new WXUniformMessage()

  return wxUniformMessage.sendMessage({
    access_token: accessToken,
    touser,
    weapp_template_msg: weappTemplateMsg,
    mp_template_msg: mpTemplateMsg
  })
}
