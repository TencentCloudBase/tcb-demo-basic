/* eslint-disable camelcase */
// 订单详情
// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

Page({
  data: {
    order: {}
  },

  onLoad({id}) {
    wx.showLoading({
      title: '正在加载',
    })

    this.setData({
      out_trade_no: id
    }, async () => {
      await this.getOrder()

      wx.hideLoading()
    })
  },

  // 获取订单详情
  async getOrder() {
    const {result} = await wx.cloud.callFunction({
      name: 'pay',
      data: {
        type: 'orderquery',
        data: {
          out_trade_no: this.data.out_trade_no
        }
      }
    })

    const data = result.data || {}

    this.setData({
      order: data
    }, () => {
      // 如果状态是退款中，则每次进来都会查询一下退款情况
      if (data.status === 3) {
        this.queryRefund()
      }
    })
  },

  // 发起支付
  pay() {
    const orderQuery = this.data.order
    const out_trade_no = this.data.out_trade_no

    const {
      time_stamp,
      nonce_str,
      sign,
      prepay_id,
      body,
      total_fee
    } = orderQuery

    wx.requestPayment({
      timeStamp: time_stamp,
      nonceStr: nonce_str,
      package: `prepay_id=${prepay_id}`,
      signType: 'MD5',
      paySign: sign,
      success: async () => {
        wx.showLoading({
          title: '正在支付',
        })

        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1500,
          success: async () => {
            this.getOrder()

            await wx.cloud.callFunction({
              name: 'pay',
              data: {
                type: 'payorder',
                data: {
                  body,
                  prepay_id,
                  out_trade_no,
                  total_fee
                }
              }
            })
            wx.hideLoading()
          }
        })
      },
      fail() {}
    })
  },

  // 关闭订单
  async close() {
    wx.showLoading({
      title: '正在关闭',
    })

    const out_trade_no = this.data.out_trade_no

    await wx.cloud.callFunction({
      name: 'pay',
      data: {
        type: 'closeorder',
        data: {
          out_trade_no
        }
      }
    })

    this.getOrder()

    wx.hideLoading()
  },

  // 查询退款情况
  async queryRefund() {
    const {result} = await wx.cloud.callFunction({
      name: 'pay',
      data: {
        type: 'queryrefund',
        data: {
          out_trade_no: this.data.out_trade_no
        }
      }
    })

    // 退款成功，则更新本地数据状态
    if (!result.code && result.data) {
      const data = result.data
      const order = this.data.order
      order.trade_state_desc = data.trade_state_desc
      order.status = data.status
      order.trade_state = data.trade_state

      this.setData({
        order
      })
    }
  },

  // 申请退款，但不会马上退
  async refund() {
    wx.showLoading({
      title: '正在申请退款',
    })

    const result = await wx.cloud.callFunction({
      name: 'pay',
      data: {
        type: 'refund',
        data: {
          out_trade_no: this.data.out_trade_no
        }
      }
    })

    wx.hideLoading()

    if (!result.code) {
      const order = this.data.order
      order.trade_state_desc = '正在退款'
      order.status = 3
      order.trade_state = 'REFUNDING'

      this.setData({
        order
      })
    } else {
      this.showToast({
        title: result.message,
        icon: 'none'
      })
    }
  },

  // 删除订单
  async delete() {
    const order = this.data.order
    const db = wx.cloud.database()
    try {
      wx.showLoading({
        title: '正在删除',
      })

      await db.collection('orders').doc(order._id).remove()

      wx.hideLoading()
      wx.showToast({
        title: '删除成功 ',
        icon: 'none',
        duration: 1500,
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1600)
    } catch (e) {
      wx.hideLoading()
      wx.showToast({
        title: '删除失败，请重试 ',
        icon: 'none'
      })
    }
  }
})
