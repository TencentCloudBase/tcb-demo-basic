import { convertDayjs, getStartMoment } from '../../../utils/getFormLegacy.js';
import { WD_PREFIX } from '../../../utils/constant';

/**
 * 日期时间弹窗选择器
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
    okText: {
      type: String,
      value: '确定',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    maskClosable: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    classPrefix: WD_PREFIX,
    dateOrTime: 'date',
    dateDisplay: '',
    timeDisplay: '',
    currentValue: null, // 当前值，默认当天
  },
  methods: {
    setDate: function () {
      this.setData({ dateOrTime: 'date' });
    },
    setTime: function () {
      this.setData({ dateOrTime: 'time' });
    },

    handleChange: function (e) {
      const value = e.detail.value;
      this.setData({ currentValue: value });
    },

    // 取消
    handleClose: function () {
      this.triggerEvent('onClose', { value: this.data.currentValue });
    },

    // 取消空白处
    handleCloseMask: function () {
      if (this.properties.maskClosable) {
        this.handleClose;
      }
    },

    // 确认
    handleOk: function () {
      try {
        const calendarRef = this.selectComponent('#wd-date-day');
        if (
          this.properties.mode === 'day' &&
          calendarRef?.data?.showMode === 'month' &&
          calendarRef?.handleClickMode
        ) {
          calendarRef.handleClickMode();
          return;
        }
        this.triggerEvent('onOk', { value: this.data.currentValue });
      } catch (e) {}
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
      const timeFormat =
        this.properties.mode === 'datetimeMinute' ? 'HH:mm' : 'HH:mm:ss';
      const dateDisplay = m.format('YYYY-MM-DD');
      const timeDisplay = m.format(timeFormat);
      this.setData({ dateDisplay, timeDisplay });
    },
  },
  lifetimes: {},
});
