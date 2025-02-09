/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  convertValueToDateItem,
  convertYearMonthToWeeks,
  convertDayjs,
  convertDateItemToValue,
  getYMD,
  getStartMoment,
} from '../../../utils/getFormLegacy.js';
import { WD_PREFIX, WEEKS } from '../../../utils/constant';

/**
 * 日历组件
 */
Component({
  options: { virtualHost: true },
  properties: {
    value: {
      type: null,
    },
    start: {
      type: null,
    },
    end: {
      type: null,
    },
    mode: {
      type: String,
      value: 'day',
    },
    isWheelChange: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    WEEKS,

    currentValue: null, // 当前选中值，默认当天
    yearMonthDisplay: '', // 年月展示
    yearMonthValue: null, // 当前年月值
    showMode: 'day', // day|month
    weeks: [],
    ymd: '',
  },
  methods: {
    // 切换模式
    handleClickMode: function () {
      const showMode = this.data.showMode === 'day' ? 'month' : 'day';
      this.setData({ showMode });
    },
    // 选年月
    handleSelectYearMonth: function (e) {
      const value = e.detail.value;
      this.setData({ yearMonthValue: value });
      if (this.properties.isWheelChange) {
        this.setData({ currentValue: value });
        this.triggerEvent('onChange', { value });
      }
    },
    // 选月
    handleSelectMonth: function (diff = 0) {
      const dateItem = convertValueToDateItem(this.data.yearMonthValue);
      const month = dateItem.month + diff;
      const value = convertDateItemToValue({ ...dateItem, month });
      this.setData({ yearMonthValue: value });
    },
    // 选天
    handleSelectDay: function (e) {
      const item = e.currentTarget.dataset.item;
      if (item.disabled) return;
      const { yearMonthValue } = this.data;
      const dateItem = convertValueToDateItem(yearMonthValue);
      const currentValue = convertDateItemToValue({
        ...dateItem,
        day: item.day,
      });
      this.setData({ currentValue });
      this.triggerEvent('onChange', { value: currentValue });
    },
    handlePreMonth: function () {
      this.handleSelectMonth(-1);
    },
    handletNextMonth: function () {
      this.handleSelectMonth(1);
    },
  },
  observers: {
    'value,mode': function (value, mode) {
      if (this.data.currentValue && value === this.data.currentValue) return;
      const m = convertDayjs(value) || getStartMoment(mode);
      const currentValue = m.valueOf();
      this.setData({ currentValue });
    },
    currentValue: function (currentValue) {
      const m = convertDayjs(currentValue);
      const dateItem = convertValueToDateItem(m);
      const ymd = getYMD(dateItem);
      const yearMonthDisplay = m.format('YYYY年MM月');
      this.setData({ yearMonthDisplay, ymd, yearMonthValue: currentValue });
    },
    'yearMonthValue, start, end': function (yearMonthValue, start, end) {
      const m = convertDayjs(yearMonthValue);
      const yearMonthDisplay = m?.format('YYYY年MM月');
      const { year, month } = convertValueToDateItem(yearMonthValue);
      const weeks = convertYearMonthToWeeks(year, month, [start, end]);
      this.setData({ weeks, yearMonthDisplay });
    },
  },
});
