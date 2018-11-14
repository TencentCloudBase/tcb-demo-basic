// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
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

// 云函数入口函数
exports.main = async (event, context, callback) => {
  const {
    OPENID
  } = cloud.getWXContext()

  const db = cloud.database()
  const reserves = await db.collection('reserves').where({
    OPENID,
    status: 0
  }).get()

  renderReturn(callback, 0, reserves)
}
