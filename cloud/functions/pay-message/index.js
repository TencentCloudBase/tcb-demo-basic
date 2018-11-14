const {
  TEMPLATE_ID,
  SECRET,
} = require('./config/index') // 小程序 secret id
const sendMessage = require('./sendMessage')
/**
 * 统一回参
 * @param {Function} callback
 * @param {Integer} code
 * @param {Object} data
 */
function renderReturn(callback, code = 0, data = {}) {
  callback(null, {
    code,
    data
  })
}

/**
 * 云函数主入口
 * @param {Object} event 请求参数
 * @param {String} event.code 用户登录凭证
 * @param {String} event.formId 表单提交中携带的 from_id
 * @param {String} event.prepayId 支付场景中的 prepayId
 * @param {Object} event.data 模板内容
 * @param {string} event.page 点击模板卡片后的跳转页
 * @param {string} event.userInfo 用户的 openId，和小程序的 appId
 * @param {string} event.templateId 模板 id
 * @param {Object} context
 * @param {Function} callback 云函数回调
 */
exports.main = async (event, context, callback) => {
  const {
    code,
    formId,
    data,
    page,
    prepayId,
    appId,
    openId
  } = event

  return sendMessage({
    appId,
    secret: SECRET,
    templateId: event.templateId || TEMPLATE_ID,
    code,
    formId: formId || prepayId,
    data,
    page,
    openId,
  }).then(msg => renderReturn(callback, 0, msg))
    .catch(err => renderReturn(callback, 1, err))
}
