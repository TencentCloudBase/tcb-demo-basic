import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import { convertFixedIcon, SELECT_ICON_H5 } from '../../utils/getFormLegacy';

Component({
  options: { virtualHost: true, styleIsolation: 'shared' },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'region',
    },
  },
  data: {
    _suffixType: '',
    _suffixIcon: '',
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after':
      function () {
        this.updateWidgetAPI();
      },
    'suffixType,suffixIcon': function (suffixType, suffixIcon) {
      const [_suffixType, _suffixIcon] = convertFixedIcon(
        suffixType,
        suffixIcon,
        SELECT_ICON_H5
      );
      this.setData({ _suffixType, _suffixIcon });
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
