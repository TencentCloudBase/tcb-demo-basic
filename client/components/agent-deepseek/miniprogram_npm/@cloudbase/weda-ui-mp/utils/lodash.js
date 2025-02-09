// https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L11973
export const isNil = (val) => val == null;

/**
 * 深拷贝
 * @param {*} value 需要拷贝的值
 * @returns {*} 深拷贝后的值
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const newObj = deepClone(obj);
 */
export const deepClone = (value) => {
  const clone = (copiedValue) => {
    for (const key in value) {
      // eslint-disable-next-line no-prototype-builtins
      if (value.hasOwnProperty(key)) {
        copiedValue[key] = deepClone(value[key]);
      }
    }
    return copiedValue;
  };

  const type =
    value === null || value === undefined
      ? 'NullOrUndefined'
      : Object.prototype.toString.call(value).slice(8, -1);

  if (
    [
      'Int8Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'Int16Array',
      'Uint16Array',
      'Int32Array',
      'Uint32Array',
      'Float32Array',
      'Float64Array',
      'BigInt64Array',
      'BigUint64Array',
    ].includes(type)
  ) {
    return value.slice();
  }

  switch (type) {
    case 'Object':
      return clone(Object.create(Object.getPrototypeOf(value)));
    case 'Array':
      return clone([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return new RegExp(
        value.source,
        (value.global ? 'g' : '') +
          (value.ignoreCase ? 'i' : '') +
          (value.multiline ? 'm' : '') +
          (value.sticky ? 'y' : '') +
          (value.unicode ? 'u' : '')
      );
    default:
      return value;
  }
};
