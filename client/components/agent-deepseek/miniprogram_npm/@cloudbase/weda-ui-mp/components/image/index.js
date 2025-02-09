import { getWedaAPI } from '../../utils/getWedaApi';

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    src: {
      type: String,
      value:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iI0VCRUZGNSIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0yMCA1NlYyNGg0MHYzMnoiLz48cGF0aCBmaWxsPSIjQzFDQ0REIiBkPSJNMjYgMzdoMjh2MkgyNnptMCA3aDIwdjJIMjZ6bS02LTIwaDQwdjdIMjB6Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDggNDQpIj48Y2lyY2xlIGZpbGw9IiNGRkYiIGN4PSIxMCIgY3k9IjEwIiByPSI3Ii8+PHBhdGggZD0iTTEwIDJhOCA4IDAgMSAxIDAgMTYgOCA4IDAgMCAxIDAtMTZ6bTEgMTBIOXYyaDJ2LTJ6bTAtNkg5djVoMlY2eiIgZmlsbD0iIzAwNkVGRiIvPjwvZz48L2c+PC9zdmc+',
    },
    alt: {
      type: String,
      value: '[图片]',
    },
    fit: {
      type: String,
      value: 'fill',
    },
    mode: {
      type: String,
      value: 'scaleToFill',
    },
    lazyLoad: {
      type: Boolean,
      value: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false,
    },
    imgPreview: {
      type: Boolean,
      value: false,
    },
    maskClosable: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    load: function (e) {
      this.triggerEvent('load', e.detail);
      this.setData({
        realHeight: e.detail.height,
        realWidth: e.detail.width,
        isError: false,
        clsx: this.data.clsx.replace(/weda-image-error/g, ''),
      });
    },
    error: function (e) {
      this.setData({
        isError: true,
        clsx: this.properties.className + ' weda-image-error',
      });
      this.triggerEvent('error', e.detail);
    },
    onImgTap: function () {
      if (this.properties.imgPreview && !this.data.isError) {
        // 计算图片预览展示高度
        const { windowWidth, windowHeight } = wx.getSystemInfoSync();
        const showHeight =
          windowWidth / (this.data.realWidth / this.data.realHeight);
        const offsetHeight = windowHeight / 2 - showHeight / 2;
        this.setData({
          showImg: true,
          zoom: 1,
          previewTranslateY: 0,
          previewTranslateX: 0,
          showHeight,
          offsetHeight,
        });
      }
    },
    onPinch: function (ev) {
      let zoom = ev.detail.zoom;
      // zoom = this.data.zoom * zoom;
      if (zoom > 5) {
        zoom = 5;
      }
      if (zoom < 0.6) {
        zoom = 0.6;
      }
      this.setData({
        zoom,
      });
    },
    onPressMove: function (ev) {
      this.setData({
        previewTranslateX: this.data.previewTranslateX + ev.detail.deltaX,
        previewTranslateY: this.data.previewTranslateY + ev.detail.deltaY,
      });
    },
    onMaskClick: function () {
      if (this.properties.maskClosable) {
        this.setData({
          showImg: false,
        });
      }
    },
    onTapImgPreview: function () {
      if (this.properties.maskClosable) {
        this.setData({
          showImg: false,
        });
      }
    },
    onCloseClick: function () {
      this.setData({
        showImg: false,
      });
    },
  },
  data: {
    showImg: false,
    realSrc: '',
    imgMode: 'scaleToFill',
    clsx: '',
    isError: false,
    zoom: 1,
    previewTranslateX: 0,
    previewTranslateY: 0,
    realHeight: 0,
    realWidth: 0,
  },
  observers: {
    className: function () {
      const className = this.properties.className;
      this.setData({
        clsx: className,
      });
    },
    src: function () {
      const { src = '' } = this.properties;
      let { app } = getWedaAPI();
      if (/^cloud:\/\//.test(src)) {
        app.cloud
          .getTempFileURL(src)
          .then((res) => {
            this.setData({ realSrc: res || '' });
          })
          .catch(() => {
            this.setData({
              realSrc: src,
            });
          });
      } else {
        this.setData({
          realSrc: src,
        });
      }
    },
    'fit, mode': function (fit, mode) {
      if (fit) {
        switch (fit) {
          case 'cover':
            this.setData({
              imgMode: 'aspectFill',
            });
            break;
          case 'contain':
            this.setData({
              imgMode: 'aspectFit',
            });
            break;
          case 'fill':
            this.setData({
              imgMode: 'scaleToFill',
            });
            break;
          case 'widthFix':
            this.setData({
              imgMode: 'widthFix',
            });
            break;
          case 'heightFix':
            this.setData({
              imgMode: 'heightFix',
            });
            break;
          default:
            this.setData({
              imgMode: 'scaleToFill',
            });
            break;
        }
      } else {
        this.setData({
          imgMode: mode,
        });
      }
    },
  },
});
