import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import equal from '../../utils/deepEqual';
import classNames from '../../utils/classnames';

Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'location',
    },
    customLocation: {
      type: null,
    },
    id: {
      Type: String,
      value: '',
    },
  },
  data: {
    _oldLocationValue: null,
    readValue: '',
    cls: '',
  },
  methods: {
    handleChange: function (e) {
      if (equal(e.detail.value, this.data._oldLocationValue)) return;
      this.data._oldLocationValue = e.detail.value;
      this.changeForm(e);
      this.triggerEvent('change', e.detail);
    },
    handleClear: function () {
      const e = { detail: { value: null } };
      this.handleChange(e);
    },
    handleError: function (e) {
      this.triggerEvent('error', e.detail);
    },
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after': function () {
      this.updateWidgetAPI();
    },
    value: function (v) {
      const readValue = typeof v === 'object' ? v?.['address'] : v;
      this.setData({ readValue });
    },
    'className,showMap': function (className, showMap) {
      const cls = classNames(className, {
        showMap: showMap,
      });
      this.setData({ cls });
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
      this.setData({ id: this.id });
    },
  },
});
