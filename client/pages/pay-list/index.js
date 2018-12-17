// 购买商品
// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

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
    wx.showLoading({
      title: '正在下单',
    })

    const id = e.target.dataset.goodid

    try {
      const {result} = await wx.cloud.callFunction({
        name: 'pay',
        data: {
          type: 'unifiedorder',
          data: {
            goodId: id
          }
        }
      })

      const data = result.data

      wx.hideLoading()

      wx.navigateTo({
        url: `/pages/pay-result/index?id=${data.out_trade_no}`
      })
    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '下单失败，请重试',
        icon: 'none'
      })
    }
  }
})
