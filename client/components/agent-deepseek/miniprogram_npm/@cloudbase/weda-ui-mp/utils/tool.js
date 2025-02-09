import { getWedaAPI } from './getWedaApi';
/**
 * 数组转对象，用于遍历
 */
export const isObj = (v) =>
  Object.prototype.toString.call(v) === '[object Object]';
export const isObjHasProp = (obj, prop) =>
  isObj(obj) && Object.prototype.hasOwnProperty.call(obj, prop);
// 小程序用 对象替代 Map
export const arrayToMap = (list, valueProp = 'value', labelProp) => {
  const map = {};
  Array.isArray(list) &&
    list.forEach((item) => {
      if (isObjHasProp(item, valueProp)) {
        const key = item[valueProp];
        const value = labelProp ? item[labelProp] : item;
        map[key] = value;
      }
    });
  return map;
};
export const safeObj = (v) => {
  return isObj(v) ? v : {};
};

// value 提取 item/label
export const getSelected = (itemMap, value, multiple) => {
  let selectedItem, selectedLabel;
  if (value == null) {
    selectedItem = selectedLabel = null;
  } else {
    if (multiple) {
      selectedItem = Array.isArray(value) ? value.map((d) => itemMap[d]) : null;
      selectedLabel = Array.isArray(value)
        ? value.map((d) => itemMap[d]?.label)
        : null;
    } else {
      selectedItem = itemMap[value];
      selectedLabel = itemMap[value]?.label;
    }
  }
  return { selectedItem, selectedLabel };
};

export const getQuery = (path) => {
  const params = {};

  path
    ?.split(/(?:\?|#)+/)?.[1]
    ?.match(/([^&=]+)=?([^&]*)/g)
    ?.forEach((v) => {
      const [key, value] = v.split('=');
      params[key] = value;
    });

  return params;
};

/**
 * 判断菜单的query是否和当前页面的query一致
 * @param path
 * @returns
 */
export const judgeMenuPathAndCurrentPath = (path) => {
  const { app } = getWedaAPI();
  const { $w } = app?.__internal__ || {};
  const query = $w?.page.dataset.params || {};

  const menuQuery = getQuery(path);
  return Object.keys(menuQuery).reduce(
    (res, v) => res && menuQuery[v] === query[v],
    true
  );
};
