import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import { WD_PREFIX } from '../../utils/constant';
import classNames from '../../utils/classnames';
import itemBehavior from '../form-field-behavior/item-behavior';
import deepEqual from '../../utils/deepEqual';
import { callWedaApi } from '../../utils/tcb';
import destr from '../../utils/destr';
import { isObjHasProp, arrayToMap, getSelected } from '../../utils/tool';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {},
  data: {
    radioCls: '',
    classPrefix: WD_PREFIX,
    options: [],
    checkedItemValue: '',
    readValue: '-',
    selectedLabel: null,
    selectedItem: null,
    itemMap: {},
  },
  methods: {
    handleClick: function (e) {
      // 禁用项
      const item = e.currentTarget.dataset.item;
      if (item?.disabled) return;

      const { disabled, readOnly } = this.properties;
      const { checkedItemValue } = this.data;
      const value = e.currentTarget.dataset.value;
      if (!disabled && !readOnly) {
        if (checkedItemValue && `${checkedItemValue}` === `${value}`) {
          this.setData({ checkedItemValue: '' });
          this.setData({ value: '' });
          this.triggerEvent('change', { value: '' });
        } else {
          this.setData({ checkedItemValue: value });
          this.setData({ value });
          this.triggerEvent('change', { value });
        }
      }
    },
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
        selectedItem,
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
        item: selectedItem,
      });
    },
    _fetchData: async function () {
      let data = await callWedaApi({
        action: 'DescribeGeneralOptionsDetailList',
        data: {
          OptNameList: [this.properties.enumName],
          PageIndex: 1,
          PageSize: 10,
        },
      });
      const config = destr(data?.Items?.[0]?.Config) ?? [];
      const option = config?.map((item) => {
        return {
          ...item,
          label: item.value,
          value: item.key,
          checked: false,
        };
      });
      this.setData({ options: option });
    },
    getRange: function (rawRange) {
      return (Array.isArray(rawRange) ? rawRange : []).filter((item) =>
        isObjHasProp(item, 'value')
      );
    },
  },
  lifetimes: {
    attached: function () {
      const { direction, format, range, value } = this.properties;
      const { classPrefix } = this.data;
      const compClassName = `${classPrefix}-radio-group `;
      const classList = [compClassName];
      ['inline'].includes(direction) &&
        classList.push(`${classPrefix}-radio-group--inner `);
      this.setData({ radioCls: classNames(classList) });
      this.setData({
        options: format === 'x-enum' ? [] : this.getRange(range),
      });
      this.setData({ checkedItemValue: value });
    },
  },
  observers: {
    'value, range': function (value) {
      this.setData({ checkedItemValue: value });
    },
    'options, readOnly': function (options, readOnly) {
      if (readOnly && Array.isArray(options)) {
        const { value } = this.data;
        this.setData({
          readValue:
            options?.find((option) => `${option.value}` === `${value}`)
              ?.label || '-',
        });
      } else {
        this.setData({ readValue: '-' });
      }
    },
    options: function (options) {
      const itemMap = arrayToMap(options, 'value');
      this.setData({ itemMap });
    },
    'itemMap, value': function (itemMap, value) {
      const { selectedLabel, selectedItem } = getSelected(
        itemMap,
        value,
        false
      );
      this.setData({ selectedLabel, selectedItem });
    },
    'format, range': function (format, rawRange) {
      const range = this.getRange(rawRange);
      if (format !== 'x-enum' && !deepEqual(range, this.data.options)) {
        this.setData({ options: range });
      }
    },
    format: function (format) {
      if (format === 'x-enum' && this.properties.enumName) {
        this._fetchData();
      }
    },
    'name, value, label, required, visible, disabled, readOnly, selectedLabel, selectedItem':
      function () {
        this.updateWidgetAPI();
      },
  },
});
