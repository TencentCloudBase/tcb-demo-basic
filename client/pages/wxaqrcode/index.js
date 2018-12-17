// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

Page({

  data: {
    title: 'qrcode',
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '小程序·云开发体验 - 小程序码',
      path: '/pages/wxaqrcode/index',
    }
  },

  onCreateSquare() {
    this.create('square')
  },

  onCreateLimit() {
    this.create('limit')
  },

  async create(type = 'square') {
    wx.showLoading({
      title: '加载中',
    })

    try {
      const res = await wx.cloud.callFunction({
        name: 'wxaqrcode',
        data: {
          type
        }
      })

      wx.hideLoading()
      const result = res.result

      if (result.code) {
        wx.showToast({
          title: result.msg,
          icon: 'none'
        })
        return
      }

      this.setData({qrSource: result.fileID})
    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '生成失败！',
        icon: 'none',
        duration: 3000
      })
    }
  },

  goHome() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }

})
