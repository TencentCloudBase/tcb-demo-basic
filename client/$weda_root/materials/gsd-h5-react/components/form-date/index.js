import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import { dateValueFormat } from '../../utils/platform';

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
    start: {
      type: String,
      value: '',
    },
    end: {
      type: String,
      value: '',
    },
    mode: {
      type: String,
      value: 'day',
    },

    size: {
      type: String,
      value: 'm',
    },

    placeholder: {
      type: String,
      value: '请选择',
    },
    labelVisible: {
      type: Boolean,
      value: true,
    },
    label: {
      type: String,
      value: '字段标题',
    },
    submitFormatter: {
      type: Function,
      value: dateValueFormat,
    },
  },
  methods: {
    change: function (e) {
      this.setData({ value: e.detail.value });
      this.triggerEvent('change', e.detail);
    },
    ...handleEvents([
      {
        title: '取消',
        name: 'cancel',
      },
    ]),
  },
  observers: {},
});
