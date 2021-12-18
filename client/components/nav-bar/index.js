Component({
  /**
   * 组件的属性列表
   */
  properties: {
    background: {
      type: String,
      value: "tra",
    },
    color: {
      type: String,
      value: "#000",
    },
    titleText: {
      type: String,
      value: "导航栏",
    },
    titleTextLeft: {
      type: Boolean,
      value: false,
    },
    titleImg: {
      type: String,
      value: "",
    },
    backIcon: {
      type: String,
      value: "",
    },
    homeIcon: {
      type: String,
      value: "",
    },
    fontSize: {
      type: Number,
      value: 20,
    },
    iconHeight: {
      type: Number,
      value: 19,
    },
    iconWidth: {
      type: Number,
      value: 58,
    },
    backImg: {
      type: String,
      value: "",
    },
  },
  attached: function () {
    let that = this;
    that.setNavSize();
    that.setStyle();
  },
  data: {},
  methods: {
    // 通过获取系统信息计算导航栏高度
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
      that.setData({
        status: statusHeight,
        navHeight: navHeight,
      });
    },
    setStyle: function () {
      let that = this;
      let containerStyle;
      let textStyle;
      let iconStyle;
      containerStyle = ["background:" + that.data.background].join(";");
      textStyle = [
        "color:" + that.data.color,
        "font-size:" + that.data.fontSize + "px",
      ].join(";");
      iconStyle = [
        "width: " + that.data.iconWidth + "px",
        "height: " + that.data.iconHeight + "px",
      ].join(";");
      that.setData({
        containerStyle: containerStyle,
        textStyle: textStyle,
        iconStyle: iconStyle,
      });
    },
    // 返回事件
    back: function () {
      wx.navigateBack({
        delta: 1,
      });
    },
    home: function () {
      wx.switchTab({
        url: "/pages/home/index",
      });
      this.triggerEvent("home", {});
    },
  },
});
