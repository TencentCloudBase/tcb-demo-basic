// pages/case/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    navHeight: app.globalData.navHeight,
    productCaseSet: [{
      id: 'cloudbase',
      title: '云开发',
      active: true,
      cases: [{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/cloudbase1.png',
        title: '从0到3000万，TA们用云开发这样做丨一番赏Online案例',
        description: '作为一个不到 10 人的初创团队，在半年时间里创造了 3000 多万的销售业绩，这样的飞速发展离不开云开发的助力。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/1floqHGaCcscsfjOxZ-PSw',
      },{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/cloudbase2.png',
        title: '亿点点调用 = 一点点费用丨微信红包封面案例',
        description: '承载如此巨大的流量洪峰，用云开发，在没有任何特殊计价的情况下，仅仅花费几千元就搞定了！',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/wCe-cpKpf5EM4IQ1sWUK8Q',
      },{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/cloudbase3.png',
        title: '开发者不骗开发者，你跟我说这只要100块？',
        description: '2021腾讯游戏年度发布会开发了专属小程序，包含直播、抽奖、观看回放等功能，其中所有的弹幕功能均基于云开发的实时数据推送实现。支撑整个项目弹幕系统运行的总费用仅为100元左右。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/o483QBt3lW-LQT3b7UwxcQ',
      },{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/cloudbase4.png',
        title: '企业案例丨腾讯教育官网 X 云开发CloudBase',
        description: '腾讯教育基于云开发 CloudBase 快速开发上线腾讯教育官网和 MEET 峰会官网，并采用了 CloudBase CMS 内容管理系统，节省大量研发成本。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/W1jeSzbYVxwI18SXht3G1Q',
      }]
    },{
      id: 'cloudbaserun',
      title: '云托管',
      active: false,
      cases: [{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/cloudbaserun1.png',
        title: '小城里的明星产业，有微信云托管保驾护航',
        description: '信阳长远科技是一个小规模创业团队，在研发人力不足，掌握的技术栈也非常有限的情况下，如何使用云托管快速破局。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/ihLMo4gZbO88_1hisY23UQ',
      },{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/cloudbaserun2.png',
        title: '0到1000万，微信云托管助力冻品行业初创企业快速成长',
        description: '冻品行业初创企业借助微信云托管实现了半年内销售额从0到1000万的快速增长，月成交小店已达6000家，汇集300+服务商，年订货交易额已突破2亿，成为了冻品运输这一传统行业的新兴力量。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/9EA0GLku7U00LV0SJ9ZwhA',
      },{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/cloudbaserun3.png',
        title: '我，剧本杀SaaS开发者，年入700万',
        description: '他们为剧本杀店家和玩家开发小程序，做“剧本杀SaaS”，每个月仅花费几百元的云开发费用，便可开发和维护数千个微信小程序。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/Kyn-3474sieIVwE6r0m65g',
      }]
    },{
      id: 'weda',
      title: '微搭低代码',
      active: false,
      cases: [{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/weda3.png',
        title: '把最好的幼儿园带到县城，她用7天上线一个小程序',
        description: '甘肃偏远县城幼儿园借助微搭低代码平台，仅用7天时间，“七色果幼儿园”小程序正式上线。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/qb1u3JDtZjpow6gCbi5gow',
      },{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/weda4.png',
        title: '一码行川！微搭低代码平台助力“四川天府健康通”快速上线',
        description: '四川天府健康通的打造，创新性地使用了低码开发技术，整个过程只耗费十余天，适时满足了疫情防控的迫切需要。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/b-C2Edi9bksu8MAAVKxpVw',
      },{
        coverImage: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/tcb-miniprogram/case/weda5.png',
        title: '腾讯云微搭低代码，用技术助力“一网统管”轻应用快速落地',
        description: '腾讯云微搭一站式低代码平台、政务微信等平台能力，打造统一的服务门户，快速响应“一网统管”移动端应用开发需求，像搭积木一样快速实现应用落地。',
        navigateType: 'web',
        url: 'https://mp.weixin.qq.com/s/zgY_e3XdOD0eHkuh-c3L8A',
      }]
    }],
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
    const updatedProductCaseSet = this.data.productCaseSet.map((productCase) => {
      productCase.id === currentTab ? productCase.active = true : productCase.active = false;
      return productCase
    });
    this.setData({
      productCaseSet: updatedProductCaseSet
    })
  },
  navigateToCase(e) {
    app.tcbNavigateTo(e);
  }
})