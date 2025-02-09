import drawQrcode from '../../utils/qrcode/weapp.qrcode.min.js';
import { commonCompBehavior } from '../../utils/common-behavior';
import classNames from '../../utils/classnames';
Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: '',
    },
    text: {
      type: String,
      value: '',
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false,
    },
    backgroundColor: {
      type: String,
      value: '#ffffff',
    },
    foregroundColor: {
      type: String,
      value: '#000000',
    },
  },
  data: {
    base64Url: '',
  },
  domObserver: null,
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.setData({ id: this.id });
      this.observeModuleExpose();
    },
    detached() {
      this.domObserver && this.domObserver.disconnect();
    },
  },
  methods: {
    // 监听qrcode模块曝光
    observeModuleExpose() {
      this.domObserver && this.domObserver.disconnect();
      this.domObserver = wx.createIntersectionObserver(this);
      this.domObserver.relativeToViewport().observe(`#${this.id}`, (res) => {
        // 模块曝光
        if (res.intersectionRatio) {
          wx.createSelectorQuery()
            .in(this)
            .select('#QrCode')
            .fields({
              node: true,
              size: true,
            })
            .exec(this.drawQrcode());
        }
      });
    },
    updateWidgetAPI() {
      const { text, backgroundColor, foregroundColor, showMenuByLongpress } =
        this.data;

      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          text,
          backgroundColor,
          foregroundColor,
          showMenuByLongpress,
        });
    },
    drawQrcode: function () {
      const { backgroundColor, foregroundColor, text } = this.properties;
      drawQrcode({
        width: 200,
        height: 200,
        canvasId: 'QrCode',
        text: text,
        background: backgroundColor, //二维码背景颜色，默认值白色
        foreground: foregroundColor, //二维码前景色，默认值黑色
        _this: this,
      });
      // 安卓机上不准确，生成的二维码无法扫描，加延时解决
      // eslint-disable-next-line rulesdir/no-timer
      setTimeout(() => {
        var that = this;
        wx.canvasToTempFilePath(
          {
            canvasId: 'QrCode',
            width: 200,
            height: 200,
            success(res) {
              if (res.tempFilePath) {
                wx.getImageInfo({
                  src: res.tempFilePath,
                  success(res) {
                    console.log(res);
                    that.setData({
                      base64Url: res?.path,
                    });
                    that.domObserver && that.domObserver.disconnect();
                  },
                  fail(res) {
                    console.error(res);
                  },
                });
              }
            },
            fail(res) {
              console.error(res);
            },
          },
          this
        );
      }, 500);
    },
  },
  observers: {
    'text,backgroundColor,foregroundColor ,showMenuByLongpress': function () {
      this.updateWidgetAPI();
      this.drawQrcode();
    },
    'className,text': function (className) {
      const classPrefix = 'wd';
      const compClassName = `${classPrefix}-qrcode`;
      // 响应式css api
      const platformCss = `${classPrefix}-mp-qrcode`;
      const classes = {
        [`${classPrefix}-qrcode`]: true,
        // 颜色
        [`${compClassName}--image`]: true,
        [platformCss]: true,
      };

      const cls = classNames({
        ...classes,
        [className]: className,
      });

      this.setData({ cls });
    },
  },
});
