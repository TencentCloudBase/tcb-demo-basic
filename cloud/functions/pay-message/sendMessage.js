const {
  WXMINIUser,
  WXMINIMessage,
} = require('wx-js-utils');

module.exports = async function ({
  appId,
  secret,
  templateId,
  code,
  formId,
  data,
  page,
  openId
}) {

  const wxMiniUser = new WXMINIUser({ appId, secret });
  const access_token = await wxMiniUser.getAccessToken();

  const wxMiniMessage = new WXMINIMessage({ openId, formId, templateId });

  return wxMiniMessage.sendMessage({
    access_token,
    data,
    page
  });
};