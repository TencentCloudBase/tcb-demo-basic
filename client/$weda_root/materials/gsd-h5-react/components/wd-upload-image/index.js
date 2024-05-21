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
      value: 'upload-image',
    },
    isCompressBeforeUpload: {
      type: Boolean,
      value: false,
    },
    compressQuality: {
      type: Number,
      value: 0.7,
    },

    compressedHeight: {
      type: Number,
      value: 0,
    },
    compressedWidth: {
      type: Number,
      value: 0,
    },
    sourceType: {
      type: String,
      value: 'both',
    },
    callbacks: {
      type: Object,
      value: null,
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
    'name, value, label, required, visible, disabled, readOnly, sourceType':
      function () {
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
