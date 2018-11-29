const cloud = require('wx-server-sdk')
const {
  WXPay,
  WXPayConstants,
  WXPayUtil
} = require('wx-js-utils')
const ip = require('ip')
const {
  ENV,
  MCHID,
  KEY,
  CERT_FILE_CONTENT,
  TIMEOUT
} = require('./config/index')

cloud.init({
  env: ENV
})

// 云函数入口
exports.main = async function (event) {
  const {
    OPENID,
    APPID
  } = cloud.getWXContext()

  const pay = new WXPay({
    appId: APPID,
    mchId: MCHID,
    key: KEY,
    certFileContent: CERT_FILE_CONTENT,
    timeout: TIMEOUT,
    signType: WXPayConstants.SIGN_TYPE_MD5,
    useSandbox: false // 不使用沙箱环境
  })

  const {type, data} = event

  const db = cloud.database()
  const goodCollection = db.collection('goods')
  const orderCollection = db.collection('orders')

  // 订单文档的status 0 未支付 1 已支付 2 已关闭
  switch (type) {
    // 统一下单（分别在微信支付侧和云开发数据库生成订单）
    case 'unifiedorder':
      const {goodId} = data
      let goods = null
      let good = null

      try {
        goods = await goodCollection.doc(goodId).get()

        if (!goods.data) {
          return {
            code: 1,
            message: '找不到商品'
          }
        }
      } catch (e) {
        return {
          code: 1,
          message: '找不到商品'
        }
      }
      good = goods.data

      // 拼凑订单参数
      const curTime = Date.now()
      const tradeNo = `${goodId}-${curTime}`
      const body = good.name
      const spbill_create_ip = ip.address() || '127.0.0.1'
      const notify_url = 'http://www.qq.com' // '云函数暂时没有外网地址和HTTP触发起，暂时随便填个地址。'
      const total_fee = good.price
      const time_stamp = '' + Math.ceil(Date.now() / 1000)
      const out_trade_no = `${tradeNo}`
      const sign_type = WXPayConstants.SIGN_TYPE_MD5

      const orderParam = {
        body,
        spbill_create_ip,
        notify_url,
        out_trade_no,
        total_fee,
        openid: OPENID,
        trade_type: 'JSAPI',
        timeStamp: time_stamp,
      }

      // 在微信支付服务端生成该订单
      const {
        return_code,
        ...restData
      } = await pay.unifiedOrder(orderParam)

      let order_id = null

      if (return_code === 'SUCCESS' && restData.result_code === 'SUCCESS') {
        const {
          prepay_id,
          nonce_str
        } = restData

        // 生成微信支付签名，为后在小程序端进行支付打下基础
        const sign = WXPayUtil.generateSignature({
          appId: APPID,
          nonceStr: nonce_str,
          package: `prepay_id=${prepay_id}`,
          signType: 'MD5',
          timeStamp: time_stamp
        }, KEY)

        const orderData = {
          out_trade_no,
          time_stamp,
          nonce_str,
          sign,
          sign_type,
          body,
          total_fee,
          prepay_id,
          sign,
          status: 0, // 0表示刚创建订单
          _openid: OPENID,
        }

        const order = await orderCollection.add({
          data: orderData
        })

        order_id = order.id
      }

      return {
        code: return_code === 'SUCCESS' ? 0 : 1,
        data: {
          out_trade_no, time_stamp, order_id, ...restData
        }
      }

    // 订单查询
    case 'orderquery': {
      const {transaction_id, out_trade_no} = data
      // 查询订单

      const {data: dbData} = await orderCollection
        .where({out_trade_no})
        .get()

      const {return_code, ...restData} = await pay.orderQuery({
        transaction_id,
        out_trade_no
      })

      return {
        code: return_code === 'SUCCESS' ? 0 : 1,
        data: {...restData, ...dbData[0]}
      }
    }

    // 进行微信支付及更新订单状态
    case 'payorder': {
      const {
        out_trade_no,
        prepay_id,
        body,
        total_fee
      } = data

      const {return_code, ...restData} = await pay.orderQuery({
        out_trade_no
      })

      if (restData.trade_state === 'SUCCESS') {
        const result = await orderCollection
          .where({out_trade_no})
          .update({
            data: {
              status: 1,
              trade_state: restData.trade_state,
              trade_state_desc: restData.trade_state_desc
            }
          })

        // console.log('======restData======');
        // console.log(restData);

        const curTime = restData.time_end
        const time = `${curTime.slice(0, 4)}-${curTime.slice(4, 6)}-${curTime.slice(6, 8)} ${curTime.slice(8, 10)}:${curTime.slice(10, 12)}:${curTime.slice(12, 14)}`
        try {
          const messageResult = await cloud.callFunction({
            name: 'pay-message',
            data: {
              formId: prepay_id,
              openId: OPENID,
              appId: APPID,
              page: `pages/pay-result/index?id=${out_trade_no}`,
              data: {
                keyword1: {
                  value: out_trade_no // 订单号
                },
                keyword2: {
                  value: body // 物品名称
                },
                keyword3: {
                  value: time// 支付时间
                },
                keyword4: {
                  value: (total_fee / 100) + '元' // 支付金额
                }
              }
            }
          })
          console.log('=======message=========')
          console.log(messageResult)
        } catch (e) {
          console.log('===========')
          console.log(e)
        }
      }

      return {
        code: return_code === 'SUCCESS' ? 0 : 1,
        data: restData
      }
    }

    // 关闭订单
    case 'closeorder': {
      const {out_trade_no} = data
      const {return_code, ...restData} = await pay.closeOrder({
        out_trade_no
      })
      if (return_code === 'SUCCESS' &&
        restData.result_code === 'SUCCESS') {
        await orderCollection
          .where({out_trade_no})
          .update({
            data: {
              status: 2,
              trade_state: 'CLOSED',
              trade_state_desc: '订单已关闭'
            }
          })
      }

      return {
        code: return_code === 'SUCCESS' ? 0 : 1,
        data: restData
      }
    }

    // 申请退款
    case 'refund': {
      const {out_trade_no} = data
      const orders = await orderCollection.where({out_trade_no}).get()

      console.log(orders)

      if (!orders.data.length) {
        return {
          code: 1,
          message: '找不到订单'
        }
      }

      const order = orders.data[0]
      const {
        total_fee,
      } = order

      const result = await pay.refund({
        out_trade_no,
        total_fee,
        out_refund_no: out_trade_no,
        refund_fee: total_fee
      })

      const {return_code} = result

      if (return_code === 'SUCCESS') {
        try {
          await orderCollection.where({out_trade_no}).update({
            data: {
              trade_state: 'REFUNDING',
              trade_state_desc: '正在退款',
              status: 3
            }
          })
        } catch (e) {
          return {
            code: 1,
            mesasge: e.message
          }
        }
      } else {
        return {
          code: 1,
          mesasge: '退款失败，请重试'
        }
      }

      return {
        code: 0,
        data: {}
      }
    }

    // 查询退款情况
    case 'queryrefund': {
      const {out_trade_no} = data

      const result = await pay.refundQuery({
        out_trade_no
      })

      console.log('===queryrefund================')
      console.log(result)
      const {refund_status_0, return_code} = result

      if (return_code === 'SUCCESS' && refund_status_0 === 'SUCCESS') {
        try {
          await orderCollection.where({out_trade_no}).update({
            data: {
              trade_state: 'REFUNDED',
              trade_state_desc: '已退款',
              status: 4
            }
          })

          return {
            code: 0,
            data: {
              trade_state: 'REFUNDED',
              trade_state_desc: '已退款',
              status: 4
            }
          }
        } catch (e) {
          return {
            code: 0
          }
        }
      } else {
        return {
          code: 0
        }
      }

      return {
        code: 0
      }
    }
  }
}
