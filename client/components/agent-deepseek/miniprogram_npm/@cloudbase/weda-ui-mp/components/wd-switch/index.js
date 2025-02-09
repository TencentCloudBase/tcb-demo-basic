import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import { WD_PREFIX } from '../../utils/constant';
import classNames from '../../utils/classnames';
import itemBehavior from '../form-field-behavior/item-behavior';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {},
  data: {
    checked: false,
    classPrefix: WD_PREFIX,
    switchCls: '',
  },
  methods: {
    handleChange: function (e) {
      this.setData({ value: e?.detail?.value });
      this.setData({ checked: e?.detail?.value });
      this.triggerEvent('change', e?.detail);
    },
    updateWidgetAPI: function () {
      const { name, value, label, required, visible, disabled, readOnly } =
        this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
      });
    },
  },
  lifetimes: {
    attached() {
      this.updateWidgetAPI();
      const { value, disabled, readOnly } = this.properties;
      this.setData({ checked: value });
      const switchCls = classNames({
        'is-checked': value,
        'is-disabled': disabled || readOnly,
        'is-readonly': readOnly,
        'size-lg': true,
      });
      this.setData({ switchCls });
    },
  },
  observers: {
    'value, disabled, readOnly': function (value, disabled, readOnly) {
      const switchCls = classNames({
        'is-checked': value,
        'is-disabled': disabled || readOnly,
        'size-lg': true,
      });
      this.setData({
        switchCls,
      });
    },
    'name, value, label, required, visible, disabled, readOnly': function () {
      this.updateWidgetAPI();
    },
  },
});
