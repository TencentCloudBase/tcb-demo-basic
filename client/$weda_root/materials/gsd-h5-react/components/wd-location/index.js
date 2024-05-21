import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import equal from '../../utils/deepEqual';

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
  },
  data: {
    _oldLocationValue: null,
    readValue: '',
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
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after':
      function () {
        this.updateWidgetAPI();
      },
    value: function (v) {
      const readValue = typeof v === 'object' ? v?.['address'] : v;
      this.setData({ readValue });
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
