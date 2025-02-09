import { REL_DICT } from './constant';
import { errorHandler } from './error';
/**
 * 文件字节转换
 */
export const transSize = (size) => {
  const b = parseInt(size) || 0;
  const getBig = (d) => Math.ceil(d / 1024) || 0;
  if (b < 1024) {
    return `${size}B`;
  }
  const k = getBig(size);
  if (k < 1024) {
    return `${k}K`;
  }
  const m = getBig(k);
  if (m < 1024) {
    return `${m}M`;
  }
  const g = getBig(m);
  return `${g}G`;
};

/**
 * 判断是否是url
 */
const reg =
  // eslint-disable-next-line no-useless-escape
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path) => reg.test(path);

/**
 * 根据编辑器传入数据筛选条件，转换接口参数条件
 */
export const getWhereList = (where) => {
  try {
    let resultList = [];
    let groupLogic = {};
    let firstGroupLogicTyp = 'and';
    let groupLogicList = [];
    if (Array.isArray(where) && where?.length) {
      groupLogicList = where.map((item1, index1) => {
        let item1Result = {};
        let item1ResultList = [];
        let secondGroupLogicTyp = 'and';
        if (index1 === 1) {
          // 每组之间统一取且/或，只有一组 groupLogic 默认值为 null
          firstGroupLogicTyp = item1?.groupLogic;
        }
        if (Array.isArray(item1?.logicData)) {
          item1?.logicData.forEach((item2, index2) => {
            let item2Result = {};
            let rule = {};
            if (index2 === 1) {
              // 每组之间统一取且/或，只有一组 groupLogic 默认值为 null
              secondGroupLogicTyp = item2?.logic;
            }
            let [rel, val] = [REL_DICT[item2?.rel] || item2?.rel, item2?.value];
            // 去掉空字符串、undefined(接口不支持)、对象类型(接口不支持)
            if (
              val === '' ||
              val === undefined ||
              Object.prototype.toString.call(val) === '[object Object]'
            ) {
              return;
            }
            if ('_begin_with' === rel) {
              rel = 'regex';
              val = `^${val}`;
            }
            if ('_exclude' === rel) {
              rel = 'nsearch';
            }
            rule['$' + rel] = val;
            item2Result[item2?.key] = rule;
            item1ResultList.push(item2Result);
          });
        }

        item1Result['$' + secondGroupLogicTyp] = item1ResultList;

        return item1Result;
      });
      groupLogic['$' + firstGroupLogicTyp] = groupLogicList;
      resultList.push(groupLogic);
      return resultList;
    }
    return [];
  } catch (error) {
    errorHandler({
      code: 'GetWhereListError',
      error,
    });
    return [];
  }
};

/**
 * 生成随机数
 */
export const randomStr = (len = 32) => {
  const s = [];
  const hexDigits = '0123456789abcdef';
  const dictLen = hexDigits.length;
  for (var i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * dictLen);
    s[i] = hexDigits[index];
  }
  const result = s.join('');
  return result;
};

/**
 * 转换枚举值
 */
export const convertLegacyEnum = (prop, enumObj, defaultValue) => {
  const enumValue = enumObj.map((i) => i.value).includes(prop)
    ? prop
    : enumObj[0].value;
  if (defaultValue !== undefined) return enumValue || defaultValue;
  return enumValue;
};

/**
 * 对象序列化
 */
export const getParseValue = (v) => {
  let result = v;
  try {
    result = v && JSON.parse(JSON.stringify(v));
  } catch (e) {}
  return result;
};

export const textToString = (text) => {
  if (typeof text === 'string') return text;
  let str = String(text);
  // 字符串的类型不做强制转换
  if (['undefined', 'null', 'Infinity', 'NaN'].includes(str)) {
    return '';
  }
  return str;
};

// 日期时间提交值转数字
export const dateValueFormat = (v) => {
  return typeof v === 'number' ? v : null;
};

// 兼容单选多选值类型，上传图片/上传文件
export const convertSingleValue = (value, single) => {
  let v = value;
  if (value !== null) {
    if (single && typeof value !== 'string') {
      v = null;
    } else if (!single && !Array.isArray(value)) {
      v = [];
    }
  }
  return v;
};
