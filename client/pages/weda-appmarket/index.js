// pages/weda-appmarket/index.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    navHeight: app.globalData.navHeight,
    navBar: {
      backImg: "https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/banner@2x.png",
      backImgMode: "widthFix",
      backIcon: "https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/Icon-24-Back Nav-2@2x.png"
    },
    banner: {
      src: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/banner@2x.png',
      title: '微搭应用市场',
      description: '首家低码应用市场，覆盖多行业跨场景低码应用模版'
    },
    applicationMarket: [{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app1.jpeg',
      title: 'IT企业小程序',
      description: '快速打造企业门户站点',
      navigateType: 'mini',
      appId: 'wxf98ca2a281eadf7f',
    },{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app2.jpeg',
      title: '美容美发小程序',
      description: '官方组件构建图片展示模版',
      navigateType: 'mini',
      appId: 'wx13b053fee1472870',
    },{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app3.jpeg',
      title: '律政服务小程序',
      description: '简洁大气的生活服务小程序',
      navigateType: 'mini',
      appId: 'wxcc8c123c96802641',
    },{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app4.jpeg',
      title: '钢琴培训小程序',
      description: '支持订单管理等电商能力',
      navigateType: 'mini',
      appId: 'wx1dca581426148b44',
    },{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app5.jpeg',
      title: '品牌服装小程序',
      description: '支持搭建电商零售小程序',
      navigateType: 'mini',
      appId: 'wx14eefd4ca40f45ca',
    },{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app6.jpeg',
      title: '宠物电商小程序',
      description: '快速接入在线支付等能力',
      navigateType: 'mini',
      appId: 'wx5ccc600b9926a771',
    },{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app7.jpeg',
      title: '分销商城小程序',
      description: '支持分销裂变等电商营销能力',
      navigateType: 'mini',
      appId: 'wx834abe7719e4a8ae',
    },{
      coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/weda-appmarket/app8.jpeg',
      title: '员工评选小程序',
      description: '使用数据源打通员工架构',
      navigateType: 'mini',
      appId: 'wx7aebb0c300a29968',
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
  navigateToApplication(e) {
    app.tcbNavigateTo(e);
  }
})