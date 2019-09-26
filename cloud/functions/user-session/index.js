const cloud = require('wx-server-sdk')
const {
  WXMINIUser,
} = require('wx-js-utils')
const {
  secret
} = require('./config')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()

  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  const wXMINIUser = new WXMINIUser({
    appId: APPID,
    secret
  })

  const code = event.code // 从小程序端的 wx.login 接口传过来的 code 值
  const info = await wXMINIUser.codeToSession(code)

  try {
    // 查询有没用户数据
    const user = await db.collection('users').where({
      _openid: OPENID
    }).get()

    // 如果有数据，则只是更新 `session_key`，如果没数据则添加该用户并插入 `sesison_key`
    if (user.data.length) {
      await db.collection('users').where({
        _openid: OPENID
      }).update({
        data: {
          session_key: info.session_key
        }
      })
    } else {
      await db.collection('users').add({
        data: {
          session_key: info.session_key,
          _openid: OPENID
        }
      })
    }
  } catch (e) {
    return {
      message: e.message,
      code: 1,
    }
  }

  return {
    message: 'login success',
    code: 0
  }
}
