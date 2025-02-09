import classNames from '../../../utils/classnames';

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
    usage: {
      type: String,
    },
    language: {
      type: String,
      value: 'zh_CN',
    },
  },
  data: {
    cls: '',
  },
  methods: {
    getUserProfile() {
      wx.getUserProfile({
        desc: this.properties.usage,
        lang: this.properties.language,
        success: (userRes) => {
          const { userInfo } = userRes;
          this.triggerEvent('userinfosuccess', userInfo || {});
        },
        fail: (err) => {
          this.triggerEvent('userinfofail', err);
        },
      });
    },
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
  },
  lifetimes: {
    attached() {
      this.init();
    },
  },
});
