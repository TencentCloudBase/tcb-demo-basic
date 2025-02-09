import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior, formFieldBehavior],
  properties: {
    maxLength: {
      type: Number,
      value: 140,
    },
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
    size: {
      type: String,
      value: 'full',
    },
    focus: {
      type: Boolean,
      value: false,
    },
    label: {
      type: String,
      value: '标题',
    },
    rules: {
      type: Array,
      value: [],
    },
    layout: {
      type: String,
      value: '',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    clearable: {
      type: Boolean,
      value: true,
    },
    placeholder: {
      type: String,
      value: '请输入',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    validateStatus: {
      type: String,
      value: 'success',
    },
  },
  data: {
    rules: [
      {
        format: 'email',
        message: '邮箱校验失败',
      },
    ],
  },
  methods: {
    handleFocus: function (e) {
      this.triggerEvent('focus', e.detail);
    },
    handleBlur: function (e) {
      this.triggerEvent('blur', e.detail);
    },
    handleChange(e) {
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
  observers: {
    label: function (label) {
      this.setReadonlyAttributes({ label });
    },
  },
});
