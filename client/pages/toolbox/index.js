// pages/toolbox/index.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    navHeight: app.globalData.navHeight,
    toolbox: [{
      icon: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/toolbox/icon云开发@2x.png',
      title: '云开发',
      description: '通过用户鉴权、数据库、存储、云函数等能力演示小程序云开发能力',
      shading: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/toolbox/云开发png@2x.png',
      navigateType:'path',
      url: '/pages/index/index'
    },{
      icon: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/toolbox/icon云托管@2x.png',
      title: '云托管',
      description: '通过快速上手系列课程，带大家了解云托管带来的后端服务云原生解决方案',
      shading: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/toolbox/云托管png@2x.png',
      navigateType:'mini',
      appId: 'wxbd19e398fb9eb96b',
    },{
      icon: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/toolbox/icon低码@2x.png',
      title: '微搭低代码',
      description: '预览体验由腾讯云微搭低码构建的行业级小程序，覆盖美妆、生活服务等场景',
      shading: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/toolbox/低代码png@2x.png',
      navigateType:'path',
      url: '/pages/weda-appmarket/index'
    }]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  navigateToTool(e) {
    app.tcbNavigateTo(e);
  }
})