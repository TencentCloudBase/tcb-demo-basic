// pages/jumpto-webpage/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    url: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (!options || !options.url) {
      return;
    }
    let decodeUrl = decodeURIComponent(options.url);
    this.setData({
      url: decodeUrl,
    });
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

  }
})