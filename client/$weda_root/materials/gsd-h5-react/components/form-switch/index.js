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
    labelVisible: {
      type: Boolean,
      value: true,
    },
    label: {
      type: String,
      value: '字段标题',
    },
  },
  methods: {
    change: function (event) {
      this.setData({ value: event.detail.value });
      this.triggerEvent('change', event.detail);
    },
  },
  observers: {
    label: function (label) {
      this.setReadonlyAttributes({ label });
    },
  },
});
