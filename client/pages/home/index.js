// pages/home/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    navHeight: app.globalData.navHeight,
    banner: {
      title: '首页',
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/d9aec27afa50fa63ce579f49d786c3d3/Mask%20Group@2x.png',
      backImg: "https://qcloudimg.tencent-cloud.cn/raw/d9aec27afa50fa63ce579f49d786c3d3/Mask%20Group@2x.png",
      backImgMode: "widthFix",
    },
    productFamilySet: [{
      id: 'cloudbase',
      title: '云开发',
      tip: '适用于前端开发/全栈开发者的 Serverless 开发方案',
      active: true,
      advantage: [{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/542e0af7b0bf260888a5af0e61da1ee9/icon%E4%B8%8E%E5%BE%AE%E4%BF%A1%E7%94%9F%E6%80%81%E6%95%B4%E5%90%88icon@2x.png',
        title: '与微信生态整合',
        description: '提供云函数、云数据库、云存储等能力，并可免鉴权调用微信接口。'
      },{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/6bc92c9a36e7d5444d382827c2f05819/icon%E8%BD%BB%E6%9D%BE%E6%9E%84%E5%BB%BA%E5%A4%9A%E7%AB%AF%E6%9C%8D%E5%8A%A1@2x.png',
        title: '轻松构建多端服务',
        description: '提供云函数、云数据库、云存储等能力，并可免鉴权调用微信接口。'
      },{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/62a3d7d24f1a8a8849213ddd30126373/icon%E5%85%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%85%8D%E5%9F%9F%E5%90%8D@2x.png',
        title: '免服务器免域名',
        description: '免服务器免运维，专业处理高并发，解决开发人力配备不足、运维成本高等问题。'
      },{
        coverImage: 'https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/63e6ea94-fe57-4697-9852-c2656c1677fa.png',
        title: '在线体验',
        description: '即刻体验云开发基础能力、AI、微信开放能力等示例',
        navigateType:'path',
        url: '/pages/index/index'
      }],
      schematic:{
        description: '简单几行代码即可调用云开发后台能力，如云数据库',
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/a9ed318077f19f690d708890ba56c989/%E4%BA%91%E5%BC%80%E5%8F%91.png'
      },
      url: 'https://cloud.weixin.qq.com/cloudbase',
      navigateType: 'web'
    },{
      id: 'cloudbaserun',
      title: '云托管',
      tip: '代替服务器，1分钟部署小程序/公众号后端服务',
      active: false,
      advantage: [{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/7ddc9dfbbf460e5ba67bcc11e3dac527/icon%E4%BB%BB%E6%84%8F%E8%AF%AD%E8%A8%80-%E6%A1%86%E6%9E%B6@2x.png',
        title: '任意语言/框架',
        description: '可以使用任意语言和框架进行开发，可实现业务平滑迁移上云'
      },{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/9607912eab0ae3494fab80e42b6e604c/icon%E5%B9%B3%E6%BB%91%E8%BF%81%E7%A7%BB@2x.png',
        title: '平滑迁移',
        description: '无需改造/重构现有业务，可平滑迁移并享受微信天然鉴权、高可用、弹性扩缩容等优势'
      },{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/23a7d96f8f2b188ea7bdf86078af8141/icon%E4%BD%BF%E7%94%A8%E7%AE%80%E6%98%93@2x.png',
        title: '使用简易',
        description: '无需理解容器复杂概念，免域名配置，小程序 / Web端使用 SDK 一行代码即可调用'
      }],
      schematic:{
        description: '适配各类后端语言/框架，一键部署，极速上线',
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/9acf743522227e0329995b30c1fe2c7c/%E4%BA%91%E6%89%98%E7%AE%A1.png'
      },
      url: 'https://cloud.weixin.qq.com/cloudrun',
      navigateType: 'web',
    },{
      id: 'weda',
      title: '微搭低代码',
      tip: '云原生能力支撑的可视化拖拽式低代码开发平台',
      active: false,
      advantage: [{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/962314db3af765b42dd379190dc01777/icon%E4%BD%8E%E4%BB%A3%E7%A0%81%E6%A0%B8%E5%BF%83%E8%83%BD%E5%8A%9B@2x.png',
        title: '低代码核心能力',
        description: '可视化拖拉拽、流程引擎、数据模型等能力，专为企业级应用而设计的低代码解决方案'
      },{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/840b2b64b2e034ca625b49f94603d0a8/icon%E6%9C%8D%E5%8A%A1%E5%95%86%E6%89%B9%E9%87%8F%E4%BB%A3%E5%BC%80%E5%8F%91@2x.png',
        title: '服务商批量代开发',
        description: '统一管理多个客户小程序环境，实现应用组件快速复用和定制开发'
      },{
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/0170ed4b672c4c2ffe6db4a29c0ee276/icon%E8%85%BE%E8%AE%AF%E7%B3%BBSaaS%E4%BA%A7%E5%93%81%E7%94%9F%E6%80%81@2x.png',
        title: '腾讯系 SaaS 产品生态',
        description: '可与腾讯系产品如企业微信、腾讯会议、腾讯文档、微信支付、腾讯广告等产品数据打通'
      }],
      schematic:{
        description: '使用可视化编辑器，在拖拉拽组件即可生成应用',
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/52170d5e5bdba4ff1a8adb8813e8ef7e/%E5%BE%AE%E6%90%AD.png'
      },
      url: 'https://cloud.tencent.com/product/weda',
      navigateType: 'web',
    }],
    helpList: [{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/e475a6713eb1ad7510b723e27d3a89d9/%E5%85%AC%E4%BC%97%E5%8F%B7icon@2x.png',
      title: '官方公众号',
      description: '关注微信生态内最前沿的技术',
      navigateType: 'path',
      url: '/pages/official-account/index'
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/914d02b4812c014bc99fb34198003f86/%E4%BA%A4%E6%B5%81%E7%BE%A4icon@2x.png',
      title: '技术交流群',
      description: '技术团队在线答疑',
      navigateType: 'path',
      url: '/pages/technology-group/index'
    },{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/c5857a7fc24e03a634c9f2606f540b8a/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3icon@2x.png',
      title: '开发文档',
      description: '微信云服务小程序',
      navigateType:'mini',
      appId: 'wxfe70b3f986aad2fb',
      url: ''
    }],
    winStyle: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.trdPrivacy = this.selectComponent("#trdPrivacy");
  },

  showPrivacyWin() {
    this.setData({
      winStyle: false,
    })
    this.trdPrivacy.showPrivacyWin();
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
  switchTab(e) {
    const currentTab = e.currentTarget.dataset.id;
    const updatedProductFamilySet = this.data.productFamilySet.map((productFamily) => {
      productFamily.id === currentTab ? productFamily.active = true : productFamily.active = false;
      return productFamily
    });
    this.setData({
      productFamilySet: updatedProductFamilySet
    })
  },
  navigateToHandler(e) {
    app.tcbNavigateTo(e);
  },
  navigateToAI (e) {
    wx.navigateTo({
      url: '/pages/ai/index'
    });
  }
})