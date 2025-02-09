import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';

/**
 * 标准化：网址
 */
Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'input-phone',
    },
    rules: {
      type: Array,
      value: [
        {
          format: 'mobile',
          message: '手机校验失败',
        },
      ],
    },
  },
  data: {
    pattern: '^[()\\d\\s+\\-ext]{0,20}$',
  },
  methods: {
    convertValueToString(val) {
      // 数据源认string
      return String(val ?? '');
    },
    handleChange(event) {
      this.setData({
        value: this.convertValueToString(event.detail.value),
      });
      this.triggerEvent('change', event.detail);
    },
    getValue() {
      return this.convertValueToString(this.data.value);
    },
    updateWidgetAPI: function (inputData = {}) {
      const data = { ...this.data, ...inputData };
      const {
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        before,
        after,
      } = data;

      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        before,
        after,
      });
    },
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after':
      function (name, value) {
        this.updateWidgetAPI({
          value: String(value ?? ''),
        });
      },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
