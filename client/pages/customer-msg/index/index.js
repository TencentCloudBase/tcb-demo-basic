//index.js
const regeneratorRuntime = require("../../../libs/runtime-module");

const app = getApp();

Page({
  data: {},

  onLoad: async function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: "../chooseLib/index"
      });
      return;
    }
  }
});
