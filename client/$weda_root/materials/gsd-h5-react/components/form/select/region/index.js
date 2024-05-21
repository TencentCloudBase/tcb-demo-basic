import { callWedaApi } from '../../../../utils/tcb';

export let provinces = [];
export let cities = [];
export let regions = [];
export let regionData = [];
/**
 *  获取运行态地区数据
 *  查询所有的省市区数据https://iwiki.woa.com/pages/viewpage.action?pageId=1582408865
 */
export async function getAreaCode() {
  try {
    const res = await callWedaApi({
      action: 'QueryRuntimeAreaCode',
      data: { Mask: '11100' },
    });
    return res?.AreaCodeList;
  } catch (error) {
    console.error('错误', error);
    return {};
  }
}
export const getRegionTree = async function (defaultValue) {
  regionData = await getAreaCode();
  splitAreaData(regionData, regionData);
  return changeResult(defaultValue, regionData);
};
export const splitAreaData = (areaData) => {
  provinces = [];
  cities = [];
  regions = [];
  areaData.forEach((item) => {
    if (!item.Deprecated) {
      if (item?.Type == 1) {
        provinces.push(item);
      }
      if (item?.Type == 2 || (item?.Type == 1 && item.CentralCity)) {
        cities.push(item);
      } else if (item?.Type == 3) {
        regions.push(item);
      }
    }
  });
};
/***
 * 用于构建change事件result返回值
 */
export const changeResult = (regionValue, areaData) => {
  const defaultValue = regionValue ? regionValue.split(',') : null;
  const changeValue = [];
  const defaultIndex = [];
  if (defaultValue && defaultValue.length > 0) {
    defaultValue.forEach((element, index) => {
      areaData.map((item, id) => {
        //区级判重
        if (
          (item?.Value == element && index != 2) ||
          (item?.Value == element &&
            item.Code.substr(0, 2) == changeValue[0].code.substr(0, 2) &&
            index == 2)
        ) {
          changeValue.push({
            value: item?.Value,
            code: item?.Code,
          });
          defaultIndex.push(id);
        }
      });
    });
  }
  return { value: regionValue, result: changeValue };
};
/**
 * 拼接地区选择默认值显示规则
 */
export const buildDisplayValue = (data, indexList, type) => {
  let provinceItem = [];
  let cityItem;
  let regionItem;
  switch (type) {
    case 'levelOne': {
      provinceItem = data[0][indexList[0]];
      return {
        value: provinceItem.value,
        result: [provinceItem],
      };
    }
    case 'levelTwo': {
      provinceItem = data[0][indexList[0]];
      cityItem = data[1][indexList[1]];
      return {
        value: provinceItem.value + ',' + cityItem.value,
        result: [provinceItem, cityItem],
      };
    }
    case 'levelThree': {
      provinceItem = data[0][indexList[0]];
      cityItem = data[1][indexList[1]];
      regionItem = data[2][indexList[2]];
      return {
        value:
          provinceItem.value + ',' + cityItem.value + ',' + regionItem.value,
        result: [provinceItem, cityItem, regionItem],
      };
    }
  }
};

/**
 * 获取默认地区值所在key
 */
export const getAreaKey = (list, value) => {
  var index = 0;
  (list || []).forEach((item, i) => {
    if (item?.Value === value) {
      index = i;
    }
  });
  return index;
};
