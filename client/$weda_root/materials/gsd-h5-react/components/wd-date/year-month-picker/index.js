/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  convertValueToDateItem,
  convertDayjs,
  convertDateItemToValue,
  getExistIndex,
  getPickerOptions,
  getStartMoment,
} from '../../../utils/getFormLegacy.js';
import { WD_PREFIX } from '../../../utils/constant.js';

/**
 * 年/年月选择组件
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
      value: 'month',
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    itemStyle: 'line-height: 40px; text-align: center',
    yearOptions: [], // number[]
    monthOptions: [], // number[]
    pickerValue: [], // index[]
    currentValue: null, // number
  },
  methods: {
    // 变更值，同时变更范围
    handleChange: function (e) {
      const [yearIndex, monthIndex] = e.detail.value || [];
      const { yearOptions, monthOptions, currentValue } = this.data;
      const [year, month] = [yearOptions[yearIndex], monthOptions[monthIndex]];

      const newMonthOptions = this.getMonthOptions(year);
      const newMonthIndex = getExistIndex(month, newMonthOptions);
      const newMonth = newMonthOptions[newMonthIndex];

      const dateItem = convertValueToDateItem(currentValue);
      const newValue = convertDateItemToValue({
        ...dateItem,
        year,
        month: newMonth,
      });
      const pickerValue = [yearIndex, newMonthIndex];
      this.setData({
        currentValue: newValue,
        pickerValue,
        monthOptions: newMonthOptions,
      });
      this.triggerEvent('onChange', { value: newValue });
    },

    // 月选项
    getMonthOptions: function (year, start, end) {
      const { startY, endY, startYM, endYM } = this.getStartAndEnd(start, end);
      if (!startY || !endY) return [];
      let [_start, _end] = [0, 11];
      if (year === startY) {
        _start = startYM;
      }
      if (year === endY) {
        _end = endYM;
      }
      return getPickerOptions(_start, _end);
    },

    // 年选项
    getYearOptions: function (start, end) {
      const { startY, endY } = this.getStartAndEnd(start, end);
      if (!startY || !endY) return [];
      return getPickerOptions(startY, endY);
    },

    // 年月首尾
    getStartAndEnd: function (start, end) {
      start = start || this.properties.start;
      end = end || this.properties.end;
      const startM = convertDayjs(start);
      const endM = convertDayjs(end);
      const [startY, endY, startYM, endYM] = [
        startM?.year(),
        endM?.year(),
        startM?.month(),
        endM?.month(),
      ];
      return { startY, endY, startYM, endYM };
    },

    // 初始化值
    setInitOptions: function () {
      const { value, start, end, mode } = this.properties;
      const m = convertDayjs(value) || getStartMoment(mode);
      const currentValue = m.valueOf();
      const { year, month } = convertValueToDateItem(currentValue);
      const yearOptions = this.getYearOptions(start, end);
      const monthOptions = this.getMonthOptions(year, start, end);
      const yearIndex = yearOptions.findIndex((d) => d === year);
      const monthIndex = monthOptions.findIndex((d) => d === month);
      const pickerValue = [yearIndex, monthIndex];
      this.setData({
        currentValue,
        pickerValue,
        yearOptions,
        monthOptions,
      });
    },
  },
  observers: {
    'value,mode': function (value) {
      if (this.data.currentValue && value === this.data.currentValue) return;
      this.setInitOptions();
    },
  },
  lifetimes: {},
});
