import classNames from '../../../utils/classnames';

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
    label: {
      type: String,
      value: '标题',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    defaultValue: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '请输入',
    },
    maxLength: {
      type: Number,
      value: 140,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    requiredFlag: {
      type: Boolean,
      value: false,
    },
    counterVisible: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    cls: '',
    value: '',
  },
  lifetimes: {
    attached() {
      const { className } = this.properties;
      this.setData({
        cls: classNames({
          'weda-ui': true,
          'weda-textarea': true,
          [className]: className,
        }),
      });
    },
  },
  observers: {
    defaultValue: function (defaultValue) {
      this.setData({ value: defaultValue });
    },
  },
  methods: {
    handleChange: function (e) {
      this.setData({ value: e.detail.value });
      this.triggerEvent('change', e.detail);
    },
    handleFocus: function (e) {
      this.triggerEvent('focus', e.detail);
    },
    handleBlur: function (e) {
      this.triggerEvent('blur', e.detail);
    },
  },
});
