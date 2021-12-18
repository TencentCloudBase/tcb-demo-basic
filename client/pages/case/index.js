// pages/case/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    productCaseSet: [{
      id: 'cloudbase',
      title: '云开发',
      active: true,
      cases: [{
        logo: 'https://via.placeholder.com/351x150.png',
        title: '从0到3000万，TA们用云开发这样做丨一番赏Online案例',
        description: '腾讯light将在全国妇联宣传部、厦门市人民政府的指导下，联合中国儿童中心，在厦门举办“创变者”'
      },{
        logo: 'https://via.placeholder.com/351x150.png',
        title: '亿点点调用 = 一点点费用丨微信红包封面案例',
        description: '腾讯light将在全国妇联宣传部、厦门市人民政府的指导下，联合中国儿童中心，在厦门举办“创变者”'
      }]
    },{
      id: 'cloudbaserun',
      title: '云托管',
      active: false,
      cases: [{
        logo: 'https://via.placeholder.com/351x150.png',
        title: '从0到3000万，TA们用云开发这样做丨一番赏Online案例',
        description: '腾讯light将在全国妇联宣传部、厦门市人民政府的指导下，联合中国儿童中心，在厦门举办“创变者”'
      },{
        logo: 'https://via.placeholder.com/351x150.png',
        title: '亿点点调用 = 一点点费用丨微信红包封面案例',
        description: '腾讯light将在全国妇联宣传部、厦门市人民政府的指导下，联合中国儿童中心，在厦门举办“创变者”'
      }]
    },{
      id: 'weda',
      title: '微搭低代码',
      active: false,
      cases: [{
        logo: 'https://via.placeholder.com/351x150.png',
        title: '从0到3000万，TA们用云开发这样做丨一番赏Online案例',
        description: '腾讯light将在全国妇联宣传部、厦门市人民政府的指导下，联合中国儿童中心，在厦门举办“创变者”'
      },{
        logo: 'https://via.placeholder.com/351x150.png',
        title: '亿点点调用 = 一点点费用丨微信红包封面案例',
        description: '腾讯light将在全国妇联宣传部、厦门市人民政府的指导下，联合中国儿童中心，在厦门举办“创变者”'
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
})