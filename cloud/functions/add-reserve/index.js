// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const {
  TEMPLATE_ID,
  SECRET,
  mpAppId,
  mpTemplateId
} = require('./config/index') // 小程序 secret id

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
 * @param {Function} callback 云函数回调
 */
exports.main = async (event, context, callback) => {
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()
  const {
    visitor,
    phone = 13988886666,
    ID,
    building,
    date,
    time,
    receptionist,
    receptionistPhone = 13988886666,
    desc = '业务往来面谈',
    formId,
    messageType = 1
  } = event

  const db = cloud.database()
  const reserves = await db.collection('reserves').where({
    _openid: OPENID
  }).get()

  let res
  if (reserves.data.length) {
    // reserve has found
    res = await db.collection('reserves').where({
      OPENID
    }).update({
      data: {
        visitor,
        phone,
        ID,
        OPENID,
        building,
        date,
        time,
        receptionist,
        receptionistPhone,
        desc,
        formId,
        status: 0
      }
    })
    console.log('update res: ' + JSON.stringify(res))
  } else {
    res = await db.collection('reserves').add({
      data: {
        visitor,
        phone,
        ID,
        OPENID,
        building,
        date,
        time,
        receptionist,
        receptionistPhone,
        desc,
        formId,
        status: 0
      }
    })
    console.log('add res: ' + JSON.stringify(res))
  }


  // 发送统一服务消息
  // 有weapp_template_msg优先发送小程序消息
  // 没有weapp_template_msg但有mp_template_msg会发送公众号模板消息
  if (+messageType === 1) {
    // 发送模板消息
    await cloud.callFunction({
      name: 'send-template-message',
      data: {
        appId: APPID,
        openId: OPENID,
        secret: SECRET,
        templateId: TEMPLATE_ID,
        formId,
        page: 'pages/reserve-detail/index',
        data: {
          keyword1: {
            value: visitor // 来访人
          },
          keyword2: {
            value: phone // 来访人电话
          },
          keyword3: {
            value: ['腾讯大厦', '滨海大厦', '飞亚达大厦'][building]// 大楼名称
          },
          keyword4: {
            value: `${date}`// 到访日期
          },
          keyword5: {
            value: desc// 来访事由
          }
        }
      }
    })
  } else if (+messageType === 2) {
    await cloud.callFunction({
      name: 'send-uniform-message',
      data: {
        touser: OPENID,
        appId: APPID,
        secret: SECRET,
        weapp_template_msg: {
          template_id: TEMPLATE_ID,
          form_id: formId,
          page: 'pages/reserve-detail/index',
          data: {
            keyword1: {
              value: visitor // 来访人
            },
            keyword2: {
              value: phone // 来访人电话
            },
            keyword3: {
              value: ['腾讯大厦', '滨海大厦', '飞亚达大厦'][building]// 大楼名称
            },
            keyword4: {
              value: `${date}`// 到访日期
            },
            keyword5: {
              value: desc// 来访事由
            }
          }
        }
      }
    })
  } else if (+messageType === 3) {
    await cloud.callFunction({
      name: 'send-uniform-message',
      data: {
        touser: OPENID,
        appId: APPID,
        secret: SECRET,
        mp_template_msg: {
          appid: mpAppId,
          template_id: mpTemplateId,
          url: 'http://weixin.qq.com/download',
          miniprogram: {
            appid: APPID,
            // pagepath这个地址会到线上校验，也就是说如果小程序未发布，这里会报地址错误，建议上线后再测此功能
            pagepath: 'pages/reserve-detail/index'
          },
          data: {
            first: {
              value: '预约成功'
            },
            keyword1: {
              value: visitor // 来访人
            },
            keyword2: {
              value: phone // 来访人电话
            },
            keyword3: {
              value: desc // 来访事由
            },
            keyword4: {
              value: `${date}`// 到访日期
            },
            remark: {
              value: desc// 来访事由
            }
          }
        }
      }
    })
  }


  return renderReturn(callback, 0, res)
}
