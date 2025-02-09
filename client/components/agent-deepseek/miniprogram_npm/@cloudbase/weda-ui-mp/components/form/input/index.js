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
    password: {
      type: Boolean,
      value: false,
    },
    placeholder: {
      type: String,
      value: '请输入',
    },
    type: {
      type: String,
      value: 'text',
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
    clearable: {
      type: Boolean,
      value: true,
    },
    isNickNameType: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    isFlex: true,
    isFocus: false,
    value: '',
    hasInit: false,
  },
  lifetimes: {
    attached() {
      this.setData({
        isFlex: this.properties.layout !== 'vertical',
        isFocus: this.properties.focus,
      });
      // eslint-disable-next-line rulesdir/no-timer
      setTimeout(() => this.setData({ hasInit: true }));
    },
  },
  observers: {
    defaultValue: function (defaultValue) {
      if (defaultValue !== this.data.value) {
        this.setData({ value: defaultValue });
      }
    },
    'value,type,hasInit': function (value, type, hasInit) {
      if (['number', 'digit'].includes(type) && value === '' && hasInit) {
        this.triggerEvent('change', { value: null });
      }
    },
  },
  methods: {
    handleFocus: function (e) {
      this.triggerEvent('focus', e.detail);
      this.setData({ isFocus: true });
    },
    handleBlur: function (e) {
      this.triggerEvent('blur', e.detail);
      this.setData({ isFocus: false });
    },
    handleChange: function (e) {
      this.triggerEvent('change', e.detail);
      this.setData({ value: e.detail.value });
    },
    handleClear: function (e) {
      this.triggerEvent('clear', e.detail);
      this.setData({ value: '' });
    },
    handleConfirm: function (e) {
      this.triggerEvent('confirm', e.detail);
    },
  },
});
