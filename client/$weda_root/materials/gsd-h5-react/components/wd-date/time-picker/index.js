import {
  convertValueToDateItem,
  convertDayjs,
  convertDateItemToValue,
  getExistIndex,
  getYMD,
  getStartMoment,
  getPickerOptions,
} from '../../../utils/getFormLegacy.js';
import { WD_PREFIX } from '../../../utils/constant.js';

/**
 * 时间选择组件
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
      value: 'datetime',
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    itemStyle: 'line-height: 40px; text-align: center',
    hourOptions: [], // number[]
    minuteOptions: [], // number[]
    secondOptions: [], // number[]
    pickerValue: [], // index[]
    currentValue: null,
  },
  methods: {
    // 变更值，同时变更范围
    handleChange: function (e) {
      const [hourIndex, minuteIndex, secondIndex] = e.detail.value || [];
      const { start, end } = this.properties;
      const { hourOptions, minuteOptions, secondOptions, currentValue } =
        this.data;
      const [hour, minute, second] = [
        hourOptions[hourIndex],
        minuteOptions[minuteIndex],
        secondOptions[secondIndex],
      ];

      const newMinuteOptions = this.getMinuteOptions(
        hour,
        currentValue,
        start,
        end
      );
      const newMinuteIndex = getExistIndex(minute, newMinuteOptions);
      const newMinute = newMinuteOptions[newMinuteIndex];

      const newSecondOptions = this.getSecondOptions(
        hour,
        newMinute,
        currentValue,
        start,
        end
      );
      const newSecondIndex = getExistIndex(second, newSecondOptions);
      const newSecond = newSecondOptions[newSecondIndex];

      const dateItem = convertValueToDateItem(currentValue);
      const newValue = convertDateItemToValue({
        ...dateItem,
        hour,
        minute: newMinute,
        second: newSecond,
      });
      const pickerValue = [hourIndex, newMinuteIndex, newSecondIndex];

      this.setData({
        currentValue: newValue,
        pickerValue,
        minuteOptions: newMinuteOptions,
        secondOptions: newSecondOptions,
      });

      this.triggerEvent('onChange', { value: newValue });
    },

    // 获取首尾需要对比的值
    getStartAndEnd: function (value, start, end) {
      value = value ?? this.data.currentValue;
      start = start ?? this.properties.start;
      end = end ?? this.properties.end;
      const [dateItem, startItem, endItem] = [value, start, end].map((d) =>
        convertValueToDateItem(d)
      );
      const [dateYMD, startYMD, endYMD] = [dateItem, startItem, endItem].map(
        (d) => getYMD(d)
      );
      return { dateItem, startItem, endItem, dateYMD, startYMD, endYMD };
    },

    // 时
    getHourOptions: function (value, start, end) {
      let _start = 0;
      let _end = 23;
      const { dateYMD, startYMD, endYMD, startItem, endItem } =
        this.getStartAndEnd(value, start, end);
      if (dateYMD === startYMD) {
        _start = startItem.hour;
      }
      if (dateYMD === endYMD) {
        _end = endItem.hour;
      }
      return getPickerOptions(_start, _end);
    },

    // 分
    getMinuteOptions: function (hour, value, start, end) {
      let _start = 0;
      let _end = 59;
      const { dateYMD, startYMD, endYMD, startItem, endItem } =
        this.getStartAndEnd(value, start, end);
      if (dateYMD === startYMD && startItem.hour === hour) {
        _start = startItem.minute;
      }
      if (dateYMD === endYMD && endItem.hour === hour) {
        _end = endItem.minute;
      }
      return getPickerOptions(_start, _end);
    },

    // 秒
    getSecondOptions: function (hour, minute, value, start, end) {
      let _start = 0;
      let _end = 59;
      const { dateYMD, startYMD, endYMD, startItem, endItem } =
        this.getStartAndEnd(value, start, end);
      if (
        dateYMD === startYMD &&
        startItem.hour === hour &&
        startItem.minute === minute
      ) {
        _start = startItem.second;
      }
      if (
        dateYMD === endYMD &&
        endItem.hour === hour &&
        endItem.minute === minute
      ) {
        _end = endItem.second;
      }
      return getPickerOptions(_start, _end);
    },

    // 初始化值
    setInitOptions: function () {
      const { value, start, end, mode } = this.properties;
      const m = convertDayjs(value) || getStartMoment(mode);
      const currentValue = m.valueOf();

      const { hour, minute, second } = convertValueToDateItem(currentValue);
      const hourOptions = this.getHourOptions(currentValue, start, end);
      const minuteOptions = this.getMinuteOptions(
        hour,
        currentValue,
        start,
        end
      );
      const secondOptions = this.getSecondOptions(
        hour,
        minute,
        currentValue,
        start,
        end
      );
      const hourIndex = hourOptions.findIndex((d) => d === hour);
      const minuteIndex = minuteOptions.findIndex((d) => d === minute);
      const secondIndex = secondOptions.findIndex((d) => d === second);
      const pickerValue = [hourIndex, minuteIndex, secondIndex];
      this.setData({
        currentValue,
        pickerValue,
        hourOptions,
        minuteOptions,
        secondOptions,
      });
    },
  },
  observers: {
    value: function (value) {
      if (this.data.currentValue && value === this.data.currentValue) return;
      this.setInitOptions();
    },
    'mode,start,end': function () {
      this.setInitOptions();
    },
  },
});
