
const {
  WXMINIUser,
  WXMINIMessage,
} = require('wx-js-utils')

module.exports = async (param) => {
  const {
    appId,
    formId,
    secret,
    templateId,
    data,
    page,
    openId
  } = param

  const wXMINIUser = new WXMINIUser({appId, secret})
  const accessToken = await wXMINIUser.getCacheAccessToken()

  const wxMiniMessage = new WXMINIMessage({openId, formId, templateId})

  return wxMiniMessage.sendMessage({
    access_token: accessToken,
    data,
    page
  })
}
