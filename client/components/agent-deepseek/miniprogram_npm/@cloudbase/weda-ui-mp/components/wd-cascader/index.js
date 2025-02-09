/* eslint-disable @typescript-eslint/no-magic-numbers */

import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import { convertFixedIcon, SELECT_ICON_H5 } from '../../utils/getFormLegacy';
import debounce from '../../utils/debounce';
import {
  getSelectedOptions,
  transformTabData,
  setSelectedValue,
  initTabData,
  initListOptions,
  placeholderItem,
} from './utils';
Component({
  options: {
    virtualHost: true,
  },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'cascader',
    },
    data: {
      type: Array,
      value: [],
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: '',
    },
  },
  data: {
    initData: [],
    tabData: [],
    listOptions: [],
    _suffixType: '',
    _suffixIcon: '',
    modalVisible: false,
    searchable: false,
    selectedOptions: [],
    displayValue: '',
  },
  methods: {
    finalUpdateWidgetAPI: function () {
      const { selectedOptions } = this.data;
      this.setReadonlyAttributes &&
        this.setReadonlyAttributes({
          selectedOptions,
        });
      this.updateWidgetAPI();
    },
    search: function (e) {
      this.debouncedTriggerSearchEvent(e.detail.value);
    },
    debouncedTriggerSearchEvent: debounce(function (value) {
      this.triggerEvent('search', {
        value,
      });
    }),

    // tab 展示值
    updateTabData: function (newTabData, activeItem) {
      let _activeItem = activeItem;
      // 当前选中值是否存在子选项
      const hasChildItem = newTabData[newTabData.length - 1]?.children?.length;

      let tabData = [...newTabData];
      if (hasChildItem) {
        _activeItem = placeholderItem;
        tabData = [...tabData, placeholderItem];
      }
      const _tabData = setSelectedValue(tabData, _activeItem.value);
      this.setData({
        tabData: _tabData,
      });
    },

    // 点击列表选项
    handleListOptionsClick: function (itemInfo) {
      const item = itemInfo?.currentTarget?.dataset?.item;
      if (item.disabled) return;
      const { listOptions, tabData } = this.data;
      if (item.children) {
        this.setData({
          listOptions: [...item.children],
        });
      } else {
        const _listOptions = setSelectedValue(listOptions, item.value);
        this.setData({
          listOptions: _listOptions,
        });
      }
      // 更新tab数据
      const newTabData = [...tabData.filter((i) => i.level < item.level), item];
      this.updateTabData(newTabData, item);
    },

    // 点击tab项，更新列表选项
    handleTabClick: function (e) {
      const selectedIndex = e?.detail;
      const { tabData, initData } = this.data;
      const selectedItem = tabData[selectedIndex];
      this.updateTabData(tabData, selectedItem);
      let listOptions =
        selectedItem.level === 0
          ? initData
          : tabData.find((i) => i.level === selectedIndex - 1)?.children;

      listOptions = setSelectedValue(listOptions, selectedItem?.value);
      this.setData({
        listOptions: listOptions,
      });
    },
    init: function () {
      const { data, value } = this.data;
      const _value = Array.isArray(value) ? value : [];
      const initData = transformTabData(data);
      const tabData = initTabData(initData, _value || [], placeholderItem);
      const listOptions = initListOptions(initData, _value || []);
      const selectedOptions = _value?.map(
        (i) => getSelectedOptions(data, i) || { label: i, value: i }
      );
      const displayValue = selectedOptions
        ?.map((i) => i?.label || i?.value)
        ?.join(' / ');
      this.setData({
        tabData,
        listOptions,
        initData,
        selectedOptions,
        displayValue,
      });
    },
    handleClick: function () {
      if (this.data.disabled) return;
      this.setData({
        modalVisible: true,
      });
    },
    handleClose: function () {
      this.setData({
        modalVisible: false,
      });
      this.init();
    },
    handleOk: function () {
      const { tabData, data } = this.data;
      const value = tabData
        .map((item) => item.value)
        .filter((i) => i !== '__placeholderItem');
      const selectedOptions = value.map((i) => getSelectedOptions(data, i));
      this.setData({
        modalVisible: false,
        value,
        selectedOptions,
        displayValue: selectedOptions?.map((i) => i.label)?.join(' / '),
      });
      this.triggerEvent('change', {
        value,
      });
    },
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after, selectedOptions':
      function () {
        this.finalUpdateWidgetAPI();
      },
    'suffixType,suffixIcon': function (suffixType, suffixIcon) {
      const [_suffixType, _suffixIcon] = convertFixedIcon(
        suffixType,
        suffixIcon,
        SELECT_ICON_H5
      );
      this.setData({
        _suffixType,
        _suffixIcon,
      });
    },
    'data, value': function () {
      this.init();
    },
  },
  lifetimes: {
    attached: function () {
      this.finalUpdateWidgetAPI();
      this.init();
      this.setData({ id: this.id });
    },
  },
});
