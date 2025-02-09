import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import { convertFixedIcon, SELECT_ICON_H5 } from '../../utils/getFormLegacy';
import { safeObj, arrayToMap, getSelected } from '../../utils/tool';
import debounce from '../../utils/debounce';

Component({
  options: { virtualHost: true, styleIsolation: 'shared' },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'select-multiple',
    },
  },
  data: {
    options: [],
    itemMap: {},
    selectedLabel: null,
    selectedItem: null,
    _suffixType: '',
    _suffixIcon: '',
  },
  methods: {
    finalUpdateWidgetAPI: function () {
      const { selectedLabel, primaryField, selectedItem } = this.properties;
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          selectedLabel,
          selectFields: [primaryField],
          item: selectedItem,
        });
      this.updateWidgetAPI();
    },
    changeOptions: function (e) {
      const { options } = safeObj(e.detail.value);
      this.setData({ options });
    },
    search: function (e) {
      this.debouncedTriggerSearchEvent(e.detail.value);
    },
    debouncedTriggerSearchEvent: debounce(function (value) {
      this.triggerEvent('search', { value });
    }),
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after, primaryField, selectedLabel, selectedItem':
      function () {
        this.finalUpdateWidgetAPI();
      },
    'suffixType,suffixIcon': function (suffixType, suffixIcon) {
      const [_suffixType, _suffixIcon] = convertFixedIcon(
        suffixType,
        suffixIcon,
        SELECT_ICON_H5
      );
      this.setData({ _suffixType, _suffixIcon });
    },
    options: function (options) {
      const itemMap = arrayToMap(options, 'value');
      this.setData({ itemMap });
    },
    'itemMap, value': function (itemMap, value) {
      const { selectedLabel, selectedItem } = getSelected(itemMap, value, true);
      this.setData({ selectedLabel, selectedItem });
    },
  },
  lifetimes: {
    attached: function () {
      this.finalUpdateWidgetAPI();
    },
  },
});
