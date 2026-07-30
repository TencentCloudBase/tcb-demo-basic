// pages/home/index.js
const app = getApp()
Page({
  data: {
    navHeight: (app.globalData && app.globalData.navHeight) || 64,
    product: {
      tip: '适用于前端开发/全栈开发者的 Serverless 开发方案',
      advantage: [
        {
          coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/542e0af7b0bf260888a5af0e61da1ee9/icon%E4%B8%8E%E5%BE%AE%E4%BF%A1%E7%94%9F%E6%80%81%E6%95%B4%E5%90%88icon@2x.png',
          title: '与微信生态整合',
          description: '提供云函数、云数据库、云存储等能力，并可免鉴权调用微信接口。'
        },
        {
          coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/6bc92c9a36e7d5444d382827c2f05819/icon%E8%BD%BB%E6%9D%BE%E6%9E%84%E5%BB%BA%E5%A4%9A%E7%AB%AF%E6%9C%8D%E5%8A%A1@2x.png',
          title: '轻松构建多端服务',
          description: '一套后端能力同时服务小程序、Web 等多端。'
        },
        {
          coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/62a3d7d24f1a8a8849213ddd30126373/icon%E5%85%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%85%8D%E5%9F%9F%E5%90%8D@2x.png',
          title: '免服务器免域名',
          description: '免服务器免运维，专业处理高并发，降低开发与运维成本。'
        },
        {
          coverImage: 'https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/63e6ea94-fe57-4697-9852-c2656c1677fa.png',
          title: '在线体验',
          description: '即刻体验云开发基础能力、微信开放能力等示例',
          navigateType: 'path',
          url: '/pages/case/index'
        }
      ],
      schematic: {
        description: '简单几行代码即可调用云开发后台能力，如云数据库',
        coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/a9ed318077f19f690d708890ba56c989/%E4%BA%91%E5%BC%80%E5%8F%91.png'
      },
      url: 'https://cloud.weixin.qq.com/cloudbase',
      navigateType: 'web'
    },
    aiPaths: [
      {
        title: '在 IDE 里用 AI 接云开发',
        description: '复制 Prompt 粘给 AI，或装 Plugin 一键接入',
        url: '/pages/ai-toolkit/index'
      }
    ],
    helpList: [{
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/e475a6713eb1ad7510b723e27d3a89d9/%E5%85%AC%E4%BC%97%E5%8F%B7icon@2x.png',
      title: '官方公众号',
      description: '关注云开发最新动态',
      navigateType: 'path',
      url: '/pages/official-account/index'
    }, {
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/914d02b4812c014bc99fb34198003f86/%E4%BA%A4%E6%B5%81%E7%BE%A4icon@2x.png',
      title: '技术交流群',
      description: '技术团队在线答疑',
      navigateType: 'path',
      url: '/pages/technology-group/index'
    }, {
      coverImage: 'https://qcloudimg.tencent-cloud.cn/raw/c5857a7fc24e03a634c9f2606f540b8a/%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3icon@2x.png',
      title: '开发文档',
      description: '云开发能力说明与 API',
      navigateType: 'web',
      url: 'https://docs.cloudbase.net/'
    }],
    winStyle: false
  },

  onLoad() {
    this.setData({ navHeight: app.globalData.navHeight || 64 })
    this.trdPrivacy = this.selectComponent('#trdPrivacy')
  },

  showPrivacyWin() {
    this.setData({ winStyle: false })
    this.trdPrivacy.showPrivacyWin()
  },

  onShareAppMessage() {
    return {
      title: '云开发体验小程序',
      path: '/pages/home/index'
    }
  },

  navigateToHandler(e) {
    const navigateType = e.currentTarget.dataset.navigatetype
    const url = e.currentTarget.dataset.url
    // 体验 Tab 需 switchTab
    if (navigateType === 'path' && url === '/pages/case/index') {
      wx.switchTab({ url })
      return
    }
    app.tcbNavigateTo(e)
  },

  onFeatureTap(e) {
    const url = e.currentTarget.dataset.url
    if (!url) return
    this.navigateToHandler(e)
  },

  goExperience() {
    wx.switchTab({ url: '/pages/case/index' })
  },

  goDev() {
    wx.switchTab({ url: '/pages/toolbox/index' })
  },

  goPath(e) {
    const url = e.currentTarget.dataset.url
    if (url) wx.navigateTo({ url })
  }
})
