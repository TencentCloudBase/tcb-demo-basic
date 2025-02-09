import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import { WD_PREFIX } from '../../utils/constant';
import classNames from '../../utils/classnames';
import itemBehavior from '../form-field-behavior/item-behavior';
import { callWedaApi } from '../../utils/tcb';
import destr from '../../utils/destr';
import { isObjHasProp, arrayToMap, getSelected, isObj } from '../../utils/tool';

Component({
  options: {
    virtualHost: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {},
  data: {
    checkboxCls: '',
    classPrefix: WD_PREFIX,
    options: [],
    enumOptions: [],
    checkedItemValue: {},
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
      const checked = !checkedItemValue[value];
      const newMap = Object.assign({}, checkedItemValue, {
        [value]: checked,
      });
      if (!disabled && !readOnly) {
        const value = Object.entries(newMap)
          .filter(([, checked]) => checked)
          .map(([value]) => value);
        this.setData({ checkedItemValue: newMap });
        this.setData({ value });
        this.triggerEvent('change', { value });
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
    // 加上选中
    getOptions: function (options, value) {
      if (!Array.isArray(options)) return [];
      if (!Array.isArray(value)) return options;
      const opts = options.map((item) => {
        const checked = value.find((val) => `${val}` === `${item.value}`);
        return {
          ...item,
          value: item.value,
          label: item.label,
          checked: !!checked,
        };
      });
      return opts;
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
      const enumOption = config.map((item) => {
        return {
          ...item,
          label: item.value,
          value: item.key,
          checked: false,
        };
      });
      this.setData({ enumOptions: enumOption });
      const opts = this.getOptions(enumOption, this.properties.value);
      this.setData({ options: opts });
    },
  },
  observers: {
    direction: function (direction) {
      const { classPrefix } = this.data;
      const compClassName = `${classPrefix}-checkbox-group `;
      const classList = [compClassName];
      if (['inline'].includes(direction)) {
        classList.push(`${classPrefix}-checkbox-group--inline `);
      }
      this.setData({ checkboxCls: classNames(classList) });
    },
    'format, range, value': function (format, rawRange, value) {
      const range = (Array.isArray(rawRange) ? rawRange : []).filter((item) =>
        isObjHasProp(item, 'value')
      );
      const options = format !== 'x-enum' ? range : this.data.enumOptions;
      const opts = this.getOptions(options, value);
      this.setData({ options: opts });
    },
    'options, readOnly': function (options, readOnly) {
      const tempValue = {};
      const tempLabel = [];
      options.forEach(({ value, label, checked }) => {
        tempValue[value] = !!checked;
        if (checked) {
          tempLabel.push(label);
        }
      });
      this.setData({
        checkedItemValue: tempValue,
      });
      if (readOnly && tempLabel.length > 0) {
        this.setData({ readValue: tempLabel.join('，') });
      } else {
        this.setData({ readValue: '-' });
      }
    },
    options: function (options) {
      const list = (Array.isArray(options) ? options : []).filter((item) =>
        isObj(item)
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tidyOptions = list.map(({ checked, ...rest }) => rest);
      const itemMap = arrayToMap(tidyOptions, 'value');
      this.setData({ itemMap });
    },
    'itemMap, value': function (itemMap, value) {
      const { selectedLabel, selectedItem } = getSelected(itemMap, value, true);
      this.setData({ selectedLabel, selectedItem });
    },
    'format, enumName': function (format, enumName) {
      if (format === 'x-enum' && enumName) {
        this._fetchData();
      }
    },
    'name, value, label, required, visible, disabled, readOnly, selectedLabel, selectedItem':
      function () {
        this.updateWidgetAPI();
      },
  },
});
