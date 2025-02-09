import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import {
  isDateInRange,
  getValueByAddYear,
  getStartMoment,
  getEndMoment,
  convertDateFormat,
} from '../../utils/getFormLegacy.js';
import {
  isDateNil,
  convertStartEndValue,
  convertDateRangeToString,
  YEAR_START,
  YEAR_END,
} from '../../utils/date';

/**
 * 日期区间
 */
Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'date-range',
    },
    mode: {
      type: String,
      value: 'day',
    },
  },
  data: {
    pickerVisible: false,
    step: 'start',
    readValue: '',
    valueDisplay: [],
    _value: [],
    _format: '',
    _start: null,
    _end: null,
  },
  methods: {
    updateWidgetAPI: function () {
      const {
        name,
        value,
        label,
        required,
        pickerVisible,
        disabled,
        readOnly,
        before,
        after,
      } = this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        pickerVisible,
        disabled,
        readOnly,
        before,
        after,
      });
    },

    // 清空
    handleClear: function () {
      this.setData({ value: null });
      this.triggerEvent('change', { value: null });
    },

    // 打开
    handleOpen: function () {
      if (this.data.disabled) return;
      this.setData({ step: 'start', pickerVisible: true });
    },

    // 取消
    handleCancel: function () {
      this.setData({
        _value: this.properties.value,
        step: 'start',
        pickerVisible: false,
      });
    },

    // 下一步
    handleNext: function (e) {
      const v = e.detail.value;
      const { _value } = this.data;
      if (!this.verifyRange(v)) return;
      this.setData({ _value: [v, _value?.[1]], step: 'end' });
    },

    // 上一步
    handlePre: function (e) {
      const v = e.detail.value;
      const { _value } = this.data;
      if (!this.verifyRange(v)) return;
      this.setData({ _value: [_value?.[0], v], step: 'start' });
    },

    // 确定，自动转换前后值
    handleChange: function (e) {
      const v = e.detail.value;
      const { _value } = this.data;
      const { mode } = this.properties;
      if (!this.verifyRange(v)) return;
      const standardValue = [_value?.[0], v].map((d) =>
        getStartMoment(mode, d, false)
      );
      const value = convertStartEndValue(standardValue);
      this.setData({ value, step: 'start', pickerVisible: false });
      this.triggerEvent('change', { value });
    },

    // 校验开始/结束范围
    verifyRange: function (v) {
      const { _start, _end, _format } = this.data;
      const [inRange, content] = isDateInRange(v, _start, _end, _format);
      if (!inRange) {
        wx.showModal?.({
          title: '提示',
          content,
          showCancel: false,
          icon: 'none',
        });
      }
      return inRange;
    },

    // 初始化传入属性
    setConvertedData: function () {
      const { start, end, mode, value } = this.properties;
      const _format = convertDateFormat(mode);
      const _startDefault = isDateNil(start)
        ? getValueByAddYear(YEAR_START)
        : start;
      const _endDefault = isDateNil(end) ? getValueByAddYear(YEAR_END) : end;
      const _start = getStartMoment(mode, _startDefault).valueOf();
      const _end = getEndMoment(mode, _endDefault).valueOf();
      const readValue = convertDateRangeToString(value, _format)?.join(' - ');
      const _value = Array.isArray(value) ? value : [];
      this.setData({ _start, _end, _format, _value, readValue });
    },
  },
  observers: {
    'name, value, label, required, pickerVisible, disabled, readOnly, before, after':
      function () {
        this.updateWidgetAPI();
      },
    'value,start,end,mode': function () {
      this.setConvertedData();
    },
    _value: function (_value) {
      const { _format } = this.data;
      const valueDisplay = convertDateRangeToString(_value, _format) || [];
      this.setData({ valueDisplay });
    },
  },
  lifetimes: {
    attached: function () {
      this.setConvertedData();
      this.updateWidgetAPI();
    },
  },
});
