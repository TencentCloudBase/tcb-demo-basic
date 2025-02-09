import {
  getStartMoment,
  convertValueToDateItem,
  getYMD,
  convertYearMonthToWeeks,
} from '../../utils/getFormLegacy';

export const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];
export const BLOCK_NAME = 'weda-calendar';

// 配置数组转配置对象
export const getConfigDataObj = (configData) => {
  if (!Array.isArray(configData)) return;
  const obj = {};
  configData.forEach((item) => {
    if (Object.prototype.toString.call(item) === '[object Object]') {
      const disabled = [true, 'true'].includes(item.disabled) ? true : false;
      const value = getStartMoment('day', item.matchDate, false);
      const dateItem = value ? convertValueToDateItem(value) : {};
      const YMD = getYMD(dateItem);
      obj[YMD] = { ...item, disabled };
    }
  });
  return obj;
};

// 带上外部配置，转星期
export const convertWeeks = (year, month, configDataObj) => {
  const weeks = convertYearMonthToWeeks(year, month, null, {
    isPreNext: true,
    isDynamic: true,
  });
  if (!configDataObj || Object.keys(configDataObj).length === 0) return weeks;
  return weeks.map((row) => {
    return row.map((item) => {
      const YMD = getYMD(item);
      const config = configDataObj[YMD];
      return { ...item, ...config };
    });
  });
};
