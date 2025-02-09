import handleEvents from '../../utils/handleEvents';
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
    size: {
      type: String,
      value: 'full',
    },
    range: {
      type: Array,
      value: [{ label: '选项名称', value: '选项值' }],
    },

    // where: {
    //   type: Array,
    // },
    format: {
      type: String,
      value: '',
    },
    viewId: {
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

    enumName: {
      type: String,
      value: '',
    },

    tipBlock: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '请选择',
    },
    primaryField: {
      type: String,
      value: '',
    },
    dataSourceName: {
      type: String,
      value: '',
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
  observers: {
    primaryField: function (primaryField) {
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({ selectFields: [primaryField] });
    },
    label: function (label) {
      this.setReadonlyAttributes({ label });
    },
  },
});
