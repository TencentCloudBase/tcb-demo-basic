// index.js
const app = getApp()

Page({
  data: {
    list: [
      {
        id: 'user',
        name: '用户管理',
      },
      {
        id: 'wxaqrcode',
        name: '小程序码',
      },
      {
        id: 'reserve',
        name: '模板消息',
      },
      {
        id: 'pay-list',
        name: '微信支付',
      }
    ]
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '小程序·云开发体验',
      path: '/pages/index/index',
    }
  },

  jumpUrl(e) {
    const id = e.currentTarget.id
    const list = this.data.list

    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        console.log(list[i].id, id)
        wx.navigateTo({
          url: `/pages/${list[i].id}/index`
        })
        return
      }
    }
  }
})
