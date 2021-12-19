// pages/weda-appmarket/index.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    navHeight: app.globalData.navHeight,
    navBar: {
      backImg: "https://qcloudimg.tencent-cloud.cn/raw/834deb68277aa6751ce04aa5fe339546/weda-banner@2x.png",
      backImgMode: "widthFix",
      backIcon: "https://qcloudimg.tencent-cloud.cn/raw/e3e23296aceb507927325ba4c1dbbcfb/Icon-24-Back%20Nav-2@2x.png"
    },
    banner: {
      src: 'https://qcloudimg.tencent-cloud.cn/raw/834deb68277aa6751ce04aa5fe339546/weda-banner@2x.png',
      title: '微搭应用市场',
      description: '首家低码应用市场，覆盖多行业跨场景低码应用模版'
    },
    applicationMarket: [{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/b031ef868dc27cc889be4d1d602d04cc/app1.jpeg',
      title: 'IT企业小程序',
      description: '快速打造企业门户站点',
      navigateType: 'mini',
      appId: 'wxf98ca2a281eadf7f',
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/35fe5cc78f0160c404dc32c198d910f1/app2.jpeg',
      title: '美容美发小程序',
      description: '官方组件构建图片展示模版',
      navigateType: 'mini',
      appId: 'wx13b053fee1472870',
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/286c0f1c8766bba005a5d7c11229911b/app3.jpeg',
      title: '律政服务小程序',
      description: '简洁大气的生活服务小程序',
      navigateType: 'mini',
      appId: 'wxcc8c123c96802641',
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/2163818bc3da62cba07b0750ff366cdb/app4.jpeg',
      title: '钢琴培训小程序',
      description: '支持订单管理等电商能力',
      navigateType: 'mini',
      appId: 'wx1dca581426148b44',
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/1479029a6cb9fcceec585426f2f6211e/app5.jpeg',
      title: '品牌服装小程序',
      description: '支持搭建电商零售小程序',
      navigateType: 'mini',
      appId: 'wx14eefd4ca40f45ca',
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/8b77ef7fbcb50dab7f6de9b0a081122c/app6.jpeg',
      title: '宠物电商小程序',
      description: '快速接入在线支付等能力',
      navigateType: 'mini',
      appId: 'wx5ccc600b9926a771',
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/3e58abd130796fdce38c6704e3973066/app7.jpeg',
      title: '分销商城小程序',
      description: '支持分销裂变等电商营销能力',
      navigateType: 'mini',
      appId: 'wx834abe7719e4a8ae',
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/83b2122d9c21a421f454c35f1b96ea43/app8.jpeg',
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