Component({
  options: {
    virtualHost: true,
  },
  properties: {
    errorObj: {
      type: Object,
      value: {},
    },
    hasRecord: {
      type: Boolean,
      value: false,
    },
    component: {
      type: String,
      value: '',
    },
  },
  data: {
    visible: false,
  },
  methods: {
    // 复制到剪贴板
    copyClipBoard: function () {
      wx.setClipboardData({
        data: this.data.copiedText,
        success() {
          wx.getClipboardData({
            success() {},
          });
        },
      });
    },
    // 显隐弹出层
    showModal: function () {
      const { errorObj } = this.data;
      const copiedText = `错误码: ${errorObj.code || '-'}\r\n错误信息: ${
        errorObj.message || '-'
      }\r\nRequestId: ${errorObj.requestId || '-'}`;
      this.setData({
        visible: true,
        copiedText: copiedText,
      });
    },
    hideModal: function () {
      this.setData({
        visible: false,
      });
    },
  },
});
