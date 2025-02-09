import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import tagBehavior from '../wd-tag/tag-behavior';
import isEqual from '../../utils/deepEqual';
import { arrayToMap, isObjHasProp, getSelected } from '../../utils/tool';

/**
 * 标准化：标签选择
 */
Component({
  options: { virtualHost: true, pureDataPattern: /^itemMap$/ },
  behaviors: [itemBehavior, tagBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'tag-select',
    },
    size: {
      type: String,
      value: 'lg',
    },
  },
  data: {
    options: [], // 过滤掉无value值后的 range
    selectedLabel: null,
    selectedItem: null,
    itemMap: {},
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
        selectedLabel,
        selectedItem: item,
        options: range,
      } = this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        selectedLabel,
        item,
        range,
      });
    },
    handleChange: function (e) {
      const item = e.detail.item;
      if (this.data.disabled || item.disabled) return;
      const newValue =
        this.properties.checkType !== 'radio'
          ? this.getMultipleValue(this.data.value, item.value)
          : this.getSingleValue(this.data.value, item.value);
      this.setData({ value: newValue });
      this.triggerEvent('change', { value: newValue });
    },
    getSingleValue: function (value, val) {
      const lastChecked = isEqual(value, val);
      return lastChecked ? null : val;
    },
    getMultipleValue: function (value, val) {
      let newValue = Array.isArray(value) ? [].concat(value) : [];
      const lastChecked = newValue.some((d) => isEqual(d, val));
      if (lastChecked) {
        newValue = newValue.filter((d) => !isEqual(d, val));
      } else {
        newValue.push(val);
      }
      return newValue;
    },
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, selectedLabel, selectedItem':
      function () {
        this.updateWidgetAPI();
      },
    range: function (range) {
      const list = Array.isArray(range) ? range : [];
      const options = list.filter((item) => isObjHasProp(item, 'value'));
      const itemMap = arrayToMap(options, 'value');
      this.setData({ options, itemMap });
    },
    'itemMap, value, checkType': function (itemMap, value, checkType) {
      const { selectedLabel, selectedItem } = getSelected(
        itemMap,
        value,
        checkType !== 'radio'
      );
      this.setData({ selectedLabel, selectedItem });
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
