/* eslint-disable @typescript-eslint/no-magic-numbers */
import { commonCompBehavior } from '../../utils/common-behavior';
import {
  getStartMoment,
  convertValueToDateItem,
  getYMD,
  convertMethodParam,
} from '../../utils/getFormLegacy';
import { WEEKS, getConfigDataObj, convertWeeks } from './weeks';

Component({
  behaviors: [commonCompBehavior],
  externalClasses: ['ext-class'],
  options: {
    virtualHost: true,
  },
  properties: {
    id: {
      type: String,
      value: '',
    },
    className: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    initVisible: {
      type: Boolean,
      value: true,
    },
    value: {
      type: null,
    },
    initMonth: {
      type: null,
    },
    configData: {
      type: Array,
      value: [],
    },
  },
  data: {
    currentValue: null, // 时间戳
    currentMonthValue: null, // 时间戳
    yearMonthDisplay: '',
    checkedDay: '',
    configDataObj: null,
    weeks: [],
    WEEKS,

    _oldCurrentValue: null, // 用于对比，避免触发 setData
    _oldCurrentMonthValue: null, // 用于对比，避免触发 setData
  },
  methods: {
    updateWidgetAPI: function () {
      const { configData, initVisible } = this.properties;
      const { currentValue, currentMonthValue } = this.data;
      const that = this;
      this.setReadonlyAttributes?.({
        value: currentValue,
        initMonth: currentMonthValue,
        configData,
        initVisible,
        setValue: that._setValue.bind(that),
        setInitMonth: that._setInitMonth.bind(that),
      });
    },
    // 更改属性，内部转成时间戳
    _setValue: function (v) {
      const value = convertMethodParam(v);
      this.setData({ value });
    },
    // 更改属性，内部转成时间戳
    _setInitMonth: function (v) {
      const value = convertMethodParam(v);
      this.setData({ initMonth: value });
    },
    // 切换年月, -1/1: 上一月/下一月
    handleChangeMonth(e) {
      const { diff = 0 } = e.currentTarget?.dataset || {};
      const { currentMonthValue } = this.data;
      const { year, month } = convertValueToDateItem(currentMonthValue);
      const _month = month + diff;
      const v = new Date(year, _month).valueOf();
      const value = getStartMoment('month', v).valueOf();
      this.setData({ currentMonthValue: value });
      this.triggerEvent('changeMonth', { value });
    },
    // 选中日期
    handleChange(e) {
      const { item = {} } = e.currentTarget?.dataset || {};
      const { year, month, day, disabled, isPre, isNext } = item;
      if (disabled) return;
      const v = new Date(year, month, day).valueOf();
      const value = getStartMoment('day', v, false)?.valueOf();
      this.setData({ currentValue: value });
      this.triggerEvent('change', { value });
      if (isPre || isNext) {
        const monthValue = getStartMoment('month', v)?.valueOf();
        this.setData({ currentMonthValue: monthValue });
        this.triggerEvent('changeMonth', { value: monthValue });
      }
    },
  },
  observers: {
    'currentValue,currentMonthValue,configData,initVisible': function () {
      this.updateWidgetAPI();
    },
    // 初始日期、初始年月，防止 $w.now() 这种输入
    'value, initMonth': function (value, initMonth) {
      const { _oldCurrentValue, _oldCurrentMonthValue } = this.data;
      const currentValue = getStartMoment('day', value, false)?.valueOf();
      const currentMonthValue = getStartMoment('month', initMonth)?.valueOf();
      if (
        currentValue !== _oldCurrentValue ||
        currentMonthValue !== _oldCurrentMonthValue
      ) {
        this.setData({
          currentValue,
          currentMonthValue,
          _oldCurrentValue: currentValue,
          _oldCurrentMonthValue: currentMonthValue,
        });
      }
    },
    // 初始配置项
    configData: function (configData) {
      const configDataObj = getConfigDataObj(configData);
      this.setData({ configDataObj });
    },
    currentValue: function (currentValue) {
      const dateItem = currentValue ? convertValueToDateItem(currentValue) : {};
      const checkedDay = getYMD(dateItem);
      this.setData({ checkedDay });
    },
    'currentMonthValue,configDataObj': function (
      currentMonthValue,
      configDataObj
    ) {
      const { year, month } = convertValueToDateItem(currentMonthValue);
      const weeks = convertWeeks(year, month, configDataObj);
      const yearMonthDisplay = `${year}年${month + 1}月`;
      this.setData({ weeks, yearMonthDisplay });
    },
  },
  lifetimes: {
    attached: function () {
      if (this.properties.value == null) {
        this.setData({ value: Date.now() });
      }
      this.updateWidgetAPI();
    },
  },
});
