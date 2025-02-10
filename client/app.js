require.async('./components/agent-deepseek/index.js')
//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }

    this.globalData = {
      userInfo: {
        // avatarUrl: '../../images/user-unlogin.png'
      }
    }
    // 获取自定义导航高度
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
