import { getWhereList, getParseValue } from './platform';
import { getDataSourceByName } from './tcb';
import { isNil } from './lodash';
import { errorHandler } from './error';
/**
 * 兼容新旧查询条件协议
 */
export const convertWhere = (props) => {
  let where;
  try {
    where = props.queryCondition || getWhereList(props.where);
    where = getParseValue(where);
  } catch (e) {
    errorHandler({
      code: 'ConvertQueryError',
      error: e,
    });
  }
  return Array.isArray(where) ? where : [];
};

/**
 * 拼接filter参数
 */
const getFilter = (wList) => {
  let where = [];
  let filter = { where: {} };
  if (wList?.where?.$or) {
    const wListWhere = wList?.where?.$or || [];
    if (wList?.constructor === Object) {
      where = [...wListWhere];
      filter = {
        ...wList,
        where: {
          $or: where,
        },
      };
    }
  } else {
    const wListWhere = wList?.where?.$and || [];
    if (wList?.constructor === Object) {
      where = [...wListWhere];
      filter = {
        ...wList,
        where: {
          $and: where,
        },
      };
    }
  }

  if (Array.isArray(wList)) {
    where = [...wList];
    filter = {
      where: {
        $and: where,
      },
    };
  }
  return getParseValue(filter);
};
const getSelectFields = async (props) => {
  let select = {};
  // 支持自定义查询字段
  if (props.selectFieldType === 'all' && props.datasource?.name) {
    // V2 查询方法中，要显式传入所有应该展示的字段

    const datasource = await getDataSourceByName(props.datasource.name);
    const authFields = Object.keys(datasource?.schema?.properties || {});
    authFields.forEach((name) => {
      select[name] = true;
    });
  } else if (props.selectFieldType === 'custom') {
    const _selectFields = Array.isArray(props.selectFields) ? props.selectFields : [];
    _selectFields.forEach((name) => {
      select[name] = true;
    });
  } else {
    select = { $master: true };
  }
  return select;
};
/**
 * 获取tcb查询条件
 */
export const getModelParams = async (props) => {
  const params = {};
  try {
    const { orderBy, orderType } = props || {};

    if (orderBy && ['asc', 'desc'].includes(orderType)) {
      params['orderBy'] = orderBy;
      params['orderType'] = orderType;
    }
    if (props.supportManyRelated) {
      // 支持多关联查询，需要将查询条件转换为filter
      if (props?.queryCondition?.constructor === Object) {
        params['filter'] = getFilter(props.queryCondition);
      } else if (Array.isArray(props?.queryCondition)) {
        params['filter'] = {
          where: {
            $and: props?.queryCondition,
          },
        };
      }
      params.select = await getSelectFields(props);
      // 处理排序字段
      if (params.orderBy && ['asc', 'desc'].includes(params.orderType)) {
        params.orderBy = [{ [params.orderBy]: params.orderType }];
      }
      // 支持多字段排序
      if (props.isSupportMultipleSort) {
        params.orderBy = transformSorter(props.sorter);
      }
    } else {
      const where = convertWhere(props);
      if (Array.isArray(where) && where.length > 0) {
        params['where'] = where;
      }
    }
  } catch (e) {
    errorHandler({
      code: 'GetModelParamsError',
      error: e,
    });
  }
  return params;
};

export const getPageParams = (pageNo, pageSize) => {
  let tcbParams = {};
  if (!isNil(pageNo) && !isNil(pageSize)) {
    tcbParams['pageNo'] = pageNo;
    tcbParams['pageSize'] = pageSize;
  }
  return tcbParams;
};

const transformSorter = (sorter = []) => {
  return sorter
    ?.filter((n) => (n.orderBy && n.orderType) || n.relationalTableName)
    ?.map((i) => {
      if (i.relationalTableName) {
        return {
          [i.relationalTableName]: i.sorter
            ?.filter((j) => j.orderBy && j.orderType)
            ?.map((k) => ({ [k.orderBy]: k.orderType })),
        };
      } else {
        return { [i.orderBy]: i.orderType };
      }
    });
};
