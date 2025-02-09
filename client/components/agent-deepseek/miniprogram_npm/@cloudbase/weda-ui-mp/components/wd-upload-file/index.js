import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import isEqual from '../../utils/deepEqual';
import { convertSingleValue } from '../../utils/platform';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'upload-file',
    },
    acceptTypes: {
      type: String,
      value: '',
    },
    callbacks: {
      type: Object,
      value: null,
    },
    uploadTipText: {
      type: String,
      value: '支持批量上传',
    },
    uploadButtonText: {
      type: String,
      value: '点击上传',
    },
  },
  methods: {
    initValue: function () {
      const { value, single } = this.properties;
      const v = convertSingleValue(value, single);
      if (!isEqual(v, value)) {
        this.setData({ value: v });
      }
    },
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly': function () {
      this.updateWidgetAPI();
    },
  },
  lifetimes: {
    attached: function () {
      this.initValue();
      this.updateWidgetAPI();
    },
  },
});
