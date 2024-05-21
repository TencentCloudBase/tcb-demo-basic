/* eslint-disable @typescript-eslint/no-magic-numbers */
import { commonCompBehavior } from '../../utils/common-behavior';
import formFieldBehavior from '../form-field-behavior/form-field-behavior';
import itemBehavior from '../form-field-behavior/item-behavior';
import {
  convertDateFormat,
  convertDayjs,
  isDateInRange,
  getValueByAddYear,
  getStartMoment,
  getEndMoment,
} from '../../utils/getFormLegacy.js';
import equal from '../../utils/deepEqual';
import { isDateNil } from '../../utils/date';

/**
 * 标准化：日期时间
 */
Component({
  options: { virtualHost: true },
  behaviors: [itemBehavior, commonCompBehavior, formFieldBehavior],
  properties: {
    classRoot: {
      type: String,
      value: 'date',
    },
  },
  data: {
    pickerVisible: false,
    readValue: '',
    _format: '',
    _start: null,
    _end: null,
    _oldDateValue: null,
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
      this.setData({ pickerVisible: true });
    },

    handleClose: function () {
      this.setData({ pickerVisible: false });
    },

    handleOk: function (e) {
      const { _start, _end, _format } = this.data;
      const value = e.detail.value;
      const [inRange, content] = isDateInRange(value, _start, _end, _format);
      if (!inRange) {
        wx.showModal?.({ title: '提示', content, showCancel: false });
        return;
      }
      this.setData({ value, pickerVisible: false });
      this.triggerEvent('change', { value });
    },

    handleClear: function () {
      this.setData({ value: null });
      this.triggerEvent('change', { value: null });
    },

    setStartEnd: function () {
      const { start, end, mode } = this.properties;
      const _startDefault = isDateNil(start) ? getValueByAddYear(-100) : start;
      const _endDefault = isDateNil(end) ? getValueByAddYear(100) : end;
      const _start = getStartMoment(mode, _startDefault).valueOf();
      const _end = getEndMoment(mode, _endDefault).valueOf();
      this.setData({ _start, _end });
    },
  },
  observers: {
    'name, value, label, required, visible, disabled, readOnly, before, after':
      function () {
        this.updateWidgetAPI();
      },
    'value,mode,dateFormat': function (value, mode, dateFormat) {
      const _format = convertDateFormat(mode);
      const formatDisplay = convertDateFormat(mode, dateFormat);
      const readValue = convertDayjs(value)?.format(formatDisplay) || '';
      this.setData({ readValue, _format });
    },
    'start,end,mode': function () {
      this.setStartEnd();
    },
    // 监听 value 并转成时间戳
    value: function (value) {
      if (
        equal(this.data._oldDateValue, value) ||
        typeof value === 'number' ||
        value == null
      )
        return;
      const timestamp = convertDayjs(value)?.valueOf() ?? null;
      this.setData({ value: timestamp, _oldDateValue: timestamp });
    },
  },
  lifetimes: {
    attached: function () {
      this.setStartEnd();
      this.updateWidgetAPI();
    },
  },
});
