import dayjs from './dayjs.min.js';
import { errorHandler } from './error.js';
export const isDateNil = (v) => v === '' || v == null;

// 将时间值转 dayjs 类型
export const convertDayjs = (val) => {
  if (val == null) return null;
  let m = null;
  try {
    m = dayjs(val);
    if (Object.prototype.hasOwnProperty.call(val, '$date')) {
      m = dayjs(val.$date);
    }
    if (!m?.isValid()) return null;
  } catch (e) {
    console.warn('[function convertDayjs]: ', e);
    errorHandler({
      code: 'ConvertDayjsError',
      error: e,
    });
  }
  return m;
};

const getDateValue = (val) => convertDayjs(val)?.valueOf() ?? null;
const getDateStr = (val, format) => convertDayjs(val)?.format(format) || '';

// 任意转数字数组或 null
export function convertDateRangToNumber(data) {
  if (data == null || !Array.isArray(data)) return null;
  return [getDateValue(data[0]), getDateValue(data[1])];
}

// 任意转字符串数组或 null
export function convertDateRangeToString(data, format) {
  if (data == null || !Array.isArray(data)) return null;
  return [getDateStr(data[0], format), getDateStr(data[1], format)];
}

// PC 日期区间后值不小于前值
export function convertStartEndValue(data, setMoment) {
  if (data == null || !Array.isArray(data)) return null;
  let value = convertDateRangToNumber(data);
  if (value[1] < value[0]) {
    value = [value[1], value[0]];
  }
  if (setMoment) {
    value = value.map((d) => convertDayjs(d));
  }
  return value;
}

export const YEAR_START = -100;
export const YEAR_END = 100;
