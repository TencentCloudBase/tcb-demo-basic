// pages/reserve-detail/index.js
// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'teplateMessage & uniformMessage',
    reserve: {
      visiotor: '',
      date: '',
      time: '',
      status: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    wx.showLoading({
      title: '数据获取中...',
      mask: true
    })

    const {result} = await wx.cloud.callFunction({
      name: 'get-reserve',
      data: {}
    })
    wx.hideLoading()

    if (result && result.code === 0 && result.data.data.length > 0) {
      const reserve = result.data.data[0]
      this.setData({reserve})
    } else {
      wx.showLoading({
        title: '没有获取到预约信息',
        icon: 'error',
        mask: true
      })
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/reserve/index'
        })
      }, 1000)
    }
  },
  goBack() {
    const currentPages = getCurrentPages()
    if (currentPages.length > 1) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.reLaunch({
        url: '/pages/reserve/index'
      })
    }
  }
})
