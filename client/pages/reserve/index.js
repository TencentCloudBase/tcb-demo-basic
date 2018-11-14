// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'templateMessage & uniformMessage',
    currDate: '2018-11-21',
    currTime: '12:01',
    buildingIndex: 0,
    showTopTips: false,
    visitor: '张三',
    idCard: '',
    phoneNum: '13500008888',
    receptionist: 'pony',
    receptionistPhoneNum: '13500008888',
    desc: '业务往来面谈'
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '小程序·云开发体验 - 模板消息',
      path: '/pages/reserve/index',
    }
  },

  bindBuildingChange(e) {
    this.setData({buildingIndex: e.detail.value})
  },

  bindDateChange(e) {
    this.setData({currDate: e.detail.value})
  },

  bindTimeChange(e) {
    this.setData({currTime: e.detail.value})
  },

  async onReserve(e) {
    // this.setData({ showTopTips: true })
    wx.showLoading({
      title: '预约中...',
      mask: true
    })

    const messageType = e.detail.target.id.replace('messageType', '')

    try {
      const res = await wx.cloud.callFunction({
        name: 'add-reserve',
        data: {
          visitor: e.detail.value.visitor,
          phone: e.detail.value.phone,
          ID: e.detail.value.ID,
          building: e.detail.value.building,
          date: e.detail.value.date,
          time: e.detail.value.time,
          receptionist: e.detail.value.receptionist,
          receptionistPhone: e.detail.value.receptionistPhone,
          desc: e.detail.value.desc,
          formId: e.detail.formId,
          messageType
        }
      })

      wx.hideLoading()
      if (res.result) {
        const {code} = res.result
        if (code === 0) {
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/reserve-detail/index'
            })
          }, 1000)
        } else if (code === 1) {
          wx.showToast({
            title: '预约失败，请稍后重试！',
            icon: 'error',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '预约失败，请稍后重试！',
          icon: 'error',
          duration: 2000
        })
      }
    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '预约失败，请稍后重试！',
        icon: 'error',
        duration: 3000
      })
    }
  }
})
