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
      value: 'input-url',
    },
    rules: {
      type: Array,
      value: [
        {
          format: 'url',
          message: 'url校验失败',
        },
      ],
    },
  },
  methods: {
    updateWidgetAPI: function () {
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
      } = this.data;
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
      function () {
        this.updateWidgetAPI();
      },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
