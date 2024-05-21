import classNames from '../../../utils/classnames';
import { getTempFileURL } from '../../../utils/tcb';

Component({
  options: {
    virtualHost: true,
    multipleSlots: true,
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
    id: {
      type: String,
      value: '',
    },
    text: {
      type: String,
      value: '按钮标题',
    },
    size: {
      type: String,
      value: 'default',
    },
    type: {
      type: String,
      value: 'wechat',
    },
    loading: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    formType: {
      type: String,
    },
    openType: {
      type: String,
      value: 'share',
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    path: {
      type: String,
    },
    packageName: {
      type: String,
    },
    withParams: {
      type: Boolean,
      value: false,
    },
    params: {
      type: Array,
      value: [],
    },
  },
  data: {
    cls: '',
    shareInfo: {},
  },
  methods: {
    init() {
      const { className, size, type, disabled } = this.data;
      const cls = classNames('weda-ui', {
        'weda-button': true,
        'weui-btn': true,
        'weui-btn_mini': size === 'mini',
        'weui-btn_large': size === 'large',
        'weui-btn_primary': type === 'primary' || type === 'wechat',
        'weui-btn_default': type === 'default',
        'weui-btn_warn': type === 'warn',
        'weui-btn_wechat': type === 'wechat',
        'weui-btn_disabled': disabled,
        [className]: className,
      });

      this.setData({ cls });
    },
  },
  observers: {
    'className,size,type,disabled': function () {
      this.init();
    },
    'title,image,path,withParams,params,packageName': async function (
      title,
      image,
      path,
      withParams,
      params,
      packageName
    ) {
      let urlParams = '';
      if (params && params.length > 0) {
        urlParams = '?';
        params.forEach(function ({ key, value }, index) {
          urlParams += `${key}=${value}`;
          if (params.length != index + 1) {
            urlParams += '&';
          }
        });
      }
      let newImage = '';
      if (/^cloud:\/\//.test(image)) {
        newImage = await getTempFileURL(image);
      }
      const shareInfo = {
        title,
        path: `${
          packageName ? '/packages/' + packageName : ''
        }/pages/${path}/index${withParams ? urlParams : ''}`,
        imageUrl: newImage || image,
      };
      this.setData({ shareInfo });
    },
  },
  lifetimes: {
    attached() {
      this.init();
    },
  },
});
