// pages/toolbox/index.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    navHeight: app.globalData.navHeight,
    toolbox: [{
      icon: 'https://qcloudimg.tencent-cloud.cn/raw/96fbb2c1d94dfd22b680f80edee29b3d/icon%E4%BA%91%E5%BC%80%E5%8F%91@2x.png',
      title: '云开发',
      description: '通过用户鉴权、数据库、存储、云函数等能力演示小程序云开发能力',
      shading: 'https://qcloudimg.tencent-cloud.cn/raw/8903c3406463c444ebacd31b03e04ab9/%E4%BA%91%E5%BC%80%E5%8F%91png@2x.png',
      navigateType:'path',
      url: '/pages/index/index'
    },{
      icon: 'https://qcloudimg.tencent-cloud.cn/raw/f8afa0b50e877364116bd88334a0a6b9/icon%E4%BA%91%E6%89%98%E7%AE%A1@2x.png',
      title: '云托管',
      description: '通过快速上手系列课程，带大家了解云托管带来的后端服务云原生解决方案',
      shading: 'https://qcloudimg.tencent-cloud.cn/raw/3253a842d265e008be6af85de99ceef5/%E4%BA%91%E6%89%98%E7%AE%A1png@2x.png',
      navigateType:'mini',
      appId: 'wxbd19e398fb9eb96b',
      url: '/pages/course-detail/course-detail?docid=00068c2c0106c0667f5b01d015b80d',
    },{
      icon: 'https://qcloudimg.tencent-cloud.cn/raw/b8a711ca58cb34075e77e3538cc8307c/icon%E4%BD%8E%E7%A0%81@2x.png',
      title: '微搭低代码',
      description: '预览体验由腾讯云微搭低码构建的行业级小程序，覆盖美妆、生活服务等场景',
      shading: 'https://qcloudimg.tencent-cloud.cn/raw/9641359dc805ab4ccdd40583a15005e9/%E4%BD%8E%E4%BB%A3%E7%A0%81png@2x.png',
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