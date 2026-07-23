//app.js
App({
  // 必须在 App 顶层声明，页面 data 初始化可能早于 onLaunch
  globalData: {
    userInfo: {},
    navHeight: 64
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      console.log('=====wx.cloud.init')
      wx.cloud.init({
        env: "tcb-advanced-a656fc",
        traceUser: true
      })
    }
    this.setNavSize();
  },
  setNavSize: function () {
    let that = this;
    let sysinfo = wx.getSystemInfoSync();
    let statusHeight = sysinfo.statusBarHeight;
    let isiOS = sysinfo.system.indexOf("iOS") > -1;
    let navHeight;
    if (!isiOS) {
      navHeight = 48;
    } else {
      navHeight = 44;
    }
    that.globalData.navHeight = statusHeight + navHeight;
  },
  tcbNavigateTo(e) {
    console.log(e)
    const url = e.currentTarget.dataset.url;
    const navigateType = e.currentTarget.dataset.navigatetype;
    const appId = e.currentTarget.dataset.appid;
    const navigateHandler = {
      path: () =>  wx.navigateTo({
        url
      }),
      mini: () => wx.navigateToMiniProgram({
        appId,
        path: url || ''
      }),
      web: () =>  wx.navigateTo({
        url: `/pages/jumpto-webpage/index?url=${encodeURIComponent(url)}`
      }),
    };
    navigateHandler[navigateType]();
  }
})
