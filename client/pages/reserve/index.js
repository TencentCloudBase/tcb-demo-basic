/* eslint-disable complexity */
// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')
const curDate = new Date()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'templateMessage & uniformMessage',
    currDate: `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDay()}`,
    currTime: `${curDate.getHours()}:${curDate.getMinutes()}`,
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
    wx.showLoading({
      title: '预约中...',
      mask: true
    })

    const messageType = e.detail.target.id.replace('messageType', '')

    const db = wx.cloud.database()
    const reserves = await db.collection('reserves').get()
    if (reserves && reserves.errMsg === 'collection.get:ok') {
      let addRes = null
      let updateRes = null
      if (reserves && reserves.data.length) {
        addRes = await db.collection('reserves').doc(reserves.data[0]._id).update({
          data: {
            visitor: e.detail.value.visitor,
            phone: e.detail.value.phone,
            date: e.detail.value.date,
            building: e.detail.value.building,
            desc: e.detail.value.desc
          }
        })
      } else {
        updateRes = await db.collection('reserves').add({
          data: {
            visitor: e.detail.value.visitor,
            phone: e.detail.value.phone,
            date: e.detail.value.date,
            building: e.detail.value.building,
            desc: e.detail.value.desc
          }
        })
      }

      let messageRes = null

      if (+messageType === 1) {
        messageRes = await wx.cloud.callFunction({
          name: 'send-message',
          data: {
            messageType,
            formId: e.detail.formId,
            page: 'pages/reserve-detail/index',
            data: {
              keyword1: {
                value: e.detail.value.visitor // 来访人
              },
              keyword2: {
                value: e.detail.value.phone // 来访人电话
              },
              keyword3: {
                value: ['腾讯大厦', '滨海大厦', '飞亚达大厦'][e.detail.value.building]// 大楼名称
              },
              keyword4: {
                value: `${e.detail.value.date}`// 到访日期
              },
              keyword5: {
                value: e.detail.value.desc// 来访事由
              }
            }
          }
        })
      } else if (+messageType === 2) {
        messageRes = await wx.cloud.callFunction({
          name: 'send-message',
          data: {
            messageType,
            formId: e.detail.formId,
            page: 'pages/reserve-detail/index',
            data: {
              keyword1: {
                value: e.detail.value.visitor // 来访人
              },
              keyword2: {
                value: e.detail.value.phone // 来访人电话
              },
              keyword3: {
                value: ['腾讯大厦', '滨海大厦', '飞亚达大厦'][e.detail.value.building]// 大楼名称
              },
              keyword4: {
                value: `${e.detail.value.date}`// 到访日期
              },
              keyword5: {
                value: e.detail.value.desc// 来访事由
              }
            }
          }
        })
      } else if (+messageType === 3) {
        messageRes = await wx.cloud.callFunction({
          name: 'send-message',
          data: {
            messageType,
            formId: e.detail.formId,
            url: 'http://weixin.qq.com/download',
            page: 'pages/reserve-detail/index',
            data: {
              first: {
                value: '预约成功'
              },
              keyword1: {
                value: e.detail.value.visitor // 来访人
              },
              keyword2: {
                value: e.detail.value.phone // 来访人电话
              },
              keyword3: {
                value: e.detail.value.desc // 大楼名称
              },
              keyword4: {
                value: `${e.detail.value.date}`// 到访日期
              },
              remark: {
                value: e.detail.value.desc// 来访事由
              }
            }
          }
        })
      }


      wx.hideLoading()
      if (messageRes.result) {
        if (messageRes.result.errcode === 0 || messageRes.result.errcode === 41028) {
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
    } else {
      wx.showToast({
        title: '预约失败，请稍后重试！',
        icon: 'error',
        duration: 2000
      })
    }
  }
})
