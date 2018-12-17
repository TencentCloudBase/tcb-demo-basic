// 订单列表
// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

Page({
  data: {
    historyorders: []
  },

  onShow() {
    this.getHistoryOrder()
  },

  // 查询订单，跳转至订单详情
  queryorder(e) {
    wx.navigateTo({
      url: `/pages/pay-result/index?id=${e.currentTarget.dataset.order}`
    })
  },

  // 获取历史的所有订单
  async getHistoryOrder() {
    wx.showLoading({title: '数据获取中...'})

    const db = wx.cloud.database()
    const result = await db.collection('orders').get()
    const data = result.data || []
    this.setData({
      historyorders: data
    })
    wx.hideLoading()
  }
})
