import { getWhereList, getParseValue } from './platform';
import { isNil } from './lodash';

/**
 * 兼容新旧查询条件协议
 */
export const convertWhere = (props) => {
  let where;
  try {
    where = props.queryCondition || getWhereList(props.where);
    where = getParseValue(where);
  } catch (e) {}
  return Array.isArray(where) ? where : [];
};

/**
 * 获取tcb查询条件
 */
export const getModelParams = (props) => {
  const params = {};
  try {
    const where = convertWhere(props);
    const { orderBy, orderType } = props || {};

    if (orderBy && ['asc', 'desc'].includes(orderType)) {
      params['orderBy'] = orderBy;
      params['orderType'] = orderType;
    }
    if (Array.isArray(where) && where.length > 0) {
      params['where'] = where;
    }
  } catch (e) {}
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
