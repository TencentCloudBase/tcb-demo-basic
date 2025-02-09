import { convertLegacyEnum, textToString } from './platform';
import {
  WD_INPUT_LAYOUT,
  WD_INPUT_LABEL_ALIGN,
  WD_DATE_FORMAT,
} from '../utils/enum';
import lodashGet from 'lodash.get';
import dayjs from './dayjs.min.js';
import { isNil } from './lodash';
import { convertDayjs } from './date';

export const MAX_TIME = 86399999;
export const SELECT_ICON_H5 = 'chevronright';
export const ICON_SIZE_MAP = { lg: 'sm', md: 'xs', sm: 'xxs' };
export { convertDayjs };

// 获取开始时间对象
export const getStartMoment = (mode = '', value = null, setDefault = true) => {
  let m = convertDayjs(value);
  if (!m && !setDefault) return m;
  m = m || dayjs();
  switch (mode) {
    case 'year':
      return m.startOf('year');
    case 'month':
      return m.startOf('month');
    case 'day':
      return m.startOf('day');
    case 'datetimeMinute':
    case 'minute':
      return m.startOf('minute');
    case 'second':
    case 'datetime':
      return m.startOf('second');
    default:
      return m;
  }
};
// 获取结束时间对象
export const getEndMoment = (mode = '', value = null) => {
  const m = convertDayjs(value) || dayjs();
  switch (mode) {
    case 'year':
      return m.endOf('year');
    case 'month':
      return m.endOf('month');
    case 'day':
      return m.endOf('day');
    case 'datetimeMinute':
    case 'minute':
      return m.endOf('minute');
    case 'second':
    case 'datetime':
      return m.endOf('second');
    default:
      return m;
  }
};

export const getValueByAddYear = (num = 0) => dayjs().add(num, 'y').valueOf();

// 兼容 size，小程序和h5端不支持size
export const convertSize = (size) => {
  return size === 'xs' ? 'xs' : 'md';
};

// icon 图标大小
export const convertIconSize = (s, map = ICON_SIZE_MAP) => {
  return map[s] || s;
};

// 兼容 layout
export const convertLayout = (layout) => {
  return convertLegacyEnum(layout, WD_INPUT_LAYOUT, 'horizontal');
};

// 兼容 labelAlign
export const convertLabelAlign = (labelAlign) => {
  return convertLegacyEnum(labelAlign, WD_INPUT_LABEL_ALIGN, 'left');
};

// 兼容有前后缀的 rules
export const convertRules = (
  required,
  before,
  after,
  requiredMsg,
  isUnionValue
) => {
  const rules = [];
  const [_before, _after] = [textToString(before), textToString(after)];
  if (required && (_before || _after) && isUnionValue) {
    const reg = `/^(?!(^${_before}${_after}$)).*$/`;
    const rule = { message: requiredMsg, pattern: reg };
    rules.push(rule);
  }
  return rules;
};

// 兼容新旧状态
export const convertStatus = (status, _disabled, _readOnly) => {
  const rawReadOnly = typeof _readOnly === 'boolean' ? _readOnly : !!_disabled;
  const readOnly = status == null ? rawReadOnly : status === 'readOnly';
  const disabled =
    readOnly || (status == null ? !!_disabled : status === 'disabled');
  return { disabled, readOnly };
};

// 输入值添加前后缀，且兼容数字
export const converValueFix = (
  _inputValue,
  _before,
  _after,
  type,
  isUnionValue,
  isConvert = true
) => {
  const [inputValue, before, after] = [_inputValue, _before, _after].map((d) =>
    textToString(d)
  );
  let fixValue = inputValue;
  if (isUnionValue !== false) {
    fixValue = `${before}${inputValue}${after}`;
  }
  if (type && ['number', 'digit'].includes(type) && isConvert) {
    if (fixValue === '') {
      fixValue = null;
    } else {
      const numValue = Number(fixValue);
      fixValue = isNaN(numValue) ? fixValue : numValue;
    }
  }
  return fixValue;
};

// 前后缀值转输入值
export const converInputValue = (_value, _before, _after, isUnionValue) => {
  const [value, before, after] = [_value, _before, _after].map((d) =>
    textToString(d)
  );
  let inputValue = value;
  if (isUnionValue !== false) {
    if (before && inputValue.startsWith(before)) {
      inputValue = inputValue.slice(before.length);
    }
    if (after && inputValue.endsWith(after)) {
      inputValue = inputValue.slice(0, -after.length);
    }
  }
  return inputValue;
};

// 兼容 px 单位
export const convertPx = (val, unit = 'px') => {
  const temp = /^\d+$/.test(`${val}`) ? `${val}${unit}` : val;
  return typeof temp === 'string' ? temp : '';
};

// 转换方法参数 {value} -> str
export const convertMethodParam = (val) => {
  const methodValue = lodashGet(val, 'value');
  return methodValue !== undefined ? methodValue : val;
};

/** 日期时间 */

// IDate 对象转 value
export const convertDateItemToValue = (param = {}, fixMonth = true) => {
  const { year, month, day, hour, minute, second, millisecond } = param;
  const current = new Date(year, month, day, hour, minute, second, millisecond);
  const currentValue = isNaN(current) ? null : current.valueOf();
  if (!fixMonth || currentValue == null) return currentValue;
  const { day: maxDay } = convertValueToDateItem(
    dayjs(`${year}`).month(month).endOf?.('month')
  );
  const maxValue = convertDateItemToValue({ ...param, day: maxDay }, false);
  return currentValue > maxValue ? maxValue : currentValue;
};

// value 转 IDate 对象
export const convertValueToDateItem = (v) => {
  const m = convertDayjs(v) || getStartMoment('day');
  const [year, month, day, hour, minute, second, millisecond] = [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute(),
    m.second(),
    m.millisecond(),
  ];
  return { year, month, day, hour, minute, second, millisecond };
};

// 补齐月天前面的 0
export const getFullDay = (v) => (v < 10 ? `0${v}` : `${v}`);

// 非标准的年月日，仅用来对比
export const getYMD = (item) => `${item.year}-${item.month}-${item.day}`;

// 选项值是否存在
export const getExistIndex = (value, options) => {
  let index = options.findIndex((d) => d === value);
  index = index < 0 ? 0 : index;
  return index;
};

const getWeek = (_year, _month) => {
  const CALENDAR_DAYS = 42;
  const firstDate = new Date(_year, _month, 1);
  const lastDate = new Date(_year, _month + 1, 0);
  const firstWeekDay = firstDate.getDay();
  const count = lastDate.getDate();
  const year = firstDate.getFullYear();
  const month = firstDate.getMonth();
  const days = Array.from({ length: count }).map((d, i) => ({
    day: i + 1,
    year,
    month,
  }));
  return {
    count,
    preMiss: firstWeekDay,
    nextMiss: CALENDAR_DAYS - count - firstWeekDay,
    year,
    month,
    days,
  };
};

// h5端 日历格式，month 从 0 开始
export const convertYearMonthToWeeks = (year, month, range, config) => {
  const { preMiss, nextMiss, days: monthDays } = getWeek(year, month);
  let preDays = Array.from({ length: preMiss }).map(() => ({}));
  let nextDays = Array.from({ length: nextMiss }).map(() => ({}));
  // 补齐前后月份
  if (typeof config === 'object' && config?.isPreNext) {
    if (preMiss) {
      preDays = getWeek(year, month - 1)
        .days.map((item) => ({ ...item, isPre: true }))
        .slice(-preMiss);
    }
    if (nextMiss) {
      nextDays = getWeek(year, month + 1)
        .days.map((item) => ({ ...item, isNext: true }))
        .slice(0, nextMiss);
    }
  }
  // 不固定 6*7
  if (typeof config === 'object' && config?.isDynamic && nextDays.length >= 7) {
    nextDays = nextDays.slice(0, -7);
  }
  let days = [].concat(preDays, monthDays, nextDays);
  // 添加禁用
  const start =
    Array.isArray(range) && convertDayjs(range[0])?.startOf('day').valueOf();
  const end =
    Array.isArray(range) && convertDayjs(range[1])?.endOf('day').valueOf();
  days = days.map((item) => {
    const { year, month, day } = item;
    if (!day) {
      return { ...item, day: '', disabled: true, ymd: null };
    }
    const timestamp = new Date(year, month, day).valueOf();
    const disabled =
      (start && timestamp < start) || (end && timestamp > end) ? true : false;
    const ymd = getYMD(item);
    return { ...item, disabled, ymd };
  });
  // 二维数组
  const rows = Math.ceil(days.length / 7);
  return Array.from({ length: rows }).map((d, i) =>
    days.slice(i * 7, (i + 1) * 7)
  );
};

// 获取时分秒选项
export const getPickerOptions = (start, end) =>
  Array.from({ length: end - start + 1 }).map((d, i) => start + i);

// 兼容 format
export const convertDateFormat = (mode, dateFormat) => {
  let format = '';
  const formatValue = WD_DATE_FORMAT.find((item) => item.value === dateFormat);
  switch (mode) {
    case 'year':
      format = formatValue?.year || 'YYYY';
      break;
    case 'month': {
      format = formatValue?.month || 'YYYY-MM';
      break;
    }
    case 'day':
      format = formatValue?.day || 'YYYY-MM-DD';
      break;
    case 'datetimeMinute':
      format = formatValue?.datetimeMinute || 'YYYY-MM-DD HH:mm';
      break;
    case 'datetime':
      format = dateFormat || 'YYYY-MM-DD HH:mm:ss';
      break;
    case 'minute':
      format = 'HH:mm';
      break;
    case 'second':
      format = 'HH:mm:ss';
      break;
    default:
      format = '';
  }
  return format;
};

// 是否可选
export const isDateInRange = (_value, _start, _end, _format) => {
  let inRange = true;
  let message = '';
  const [value, start, end] = [_value, _start, _end].map((d) =>
    convertDayjs(d)?.valueOf()
  );
  const format = _format || 'YYYY-MM-DD HH:mm:ss';
  if ((!isNil(start) && value < start) || (!isNil(end) && value > end)) {
    inRange = false;
    const startDate = convertDayjs(start)?.format(format) || '--';
    const endDate = convertDayjs(end)?.format(format) || '--';
    message = `可选范围：${startDate} ~ ${endDate}`;
  }
  return [inRange, message];
};

// 时间戳毫秒数
const diffTime = (val) => {
  const currentTime = convertDayjs(val)?.startOf('second').valueOf();
  const currentDate = convertDayjs(val)?.startOf('day').valueOf();
  return currentTime - currentDate;
};

// 将任意输入转成毫秒数, 兼容 number / HH:mm[:ss] / 时间戳 / dayjs
export const convertTimeValue = (value) => {
  let time = null;
  if (typeof value === 'number') {
    if (value <= MAX_TIME) {
      time = value;
    } else {
      time = diffTime(value);
    }
  } else if (typeof value === 'string') {
    const match = value.match(/(\d{2}):(\d{2}):?(\d{2})?/);
    if (match) {
      const [yes, hour = 0, minute = 0, second = 0] = match;
      if (
        yes &&
        Number(hour) < 24 &&
        Number(minute) < 60 &&
        Number(second) < 60
      ) {
        const date = getStartMoment('day')
          .hour(hour)
          .minute(minute)
          .second(second);
        time = diffTime(date);
      }
    }
  } else if (dayjs.isDayjs(value)) {
    time = diffTime(value);
  }
  return time;
};

// 将毫秒数转成 dayjs 类型
export const convertTimeToMoment = (value) => {
  if (value == null) return null;
  const time = convertTimeValue(value);
  const m = getStartMoment('day').add(time, 'millisecond');
  return m;
};

// 存在范围时，获取范围内的初始时间
export const convertTimePickerValue = function (_value, _start, _end, mode) {
  let value = (convertTimeToMoment(_value) || getStartMoment(mode)).valueOf();
  const start = convertTimeToMoment(_start)?.valueOf();
  const end = convertTimeToMoment(_end)?.valueOf();

  if (start && start > value) {
    value = start;
  } else if (end < value) {
    value = end;
  }

  return value;
};

// 区分不同端的前后缀图标，比如下拉选择
export const convertFixedIcon = (type, icon, iconH5) => {
  let [typeTemp, iconTemp] = [type, icon];
  if (type === 'fixed') {
    typeTemp = 'inner';
    iconTemp = iconH5;
  }
  return [typeTemp, iconTemp];
};
