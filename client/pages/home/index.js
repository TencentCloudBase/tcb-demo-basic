// pages/home/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    banner: {
      logo: '../../images/home/banner@2x.png'
    },
    recommandList: [{
      logo: '../../images/home/icon电商小程序@2x.png',
      title: '电商小程序',
    }, {
      logo: '../../images/home/icon品牌展示站@2x.png',
      title: '品牌展示站',
    },{
      logo: '../../images/home/icon促销活动页@2x.png',
      title: '促销活动页',
    },{
      logo: '../../images/home/编组 21@2x.png',
      title: '企业管理系统',
    }],
    productFamilySet: [{
      id: 'cloudbase',
      title: '云开发',
      tip: '适用于前端开发/全栈开发者的 Serverless 开发方案',
      active: true,
      advantage: [{
        logo: '../../images/home/icon与微信生态整合icon@2x.png',
        title: '与微信生态整合',
        description: '提供云函数、云数据库、云存储等能力，并可免鉴权调用微信接口。'
      },{
        logo: '../../images/home/icon轻松构建多端服务@2x.png',
        title: '轻松构建多端服务',
        description: '提供云函数、云数据库、云存储等能力，并可免鉴权调用微信接口。'
      },{
        logo: '../../images/home/icon免服务器免域名@2x.png',
        title: '免服务器免域名',
        description: '免服务器免运维，专业处理高并发，解决开发人力配备不足、运维成本高等问题。'
      }],
      url: 'https://cloud.weixin.qq.com/cloudbase'
    },{
      id: 'cloudbaserun',
      title: '云托管',
      tip: '代替服务器，1分钟部署小程序/公众号后端服务',
      active: false,
      advantage: [{
        logo: '../../images/home/icon任意语言-框架@2x.png',
        title: '任意语言/框架',
        description: '可以使用任意语言和框架进行开发，可实现业务平滑迁移上云'
      },{
        logo: '../../images/home/icon平滑迁移@2x.png',
        title: '平滑迁移',
        description: '无需改造/重构现有业务，可平滑迁移并享受微信天然鉴权、高可用、弹性扩缩容等优势'
      },{
        logo: '../../images/home/icon使用简易@2x.png',
        title: '使用简易',
        description: '无需理解容器复杂概念，免域名配置，小程序 / Web端使用 SDK 一行代码即可调用'
      }],
      url: 'https://cloud.weixin.qq.com/cloudrun'
    },{
      id: 'weda',
      title: '微搭低代码',
      tip: '云原生能力支撑的可视化拖拽式低代码开发平台',
      active: false,
      advantage: [{
        logo: '../../images/home/icon低代码核心能力@2x.png',
        title: '低代码核心能力',
        description: '可视化拖拉拽、流程引擎、数据模型等能力，专为企业级应用而设计的低代码解决方案'
      },{
        logo: '../../images/home/icon服务商批量代开发@2x.png',
        title: '服务商批量代开发',
        description: '统一管理多个客户小程序环境，实现应用组件快速复用和定制开发'
      },{
        logo: '../../images/home/icon腾讯系SaaS产品生态@2x.png',
        title: '腾讯系 SaaS 产品生态',
        description: '可与腾讯系产品如企业微信、腾讯会议、腾讯文档、微信支付、腾讯广告等产品数据打通'
      }],
      url: 'https://cloud.tencent.com/product/weda'
    }],
    helpList: [{
      logo: '../../images/home/公众号icon@2x.png',
      title: '官方公众号',
      description: '关注微信生态内最前沿的技术',
      navigateType: 'path',
      url: '/pages/official-account/index'
    },{
      logo: '../../images/home/交流群icon@2x.png',
      title: '技术交流群',
      description: '技术团队在线答疑',
      navigateType: 'path',
      url: '/pages/technology-group/index'
    },{
      logo: '../../images/home/开发文档icon@2x.png',
      title: '开发文档',
      description: '技术团队在线答疑',
      navigateType:'mini',
      appId: 'wxfe70b3f986aad2fb',
      url: ''
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
  navigateToMore(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/jumpto-webpage/index?url=${encodeURIComponent(url)}`,
    })
  },
  navigateToHelp(e) {
    const url = e.currentTarget.dataset.url;
    const navigateType = e.currentTarget.dataset.navigatetype;
    const appId = e.currentTarget.dataset.appid;
    if(navigateType === 'mini') {
      wx.navigateToMiniProgram({
        appId
      })
    } else {
      wx.navigateTo({
        url
      })
    }
    
  }
})