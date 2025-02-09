/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * 两正数字符串比较
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
const comparePositive = (v1, v2) => {
  const v1Split = `${v1}`.split('.');
  const v2Split = `${v2}`.split('.');
  // 整数部分长度不等，长的大
  if (v1Split[0].length !== v2Split[0].length) {
    return v1Split[0].length > v2Split[0].length ? 'gt' : 'lt';
  }
  // 整数部分长度相等，且不相同，则从高位往低位比较
  if (v1Split[0] !== v2Split[0]) {
    for (let i = 0; i < v1Split[0].length; i++) {
      if (v1Split[0][i] !== v2Split[0][i]) {
        return +v1Split[0][i] > +v2Split[0][i] ? 'gt' : 'lt';
      }
    }
  }
  // 整数部分相等，比较小数部分
  const len = Math.max(v1Split[1]?.length || 0, v2Split[1]?.length || 0);
  for (let i = 0; i < len; i++) {
    const v1Float = v1Split[1]?.[i] || 0;
    const v2Float = v2Split[1]?.[i] || 0;
    if (v1Float !== v2Float) {
      return +v1Float > +v2Float ? 'gt' : 'lt';
    }
  }

  return 'eq';
};
/**
 * 数字字符串比较
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
const compareStrNum = (v1, v2) => {
  v1 = `${v1}`;
  v2 = `${v2}`;
  // 负数 < 正数
  if (v1.startsWith('-') && !v2.startsWith('-')) {
    return 'lt';
  }
  // 正数 > 负数
  if (!v1.startsWith('-') && v2.startsWith('-')) {
    return 'gt';
  }
  // 两正数
  if (!v1.startsWith('-') && !v2.startsWith('-')) {
    return comparePositive(v1, v2);
  }
  // 两负数
  if (v1.startsWith('-') && v2.startsWith('-')) {
    return {
      lt: 'gt',
      gt: 'lt',
      eq: 'eq',
    }[comparePositive(v1.replace('-', ''), v2.replace('-', ''))];
  }
};
/**
 * 两正数字符串相减
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
const strNumMinusPositive = (v1, v2) => {
  const v1Split = `${v1}`.split('.');
  const v2Split = `${v2}`.split('.');

  const v1Float = v1Split[1] || '';
  const v2Float = v2Split[1] || '';
  const maxFloatLen = Math.max(v1Float.length, v2Float.length);
  let add = 0;
  let res = '';

  if (maxFloatLen > 0) {
    for (let i = maxFloatLen - 1; i >= 0; i--) {
      let temp = (+v1Float[i] || 0) - (+v2Float[i] || 0) + add;
      if (temp < 0) {
        temp = 10 + temp;
        add = -1;
      } else {
        add = 0;
      }
      res = `${temp}${res}`;
    }

    res = `.${res}`;
  }

  v1 = v1Split[0].split('').reverse();
  v2 = v2Split[0].split('').reverse();
  const maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    let temp = (+v1[i] || 0) - (+v2[i] || 0) + add;

    if (temp < 0) {
      temp = 10 + temp;
      add = -1;
    } else {
      add = 0;
    }
    res = `${temp}${res}`;
  }

  res = res.replace(/^0+/, '');

  return res.startsWith('.') ? `0${res}` : res;
};

export const isNumber = (val) => typeof val === 'number' && !isNaN(val);

export const getPercentUnit = (format) => ({ percent: '%' }[format] ?? '');
/**
 * 数字字符串相加
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
export const strNumPlus = (v1, v2) => {
  const v1Split = `${v1}`.split('.');
  const v2Split = `${v2}`.split('.');

  const v1Float = v1Split[1] || '';
  const v2Float = v2Split[1] || '';
  const maxFloatLen = Math.max(v1Float.length, v2Float.length);
  let add = 0;
  let res = '';

  if (maxFloatLen > 0) {
    for (let i = maxFloatLen - 1; i >= 0; i--) {
      const temp = (+v1Float[i] || 0) + (+v2Float[i] || 0) + add;
      res = `${temp % 10}${res}`;
      add = Math.floor(temp / 10);
    }

    res = `.${res}`;
  }

  v1 = v1Split[0].split('').reverse();
  v2 = v2Split[0].split('').reverse();
  const maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    const temp = (+v1[i] || 0) + (+v2[i] || 0) + add;

    res = `${temp % 10}${res}`;
    add = Math.floor(temp / 10);
  }

  res = `${add !== 0 ? add : ''}${res}`;
  return res.startsWith('.') ? `0${res}` : res;
};
/**
 * 数字字符串相减
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
export const strNumMinus = (v1, v2) => {
  let res = '';
  // 负数 - 正数
  if (v1.startsWith('-') && !v2.startsWith('-')) {
    res = `-${strNumPlus(v1.replace('-', ''), v2)}`;
  }
  // 正数 - 负数
  if (!v1.startsWith('-') && v2.startsWith('-')) {
    res = `${strNumPlus(v1, v2.replace('-', ''))}`;
  }
  // 正数 - 正数
  if (!v1.startsWith('-') && !v2.startsWith('-')) {
    const compare = compareStrNum(v1, v2);
    if (compare === 'eq') return '0';

    res =
      compare === 'gt'
        ? strNumMinusPositive(v1, v2)
        : `-${strNumMinusPositive(v2, v1)}`;
  }
  // 负数 - 负数 转成 正数 - 正数
  if (v1.startsWith('-') && v2.startsWith('-')) {
    res = strNumMinus(v2.replace('-', ''), v1.replace('-', ''));
  }

  return res.startsWith('.') ? `0${res}` : res;
};
/**
 * 处理百分比
 * @param {*} v
 * @param {*} type
 * @returns
 */
export const dealPercent = (v, type = 'add') => {
  if (v === 'Infinity' || v == '-Infinity') {
    return v;
  }

  let value = `${`${v}`.replace(/-/g, '')}`;

  if (type === 'add') {
    if (!/\./.test(`${value}`)) {
      value = `${value}00`;
    } else {
      const valueSplit = value.split('.');
      value = `${valueSplit[0]}${valueSplit[1].slice(0, 2)}${
        valueSplit[1].length <= 1 ? '0' : ''
      }.${valueSplit[1].slice(2)}`;
    }
  }

  if (type === 'del') {
    if (!/\./.test(`${value}`)) {
      const len = `${value}`.length;
      value = `${value.slice(0, -2)}${
        len < 2 ? new Array(2 - len).fill(0).join('') : ''
      }.${len <= 1 ? '0' : ''}${value.slice(-2)}`;
    } else {
      const valueSplit = value.split('.');
      value = `${valueSplit[0].slice(0, -2)}.${
        valueSplit[0].length <= 1 ? '0' : ''
      }${valueSplit[0].slice(-2)}${valueSplit[1]}`;
    }
  }

  value = value.startsWith('.') ? `0${value}` : value;

  return `${`${v}`.startsWith('-') ? '-' : ''}${value}`;
};
/**
 * 小数位处理
 * @param {*} v
 * @param {*} decimals
 * @param {*} type
 * @returns
 */
export const dealDecimals = (v, decimals, type) => {
  if (v === 'Infinity' || v === '-Infinity') {
    return v;
  }
  let value = v;

  if (type === 'percent') {
    value = dealPercent(value, 'add');
  } else if (type === 'delPercent') {
    value = dealPercent(value, 'del');
  }

  if (isNumber(decimals) && decimals >= 0) {
    if (!/\./.test(`${value}`)) {
      value = `${value}.${new Array(decimals).fill(0).join('')}`;
    } else {
      const len = decimals - (`${value}`.split('.')[1]?.length || 0);
      if (len < 0) {
        const res = `${value}`.slice(0, len);
        if (+`${value}`.slice(len)[0] >= 5) {
          const minus =
            decimals >= 1
              ? `0.${new Array(decimals - 1).fill(0).join('')}1`
              : '1';
          value = strNumPlus(res, minus).replace(/\.$/, '');
        } else {
          value = res.replace(/\.$/, '');
        }
      } else {
        value = `${value}${new Array(len).fill(0).join('')}`;
      }
    }
  }

  value = value !== '0' ? value.replace(/^0+/, '') : value;
  value = value.startsWith('.') ? `0${value}` : value;
  value = value.endsWith('.') ? value.split('.')[0] : value;

  return value;
};
/**
 * 数字字符串相加
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
export const strNumAddCalc = (v1, v2) => {
  let res = '';
  // 负数 + 正数
  if (v1.startsWith('-') && !v2.startsWith('-')) {
    res = `${strNumMinus(v2, v1.replace('-', ''))}`;
  }
  // 正数 + 负数
  if (!v1.startsWith('-') && v2.startsWith('-')) {
    res = `${strNumMinus(v1, v2.replace('-', ''))}`;
  }
  // 正数 + 正数
  if (!v1.startsWith('-') && !v2.startsWith('-')) {
    res = `${strNumPlus(v1, v2)}`;
  }
  // 负数 + 负数 转成 正数 + 正数
  if (v1.startsWith('-') && v2.startsWith('-')) {
    res = `-${strNumPlus(v2.replace('-', ''), v1.replace('-', ''))}`;
  }

  return res.startsWith('.') ? `0${res}` : res;
};
