import { getWedaAPI } from './getWedaApi';
import { deepClone } from './lodash';
import { errorHandler } from './error';
// 默认使用swr的methodName
const SWR_METHOD_DEFAULT = ['wedaGetItem', 'wedaGetRecords', 'getApiKey'];
// 默认使用swr的action
const SWR_ACTION_DEFAULT = [
  'DescribeAppCustomNav',
  'DescribeChartCardData',
  'DescribeChartData',
  'DescribeRuntimeDataViewList',
  'DescribeRuntimeDataViewPropertiesList',
  'DescribeDataImportDetail',
  'DescribeDataImportList',
  'DescribeGeneralOptionsDetailList',
  'QueryRuntimeAreaCode',
  'InvokeComponentWxModule',
];

/**
 * 获取swrMode参数，用于数据源获取
 * @param param0
 * @returns
 */
const dealParamsWithSwr = (data, type = 'method') => {
  const swr = data.swr || {};
  const toJudge = {
    method: { list: SWR_METHOD_DEFAULT, key: 'methodName' },
    action: { list: SWR_ACTION_DEFAULT, key: 'action' },
  }[type];
  let swrMode = false;

  if (toJudge && toJudge.list.includes(data[toJudge.key])) {
    swrMode = swr.swrMode === undefined ? true : swr.swrMode;
  }

  return { swr: { swrMode, forceClear: !!swr.forceClear } };
};

export async function getCloudInstance() {
  return await getWedaAPI().app.cloud.getCloudInstance();
}

/**
 * 获取单个临时链接
 * 单个cos文件，返回字符串
 * 多个cos文件，返回 {fileID: src} 这样的对象
 */
export async function getTempFileURL(data) {
  try {
    if (/^cloud:\/\//.test(data)) {
      return await getWedaAPI()?.app.cloud.getTempFileURL?.(data);
    }
  } catch (e) {
    errorHandler({
      code: 'GetTempFileURLError',
      error: e,
    });
  }
  return data;
}

/**
 * 云API：获取用户自定义导航内容
 *  param
 *  WeAppId: string,
 *  EnvId: string,
 *  PublishType?: string,
 */
export async function getAppCustomNav() {
  try {
    const PublishType = getWedaAPI().app.cloud?.IS_WEDA_IDE ? 'preview' : '';
    const WeAppId = getWedaAPI().app?.id;
    const res = await callWedaApi({
      action: 'DescribeAppCustomNav',
      serviceType: 'lowcode',
      data: {
        WeAppId,
        PublishType,
      },
    });
    return res;
  } catch (error) {
    errorHandler({
      code: 'GetAppCustomNavError',
      error,
    });
    return {};
  }
}

/**
 * 调用微搭后端API服务
 */
export async function callWedaApi(param) {
  if (getWedaAPI().app.cloud.callWedaApi) {
    param = deepClone(param);
    const paramsTemp = {
      ...param,
      ...dealParamsWithSwr(param, 'action'),
    };
    delete paramsTemp.swr;
    return await getWedaAPI().app.cloud.callWedaApi(paramsTemp);
  }
}

/**
 * 云函数获取数据
 */
export async function callDataSource(param) {
  if (getWedaAPI()?.app?.cloud?.callDataSource) {
    param = deepClone(param);
    param.params = { ...param.params, ...dealParamsWithSwr(param) };

    return await getWedaAPI().app.cloud.callDataSource(param);
  }

  return {};
}

/**
 * 云函数获取API数据
 */
export async function callConnector(param) {
  if (getWedaAPI()?.app?.cloud?.callConnector) {
    param = deepClone(param);
    param.params = { ...param.params, ...dealParamsWithSwr(param) };

    return await getWedaAPI().app.cloud.callConnector(param);
  }
}

/**
 * 云函数获取数据
 */
export async function callDataSourceApi(param) {
  try {
    return await callDataSource(param);
  } catch (error) {
    errorHandler({
      code: 'CallDataSourceError',
      error,
    });
    return {};
  }
}

/**
 * 返回静态托管cdn域名
 */
export const resolveStaticResourceUrl = (path) => {
  try {
    const resourceUrl =
      getWedaAPI()?.app?.__internal__?.resolveStaticResourceUrl(path);
    return resourceUrl;
  } catch (error) {
    errorHandler({
      code: 'ResolveStaticResourceUrlError',
      error,
    });
    return '';
  }
};

/*
  获取数据源字段权限
*/
export const getDataSourceByName = async (dbName, swrMode = true) => {
  // dbName 为空时
  if (!dbName) return;
  const datasource = await getWedaAPI()?.app?.cloud.getDataSourceProfileAsync({
    Name: dbName,
    GetColumnAuth: true,
    swrMode,
  });
  return datasource;
};
