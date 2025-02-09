/* eslint-disable @typescript-eslint/no-magic-numbers */

import { deepClone } from '../../utils/lodash';

// 获取选中项
export const getSelectedOptions = (data, value) => {
  for (const i of data) {
    if (i.value === value) return i;
    if (i.children) {
      const res = getSelectedOptions(i.children, value);
      if (res) return res;
    }
  }
};

// 组装tab数据
export const transformTabData = (data, pid = 'root', level = 0) => {
  if (!Array.isArray(data)) return [];
  return data.map((_item) => {
    const item = deepClone(_item);
    if (item.children) {
      item.children = transformTabData(item.children, item.value, level + 1);
    }
    return { ...item, level, selected: false, pid };
  });
};
// 设置选中值
export const setSelectedValue = (data, value) => {
  if (!Array.isArray(data)) return [];
  const _value = [].concat(value);
  return data
    .map((item) => {
      if (!item) return null;
      item.selected = !!_value.find((i) => i === item?.value);
      if (item.children) {
        item.children = setSelectedValue(item.children, value);
      }
      return { ...item };
    })
    .filter((i) => i);
};

export const initTabData = (data, value, placeholderItem) => {
  if (!Array.isArray(data)) return [];
  let tabDataRes = [placeholderItem];
  const selectedOptions =
    value?.map((i) => getSelectedOptions(data, i)).filter((i) => i) || [];
  if (value.length && selectedOptions.length) {
    const selectedItem = selectedOptions[selectedOptions.length - 1];

    tabDataRes = setSelectedValue(selectedOptions, selectedItem?.value);
  }
  return tabDataRes;
};

export const initListOptions = (data, value) => {
  if (!Array.isArray(data)) return [];
  let listOptionsRes = deepClone(data);
  const selectedOptions =
    value?.map((i) => getSelectedOptions(data, i)).filter((i) => i) || [];
  if (value.length && selectedOptions.length) {
    const selectedItem = selectedOptions[selectedOptions.length - 1];
    listOptionsRes =
      getSelectedOptions(data, selectedItem?.pid)?.children || data;
  }
  return listOptionsRes;
};

export const placeholderItem = {
  label: '请选择',
  value: '__placeholderItem',
  selected: true,
};
