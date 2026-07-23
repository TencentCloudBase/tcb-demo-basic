// pages/case/index.js — Tab「体验」：能力演示
const app = getApp()
Page({
  data: {
    capabilities: [
      { id: 'user', name: '用户管理', description: '登录态与用户信息' },
      { id: 'wxaqrcode', name: '小程序码', description: '生成带参数的小程序码' },
      { id: 'reserve', name: '模板消息', description: '预约与消息触达示例' },
      { id: 'customer-msg', name: '客服消息', description: '客服会话与消息列表', url: '/pages/customer-msg/index/index' },
      { id: 'pay-list', name: '微信支付', description: '下单与支付结果演示' }
    ]
  },

  onShareAppMessage() {
    return {
      title: '小程序·云开发体验',
      path: '/pages/case/index'
    }
  },

  jumpCapability(e) {
    const { id, url } = e.currentTarget.dataset
    wx.navigateTo({
      url: url || `/pages/${id}/index`
    })
  },

  openDocs() {
    wx.navigateTo({
      url: `/pages/jumpto-webpage/index?url=${encodeURIComponent('https://docs.cloudbase.net/quick-start/mini-program/introduce')}`
    })
  }
})
