import { getWedaAPI } from '../../utils/getWedaApi';
import { commonCompBehavior } from '../../utils/common-behavior';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior],
  properties: {
    id: {
      type: String,
      value: '',
    },
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
      value: '',
    },
    alt: {
      type: String,
      value: '',
    },
    fit: {
      type: String,
      value: '',
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
      value: true,
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
    offsetHeight: 0,
    offsetWidth: 0,
    showHeight: 0,
    showWidth: 0,
    propagation: false,
  },
  methods: {
    load: function (e) {
      this.triggerEvent('load', e.detail);
      this.setData({
        realHeight: e.detail.height,
        realWidth: e.detail.width,
        isError: false,
        clsx: this.data.clsx.replace(/wd-image__error/g, ''),
      });
    },
    error: function (e) {
      this.setData({
        isError: true,
        clsx: this.properties.className + ' wd-image__error',
      });
      this.triggerEvent('error', e.detail);
    },
    onImgTap: function () {
      const ASPECT_RASIO = 1;
      const OFFSET_RASIO = 0.5;
      const SCALE_RASIO_H5 = 1;
      if (this.properties.imgPreview && !this.data.isError) {
        // 计算图片预览展示高度
        const { windowWidth, windowHeight } = wx.getSystemInfoSync();

        const widthRasio = (windowWidth * SCALE_RASIO_H5) / this.data.realWidth;
        const heightRasio =
          (windowHeight * SCALE_RASIO_H5) / this.data.realHeight;
        const scale =
          Math.min(widthRasio, heightRasio, ASPECT_RASIO) || ASPECT_RASIO;
        const offsetHeight =
          (windowHeight - this.data.realHeight * scale) * OFFSET_RASIO;

        const offsetWidth =
          (windowWidth - this.data.realWidth * scale) * OFFSET_RASIO;
        const showHeight = this.data.realHeight * scale;
        const showWidth = this.data.realWidth * scale;
        this.setData({
          showImg: true,
          zoom: 1,
          previewTranslateY: 0,
          previewTranslateX: 0,
          showHeight,
          showWidth,
          offsetHeight,
          offsetWidth,
        });
      }
    },
    onPinch: function (ev) {
      const ZOOM_MAX = 5;
      const ZOOM_MIN = 0.6;
      let zoom = ev.detail.zoom;
      if (zoom > ZOOM_MAX) {
        zoom = ZOOM_MAX;
      }
      if (zoom < ZOOM_MIN) {
        zoom = ZOOM_MIN;
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
    onCloseClick: function () {
      this.setData({
        showImg: false,
      });
    },
    onTapImgPreview: function () {
      this.onMaskClick();
    },
    updateWidgetAPI() {
      const { fit, src, alt } = this.data;

      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          fit,
          src,
          alt,
        });
    },
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
    'fit,src,alt': function () {
      this.updateWidgetAPI();
    },
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
  },
});
