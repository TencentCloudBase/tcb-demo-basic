import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [commonCompBehavior, formFieldBehavior],
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
    label: {
      type: String,
      value: '标题',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    layout: {
      type: String,
      value: '',
    },
    format: {
      type: String,
      value: '',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    range: {
      type: Array,
      value: [],
    },
    enumName: {
      type: String,
      value: '',
    },
  },
  data: {
    actualRange: [],
  },
  methods: {
    change: function (e) {
      this.setData({ value: e.detail.value });
      this.triggerEvent('change', e.detail);
    },
  },
  observers: {
    'range, value': function (propRange, value) {
      const range =
        propRange &&
        propRange.map((item) => {
          const checked = value && value.find((val) => val === item.value);
          return {
            value: item.value,
            label: item.label,
            checked: !!checked,
          };
        });
      this.setData({ actualRange: range });
    },
    label: function (label) {
      this.setReadonlyAttributes({ label });
    },
  },
});
