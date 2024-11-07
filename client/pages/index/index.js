// index.js
const app = getApp();

Page({
  data: {
    list: [
      {
        id: "ai-bot",
        name: "小程序 AI+ 能力",
        isNew: true,
        url: "/pages/ai/index"
      },
      {
        id: "user",
        name: "用户管理"
      },
      {
        id: "wxaqrcode",
        name: "小程序码"
      },
      {
        id: "reserve",
        name: "模板消息"
      },
      {
        id: "customer-msg",
        name: "客服消息",
        url: "/pages/customer-msg/index/index"
      },
      {
        id: "pay-list",
        name: "微信支付"
      },
    ]
  },

  // 分享
  onShareAppMessage() {
    return {
      title: "小程序·云开发体验",
      path: "/pages/index/index"
    };
  },

  jumpUrl(e) {
    const id = e.currentTarget.id;
    const list = this.data.list;

    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].type && list[i].type === "miniprogram") {
          wx.navigateToMiniProgram({
            appId: list[i].appid,
            path: "pages/index/index",
            extraData: {},
            // envVersion: 'develop',
            success(res) {
              // 打开成功
            }
          });
        } else {
          wx.navigateTo({
            url: list[i].url
              ? list[i].url
              : `/pages/${list[i].id}/index`
          });
        }
        return;
      }
    }
  }
});
