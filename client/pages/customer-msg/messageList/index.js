// pages/messageList/MessageList.js

const regeneratorRuntime = require('../../../libs/runtime-module')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openIdIndex: 0,
    openIdList: [],
    messageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.showMsgList(this.data.openIdIndex)
  },

  showMsgList: async function (openIdIndex) {
    wx.showLoading({
      title: '加载中',
    });
    try{
      let res = (await wx.cloud.callFunction({
        name: 'getMessageList'
      })).result

      let messageList = res.msgList.filter(x => x.openid === res.openIdList[this.data.openIdIndex]).map(x => {
        if(x.opercode === 2003) { 
          x.from = x.openid // 客服接受消息
        }else if(x.opercode === 2002) {
          x.from = x.worker //客服发送消息
        }
        x.messageTime = (new Date(x.time * 1000)).toLocaleString()

        if (x.text.indexOf("https://mp.weixin.qq.com/misc/kfpic") === 0) {
          x.imageUrl = x.text
        }

        return x
      })

      this.setData({
        openIdList: res.openIdList,
        messageList
      })
    }catch(e) {

    }
    wx.hideLoading()
  },

  bindPickerChange: function(e) {
    
    this.setData({'openIdIndex': Number(e.detail.value)},()=>{
      this.showMsgList(this.data.openIdIndex)
    })
  }
})