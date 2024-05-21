import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import {
  convertTimeValue,
  convertDateFormat,
  convertTimeToMoment,
  MAX_TIME,
  isDateInRange,
  convertTimePickerValue,
} from '../../utils/getFormLegacy.js';

/**
 * 标准化：时间
 */
Component({
  options: { virtualHost: true, pureDataPattern: /^pickerValueRef$/ },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'time',
    },
    mode: {
      type: String,
      value: 'minute',
    },
  },
  data: {
    pickerVisible: false,
    pickerValue: null,
    pickerValueRef: null,
    readValue: '',
    _format: '',
    _start: convertTimeToMoment(0).valueOf(),
    _end: convertTimeToMoment(MAX_TIME).valueOf(),
    _mode: 'datetimeMinute',
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
        before,
        after,
      } = this.data;
      this.setReadonlyAttributes?.({
        name,
        value,
        label,
        required,
        visible,
        disabled,
        readOnly,
        before,
        after,
      });
    },
    setPickerVisible: function () {
      if (this.data.disabled) return;
      this.setData({
        pickerVisible: true,
        pickerValueRef: this.data.pickerValue,
      });
    },
    handleClose: function () {
      this.setData({ pickerVisible: false });
    },
    handleOk: function () {
      const { _start, _end, _format } = this.data;
      const temp = this.data.pickerValueRef;
      const [inRange, title] = isDateInRange(temp, _start, _end, _format);
      if (!inRange) {
        wx.showToast?.({ title, icon: 'none', duration: 2000 });
        return;
      }
      const value = convertTimeValue(temp);
      this.setData({ value, pickerVisible: false });
      this.triggerEvent('change', { value });
    },
    handleClear: function () {
      this.setData({ value: null });
      this.triggerEvent('change', { value: null });
    },
    handleChange: function (e) {
      const pickerValueRef = e.detail.value;
      this.setData({ pickerValueRef });
    },
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after':
      function () {
        this.updateWidgetAPI();
      },
    'value,mode,start,end': function (value, mode, start, end) {
      const _format = convertDateFormat(mode);
      const _start = convertTimeToMoment(start || 0).valueOf();
      const _end = convertTimeToMoment(end || MAX_TIME).valueOf();
      const pickerValue = convertTimePickerValue(value, _start, _end, mode);
      const m = convertTimeToMoment(value);
      const readValue = m?.format(_format) || '';
      const _mode = mode !== 'second' ? 'datetimeMinute' : '';
      this.setData({
        _format,
        _mode,
        _start,
        _end,
        readValue,
        pickerValue,
        pickerValueRef: pickerValue,
      });
    },
  },
  lifetimes: {
    attached: function () {
      this.updateWidgetAPI();
    },
  },
});
