import handleEvents from '../../utils/handleEvents';
import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import debounce from '../../utils/debounce';

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

    where: {
      type: Array,
    },
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
    required: {
      type: Boolean,
      value: false,
    },
    requiredFlag: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    debouncedTriggerSearchEvent: debounce(function (value) {
      this.triggerEvent('search', { value });
    }),
    change: function (event) {
      this.setData({ value: event.detail.value });
      this.triggerEvent('change', event.detail);
    },
    ...handleEvents([
      {
        title: '取消',
        name: 'cancel',
      },
    ]),

    search: function (ev) {
      this.setReadonlyAttributes({ searchValue: ev.detail.value });
      this.debouncedTriggerSearchEvent(ev.detail.value);
    },
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
