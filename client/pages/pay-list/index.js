// 购买商品
// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')
const config = require('./config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getGoodsList()
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '小程序·云开发体验 - 微信支付',
      path: '/pages/pay-list/index',
    }
  },

  // 获取商品数据
  async getGoodsList() {
    const db = wx.cloud.database()
    const result = await db.collection('goods').get()
    const data = result.data || []

    this.setData({
      goods: data
    })
  },

  // 商品下单
  async makeOrder(e) {
    const subscribedTmplId = await this.subscribe()

    wx.showLoading({
      title: '正在下单',
    })

    const id = e.target.dataset.goodid

    try {
      const {result} = await wx.cloud.callFunction({
        name: 'pay-v2',
        data: {
          type: 'unifiedorder',
          data: {
            goodId: id,
            subscribedTmplId
          }
        }
      })
      const data = result.data

      wx.hideLoading()

      wx.navigateTo({
        url: `/pages/pay-result/index?id=${data.outTradeNo}`
      })
    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '下单失败，请重试',
        icon: 'none'
      })
    }
  },
  

  // 订阅支付消息
  async subscribe () {
    return new Promise((resolve) => {
      // 调用微信 API 申请发送订阅消息
      wx.requestSubscribeMessage({
        // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
        tmplIds: [
          config.payResultTmplId
        ],
        success(res) {
          // 申请订阅成功
          if (res.errMsg === 'requestSubscribeMessage:ok' && res[config.payResultTmplId] === 'accept') {
            resolve(config.payResultTmplId)
          } else {
            resolve(null)
          }
        },
        error () {
          resolve(null)
        }
      });
    })
  }
})
