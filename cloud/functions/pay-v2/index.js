const cloud = require('./wx-server-sdk')
const ip = require('ip')
const { ENV, MCHID } = require('./config/index')

cloud.init({
  env: ENV
})

// 云函数入口
exports.main = async function(event) {
  const { OPENID, APPID } = cloud.getWXContext()

  console.log(OPENID, APPID)

  const { type, data } = event
  console.log(event)

  const db = cloud.database()
  const goodCollection = db.collection('goods')
  const orderCollection = db.collection('orders-v2')

  // 订单文档的status 0 未支付 1 已支付 2 已关闭
  switch (type) {
    // 统一下单（分别在微信支付侧和云开发数据库生成订单）
    case 'unifiedorder':
      const { goodId, subscribedTmplId } = data
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
      const spbillCreateIp = ip.address() || '127.0.0.1'
      const totalFee = good.price
      const timeStamp = '' + Math.ceil(Date.now() / 1000)
      const outTradeNo = `${tradeNo}`

      const orderParam = {
        body,
        outTradeNo,
        spbillCreateIp,
        subMchId: MCHID,
        subAppid: APPID,
        totalFee: parseInt(totalFee),
        envId: ENV,
        functionName: 'pay-result'
      }

      console.log(orderParam)

      // 在微信支付服务端生成该订单
      const { returnCode, ...restData } = await cloud.cloudPay.unifiedOrder(
        orderParam
      )

      console.log(returnCode, restData)

      let orderId = null

      if (returnCode === 'SUCCESS' && restData.resultCode === 'SUCCESS') {
        const { nonceStr, prepayId, sign, payment } = restData

        const orderData = {
          outTradeNo,
          timeStamp,
          nonceStr,
          body,
          totalFee,
          prepayId,
          payment,
          subscribedTmplId,
          status: 0, // 0表示刚创建订单
          _openid: OPENID
        }

        const order = await orderCollection.add({
          data: orderData
        })

        orderId = order.id
      }

      return {
        code: returnCode === 'SUCCESS' ? 0 : 1,
        data: {
          outTradeNo,
          timeStamp,
          orderId,
          ...restData
        }
      }

    // 订单查询
    case 'orderquery': {
      const { outTradeNo } = data
      // 查询订单

      const { data: dbData } = await orderCollection.where({ outTradeNo }).get()

      const orderParam = {
        subMchId: MCHID,
        subAppid: APPID,
        outTradeNo
      }
      console.log('orderQuery', orderParam)
      const { returnCode, ...restData } = await cloud.cloudPay.queryOrder(
        orderParam
      )

      console.log(returnCode, restData)

      return {
        code: returnCode === 'SUCCESS' ? 0 : 1,
        data: { ...restData, ...dbData[0] }
      }
    }

    // 进行微信支付及更新订单状态
    case 'payorder': {
      const { outTradeNo } = data

      const { returnCode, ...restData } = await cloud.cloudPay.queryOrder({
        subMchId: MCHID,
        subAppid: APPID,
        outTradeNo
      })

      console.log(returnCode, restData)
      const { data: dbData } = await orderCollection.where({ outTradeNo }).get()
      const dbOrderData = dbData[0]

      const {
        tradeState,
        tradeStateDesc,
        timeEnd,
        totalFee,
        subOpenid
      } = restData

      if (restData.tradeState === 'SUCCESS') {
        await orderCollection.where({ outTradeNo }).update({
          data: {
            status: 1,
            tradeState,
            tradeStateDesc
          }
        })

        if (dbOrderData.subscribedTmplId) {
          const curTime = timeEnd
          const time = `${curTime.slice(0, 4)}-${curTime.slice(
            4,
            6
          )}-${curTime.slice(6, 8)} ${curTime.slice(8, 10)}:${curTime.slice(
            10,
            12
          )}:${curTime.slice(12, 14)}`

          const messageResult = await cloud.openapi.subscribeMessage.send({
            touser: subOpenid,
            page: `pages/pay-result/index?id=${outTradeNo}`,
            data: {
              character_string9: {
                value: outTradeNo // 订单号
              },
              thing6: {
                value: dbOrderData.body // 物品名称
              },
              date8: {
                value: time // 支付时间
              },
              amount7: {
                value: totalFee / 100 + '元' // 支付金额
              }
            },
            templateId: dbOrderData.subscribedTmplId
          })

          console.log('messageResult', messageResult)
        }
      }

      return {
        code: returnCode === 'SUCCESS' ? 0 : 1,
        data: dbOrderData
      }
    }

    // 关闭订单
    case 'closeorder': {
      const { outTradeNo } = data
      const { returnCode, ...restData } = await cloud.cloudPay.closeOrder({
        subMchId: MCHID,
        subAppid: APPID,
        outTradeNo
      })
      if (returnCode === 'SUCCESS' && restData.resultCode === 'SUCCESS') {
        await orderCollection.where({ outTradeNo }).update({
          data: {
            status: 2,
            tradeState: 'CLOSED',
            tradeStateDesc: '订单已关闭'
          }
        })
      }

      return {
        code: returnCode === 'SUCCESS' ? 0 : 1,
        data: restData
      }
    }

    // 申请退款
    case 'refund': {
      const { outTradeNo } = data
      const orders = await orderCollection.where({ outTradeNo }).get()

      if (!orders.data.length) {
        return {
          code: 1,
          message: '找不到订单'
        }
      }

      const order = orders.data[0]
      const { totalFee } = order

      const result = await cloud.cloudPay.refund({
        subMchId: MCHID,
        subAppid: APPID,
        outTradeNo,
        totalFee: parseInt(totalFee),
        outRefundNo: outTradeNo,
        refundFee: parseInt(totalFee),
        envId: ENV,
        functionName: 'refund-result'
      })

      const { returnCode } = result

      if (returnCode === 'SUCCESS') {
        try {
          await orderCollection.where({ outTradeNo }).update({
            data: {
              tradeState: 'REFUNDING',
              tradeStateDesc: '正在退款',
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
      const { outTradeNo } = data

      const result = await cloud.cloudPay.queryRefund({
        subMchId: MCHID,
        subAppid: APPID,
        outTradeNo
      })

      const { resultCode, returnCode } = result
      console.log(result, resultCode, returnCode)

      if (returnCode === 'SUCCESS' && resultCode === 'SUCCESS') {
        try {
          await orderCollection.where({ outTradeNo }).update({
            data: {
              tradeState: 'REFUNDED',
              tradeStateDesc: '已退款',
              status: 4
            }
          })

          return {
            code: 0,
            data: {
              tradeState: 'REFUNDED',
              tradeStateDesc: '已退款',
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
    }
  }
}
