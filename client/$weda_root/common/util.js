/* eslint-disable no-restricted-syntax */
'use strict';
import { generateForContextOfWidget, generateWidgetAPIContext, getWidget } from './widget';
import { observable, untracked } from 'mobx';
import { auth } from '@cloudbase/weda-client';
const { getAccessToken, loginScope } = auth;
import lodashGet from 'lodash.get';
import lodashSet from 'lodash.set';
import { getWedaAPI } from '@cloudbase/weda-client'

let LOGIN_CONFIG = {
  "logo": "https://sso-1303824488.cos.ap-shanghai.myqcloud.com/logo.svg",
  "backgroundColor": "#ffffff",
  "miniprogram": [
    {
      "id": "__miniprogram_phone",
      "label": "微信小程序手机号授权（仅支持企业主体的小程序）",
      "type": "miniprogram_phone",
      "enable": true
    }
  ],
  "web": [
    {
      "id": "__sms",
      "label": "短信验证码",
      "type": "sms",
      "enable": true
    }
  ],
  "agreement": {
    "enable": false,
    "items": [
      {
        "label": "隐私协议",
        "type": "privacy",
        "value": "",
        "enable": false
      },
      {
        "label": "用户协议",
        "type": "user",
        "value": "",
        "enable": false
      }
    ]
  },
  "userRegistry": {
    "enable": true
  },
  "access": {
    "needLogin": false,
    "noPermissionPolicy": "to_login",
    "defaultRoleId": "1663436551092715522",
    "defaultExternalRoleId": "-3",
    "whiteListPageIds": "",
    "configVersion": "v1"
  },
  "security": {
    "expiresTime": 2592000,
    "enableLoginStatusShare": true
  }
}

/**
 * Convert abcWordSnd -> abc-word-snd
 */
export function toDash(str) {
  return str.replace(/[A-Z]/g, (upperLetter) => `-${upperLetter.toLowerCase()}`);
}

export function createComputed(funcs, bindContext = null) {
  const computed = {};
  for (const name in funcs) {
    Object.defineProperty(computed, name, {
      get() {
        try {
          return bindContext ? funcs[name].call(bindContext) : funcs[name]();
        } catch (e) {
          console.error('Computed error', e);
        }
      },
      enumerable: true,
    });
  }
  return computed;
}

export function generateDataContext(widget) {
  const dataContext = {};
  while (widget?._scope) {
    const current = widget;
    // 此处采用代理的方式，是为了可以获取到最新的 _scope.dataContext 防止 dataContext 引用被重新赋值
    if (current?._scope?.id) {
      Object.defineProperty(dataContext, current._scope.id, {
        get() {
          return current?._scope?.dataContext;
        },
      });
    }
    widget = widget.parent;
  }
  return dataContext;
}

/**
 * @param evtListeners
 * @param [options]
 */
export function createEventHandlers(
  evtListeners,
  options = {
    looseError: false,
    isComposite: false,
    syncCall: false,
  },
) {
  const { looseError = false, isComposite = false, syncCall = false } = options;
  const evtHandlers = {};
  function proxyWrapper(target, compareTarget, key) {
    try {
      return new Proxy(target, {
        get(target, p) {
          if (p !== 'id') {
            if (
              (key === 'currentTarget' || key === 'target') &&
              p !== '_userWidget' &&
              target[p] !== compareTarget?.[p]
            ) {
              // console.log(`@deprecated event.${key}.${String(p)}`);
              reportEvent(`event.${key}.${String(p)}`);
            }
          }
          return target[p];
        },
      });
    } catch (e) {
      return target;
    }
  }
  for (const name in evtListeners) {
    const listeners = evtListeners[name];
    evtHandlers[name] = function (event = {}) {
      const { app } = getWedaAPI();
      const self = this;
      const owner = this._getInstance();
      const target = !!event?.target?.id ? getWidget(owner.widgets, event.target.id) : undefined;
      const currentTarget = !!event?.currentTarget?.id ? getWidget(owner.widgets, event.currentTarget.id) : undefined;
      event.target = proxyWrapper(target, target?._userWidget, 'target');
      event.currentTarget = proxyWrapper(currentTarget, currentTarget?._userWidget, 'currentTarget');
      const [prefix = '', trigger] = name.split('$');
      // The page event handler
      const forContext = (!!currentTarget && generateForContextOfWidget(currentTarget)) || {};
      const dataContext = untracked(() => generateDataContext(currentTarget));
      const $w = untracked(() => generateWidgetAPIContext(owner?.__internal__?.$w, currentTarget, forContext));

      function checkPageActive(pageId, currentPageContext, listener) {
        /**
         * 复合组件自身不中断校验
         */
        if (isComposite) {
          return true;
        }
        const { id, __internal__ } = currentPageContext || {};
        if (pageId && id) {
          /**
           * TODO:
           * IOS 设备跳转扫码成功回到当前页调度存在时序问题
           * 成功响应时当前页非 active 状态
           * 取消判断待兼容
           */
          if (pageId !== id /* || (__internal__ && !__internal__.active)*/) {
            if (!name?.includes?.('onDataChange')) {
              console.error(`Action error: [${name}] 页面生命周期结束，链式调用中断`);
            }
            return false;
          }
        }
        return true;
      }

      async function processListener(l) {
        /**
         * 调用前置校验
         * 是否仍可调用方法
         */
        if (!checkPageActive(owner.id, app.__internal__?.activePage, l)) {
          return;
        }

        let { args = {}, argsBinds = {} } = l;
        args = { ...args, params: args.params?.map?.(item => { return typeof item === 'object' && item !== null && !Array.isArray(item) ? { ...item } : item }) || [] };
        const nextEventHandles = [
          {
            handlerName: '',
            event: {
              ...event,
              originEvent: undefined
            },
          },
        ];
        let error = false;
        const isIfAction = l.sourceKey === 'platform:utils.If';
        const isShowModalAction = l.sourceKey === 'platform:showModal';
        try {
          const resolvedData = mergeDynamic2StaticData(args, argsBinds, {
            $w,
            forContext,
            codeContext: {
              instance: owner,
              event,
            },
            dataContext,
          });
          let res = await l.handler.call(owner, { event, data: resolvedData.params?.[0], args: resolvedData.params || [], $w });
          nextEventHandles[0].handlerName =
            prefix && l.key ? `${prefix}$${l.key}${!isIfAction || res ? '_success' : '_fail'}` : '';
          nextEventHandles[0].event.detail = isIfAction ? event.detail : res;
          if (isShowModalAction) {
            let handlerName = '';

            if (res.cancel) {
              handlerName = `${prefix}$${l.key}_cancel`;
            } else if (res.confirm) {
              handlerName = `${prefix}$${l.key}_confirm`;
            }

            if (handlerName) {
              nextEventHandles.push({
                handlerName,
                event: {
                  ...event,
                  detail: res,
                  originEvent: undefined
                },
              });
            }
          }
        } catch (e) {
          if (e.message) {
            e._target = `${currentTarget?.id ? `组件${currentTarget?.id}` : ''}[${trigger}事件，响应ID${l.key}]`;
          }
          nextEventHandles[0].handlerName = l.key ? `${prefix}$${l.key}_fail` : '';
          nextEventHandles[0].event.detail = isIfAction ? event.detail : e;
          error = e;
        }

        /**
         * 调用后置校验
         * 是否触发后置事件
         */
        if (checkPageActive(owner.id, app.__internal__?.activePage, l)) {
          const nextHandler = nextEventHandles[0];

          if (!self[nextHandler.handlerName] && error) {
            const message =  generateErrorDebugMessage(error) || error.errMsg || ''
            console.error(`Action error:`, message, error?.stack);
            if (!looseError && !/scanCode:fail cancel/.test(message)) {
              if (app.__internal__?.env?.type !== 'production') {
                app.showModal({
                  title: `事件响应失败`,
                  content: message,
                  showCancel: false,
                });
              } else {
                app.showToast({
                  icon: 'error',
                  title: `事件响应失败`,
                });
              }
            }
            throw error;
          } else {
            const res = await Promise.all(
              nextEventHandles
                .filter((nextHandler) => self[nextHandler.handlerName])
                .map(async (nextHandler) => {
                  return self[nextHandler.handlerName](nextHandler.event);
                }),
            );
            return res.length ? res[res.length - 1] : nextEventHandles[nextEventHandles.length - 1]?.event?.detail;
          }
        }
      }

      const promise = Promise.all(
        listeners.map((l) => {
          return processListener(l).then(
            (res) => ({ data: res, error: null }),
            (error) => ({ data: null, error }),
          );
        }),
      );

      if (syncCall) {
        return promise.then((listenerRes) => {
          const res = [];
          for (const item of listenerRes) {
            if (item.error) {
              throw item.error;
            } else {
              res.push(item.data);
            }
          }
          return res.length ? res[0] : event.detail;
        });
      }
    };
  }

  return evtHandlers;
}

function generateErrorDebugMessage(error) {
  return `${error?._target ? `${error?._target}:` : ''}${error?.message || ''}`;
}

export function getDeep(target, key, keySeparator = '.') {
  if (key == null) {
    return target;
  }
  const keys = `${key}`.split(keySeparator);
  while (keys.length > 0 && target != null && target !== undefined) {
    target = target[keys.shift()];
  }
  return keys.length === 0 ? target : undefined;
}

/**
 * Touch all props of given object deeply
 */
export function touchObj(obj) {
  if (!obj) {
    return;
  }
  if (typeof obj === 'string') {
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(touchObj);
  } else if (obj) {
    Object.keys(obj).forEach((key) => touchObj(obj[key]));
  }
}

export function throttle(fn, limit) {
  let lastExecTime = 0;
  let timer = null;

  function invoke() {
    lastExecTime = Date.now();
    timer = null;
    fn();
  }

  const throttled = function () {
    const idledDuration = Date.now() - lastExecTime;
    if (idledDuration >= limit) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke();
    } else if (!timer) {
      timer = setTimeout(invoke, limit - idledDuration);
    }
  };
  return throttled;
}

export function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const aProps = Object.keys(a);
    const bProps = Object.keys(b);
    if (!deepEqual(aProps, bProps)) {
      return false;
    }
    for (let i = 0; i < aProps.length; i++) {
      const prop = aProps[i];
      if (!deepEqual(a[prop], b[prop])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isObject(value) {
  let type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

function isIndex(value, length) {
  length = length == null ? 9007199254740991 : length;
  return (
    !!length &&
    (typeof value === 'number' || /^(?:0|[1-9]\d*)$/.test(value)) &&
    value > -1 &&
    value % 1 == 0 &&
    value < length
  );
}

function assignValue(object, key, value) {
  let objValue = object[key];
  if (
    !(Object.hasOwnProperty.call(object, key) && (objValue === value || (objValue !== objValue && value !== value))) ||
    (value === undefined && !(key in object))
  ) {
    object[key] = value;
  }
}

export function set(object, path, value) {
  if (!isObject(object)) {
    return object;
  }
  path = path.split('.');

  let index = -1;
  let { length } = path;
  let lastIndex = length - 1;
  let nested = object;

  while (nested != null && ++index < length) {
    let key = path[index];
    let newValue = value;

    if (index != lastIndex) {
      let objValue = nested[key];
      newValue = undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

export function findLoginPage() {
  const { app } = getWedaAPI();
  const { pages = [], loginConfigVersion } = app.__internal__.getConfig();
  const custom = pages.find((item) => item.type === 'login')
  if (loginConfigVersion) {
    return custom || {
      id: 'login',
      packageName: '$wd_system',
      uuid: '$wd_system/login',
      type: 'login'
    }
  }
}

export function findStatusPage() {
  const { app } = getWedaAPI();
  const { pages = [] } = app.__internal__.getConfig();
  return pages.find((item) => item.type === 'status');
}

let _AUTH_CONFIG_CACHE = null;

export async function getAuthConfig() {
  const { app } = getWedaAPI();
  if (_AUTH_CONFIG_CACHE) {
    return _AUTH_CONFIG_CACHE;
  }
  try {
    const res = await app.cloud.callWedaApi({
      action: 'DescribeRuntimeResourceStrategy',
      data: {
        ResourceType: `app`,
        ResourceId: app.id,
      },
    });
    const settingData = {};
    // 云api不支持map只能传字符串，需要转换
    res.forEach((item) => {
      settingData[item.Key] = ['AllowRegister', 'NeedLogin'].includes(item.Key) ? item.Value === '1' : item.Value;
    });
    _AUTH_CONFIG_CACHE = settingData;
    return _AUTH_CONFIG_CACHE;
  } catch (e) {
    return {
      NeedLogin: false,
      RejectStrategy: 'show_warning',
    };
  }
}

let _AUTH_CACHE_MAP = {};

async function getAccessPermission(app, appId, packageName = "", pageId) {
  let cacheKey = `${appId}-${pageId}`;
  if (packageName) {
    const matched = packageName.match(/packages\/(.*)$/);
    const subKey = matched?.[1] || packageName
    cacheKey = `${appId}-${subKey}-${pageId}`
  }

  if (_AUTH_CACHE_MAP[cacheKey] !== undefined) {
    return _AUTH_CACHE_MAP[cacheKey];
  }

  const res = await app.cloud.callWedaApi({
    action: 'DescribeResourcesPermission',
    data: {
      ResourceType: `app`,
      ResourceIdList: [cacheKey],
      AppResourceId: appId,
    },
  });
  if (Array.isArray(res)) {
    const resourceInfo = res.find((i) => i.ResourceId === cacheKey);
    const isAccess = !!resourceInfo?.IsAccess;

    _AUTH_CACHE_MAP[cacheKey] = {
      isAccess,
      roleId: resourceInfo?.RoleId,
    };

    return _AUTH_CACHE_MAP[cacheKey];
  } else {
    throw new Error(`鉴权接口返回参数不正确 - ${JSON.stringify(res)}`);
  }
}

export async function checkAnonymous() {
  let isAnonymous = true;
  try {
    const { accessToken } = await getAccessToken();
    isAnonymous = !accessToken;
    const { app } = getWedaAPI();
    // 私密链路有token则不是匿名; tcb链路会匿名登录需要多验证scope === 'anonymous'
    if (accessToken && app.__internal__.getCloudSdkConfig('endpointType') === 'tcb-api') {
      const scope = await loginScope();
      isAnonymous = scope === 'anonymous';
    }
  } catch (e) {}
  return isAnonymous;
}

export function formatErrorMsg(e) {
  let msg = e?.errMsg || e?.error_description || e?.message;
  const uri = e?.error_uri;
  msg = `${msg}${uri ? `-${uri}` : ''}`;
  if (msg.startsWith('request:fail')) {
    msg = `网络故障, 请检查本地网络连接是否正常(${msg})`;
  }
  return msg;
}

/**
 * 检查页面权限
 **/
export async function checkAuth(app, appId, $page) {
  

  // 免密登录
	if (await app?.cloud?.judgePasswordFreeLogin()) {
		return true;
	}

	const loginConfig = await getLoginConfig();
	const hasPhoneLoginType = loginConfig?.miniprogram?.find(v => v.type === 'miniprogram_phone');
	const hasOpenIdLoginType = loginConfig?.miniprogram?.find(v => v.type === 'openid_login');

  const loginPage = findLoginPage(app);
  const judgePhoneLogin = loginPage && hasPhoneLoginType;
  const loginPageUUID = loginPage?.uuid || loginPage?.id
  const currentUUID = $page.uuid || $page.id
  if (loginPageUUID === currentUUID) {
    return true;
  }
  const status = findStatusPage(app);
  if (status?.id === $page.id) {
    return true;
  }
  wx.showNavigationBarLoading();
  const requestList = [getAccessPermission(app, appId, $page.__internal__.packageName, $page.id)];
  // 暂时先认为有登录页则自定义登录功能开启且生效
  if (judgePhoneLogin || hasOpenIdLoginType) {
    requestList.push(getAuthConfig(app));
  }
  try {
    const [accessData, authConfig] = await Promise.all(requestList);

    const isAnonymousUser = await checkAnonymous();
    // 如果当前页面匿名用户无权限访问
    if (!accessData?.isAccess) {
      // 当前匿名情况下，且需要登录后访问应用
      if (isAnonymousUser && (authConfig?.NeedLogin || authConfig?.RejectStrategy == 'to_login')) {
        // 开启了手机号授权登录，则判断是否跳转到登录页面
        if (judgePhoneLogin) {
          redirectToLogin($page);
        } else if (hasOpenIdLoginType){
          // 开启了openId静默登录，则进行openid登录
          return await app.cloud.openIdLoginInWxApp();
        }
      } else {
        app.showToast({
          title: ['-2', '-4'].includes(accessData?.roleId) ? '默认访客无权限' : '页面无访问权限',
          icon: 'error',
        });
      }
    } else if (authConfig?.NeedLogin) {
      // 如果当前页面匿名用户有权限访问，且需要登录后访问应用，则按配置进行登录
      if (judgePhoneLogin) {
        // 此分支逻辑本不应该前端判断是否登录，历史原因后端短期内搞不定，后续后端优化后删除
        try {
          if (isAnonymousUser) {
            redirectToLogin($page);
            return false;
          }
        } catch (e) {
          redirectToLogin($page);
          return false;
        }
      } else if (hasOpenIdLoginType) {
        // openId静默登录
        return await app.cloud.openIdLoginInWxApp();;
      }
    }

    return accessData?.isAccess;
  } catch (e) {
    if(app.__internal__?.activePage?.id === $page.id) {
      throw new Error(formatErrorMsg(e))
      app.showModal({
        title: '页面鉴权失败',
        content: formatErrorMsg(e),
        showCancel: false,
      });
    }
    return false;
  } finally {
    wx.hideNavigationBarLoading();
  }
}

export function redirectToLogin(currentPage) {
  // 去登录则清空权限缓存。
  _AUTH_CACHE_MAP = {};
  const { app } = getWedaAPI();
  const loginPage = findLoginPage(app);
  if (!currentPage) {
    currentPage = app.utils.getCurrentPage() || {};
  }
  const loginPageUUID = loginPage?.uuid || loginPage?.id
  const currentUUID = currentPage.uuid || currentPage.id
  if (loginPageUUID === currentUUID) {
    return true;
  }
  if (loginPage) {
    app.redirectTo({
      pageId: loginPage.id,
      packageName: loginPage.packageName,
      params: {
        sourcePagePackageName: currentPage.__internal__.packageName || undefined,
        sourcePageId: currentPage.id,
        sourcePageParams: currentPage.params || currentPage.dataset?.params,
      },
    });
  } else {
    app.showToast({
      title: '用户未登录',
      icon: 'error',
    });
  }
}

let loading = {};
export let enumOptions = observable({});

export function formatEnum(path, optionname) {
  // 判断是单选还是多选
  let isSingle = Array.isArray(path);
  // 获取到options
  let parseOptions = getEnumOptions(optionname);
  if (parseOptions === '') {
    return !isSingle ? path : path.join(',');
  }
  let multiTmp = [];
  let value = !isSingle
    ? JSON.parse(parseOptions)?.find((item) => item?.key === path)?.value
    : JSON.parse(parseOptions)
        ?.filter((item) => path.some((pathValue) => item?.key === pathValue))
        .map((item) => multiTmp.push(item?.value));
  // 对多选或者单选有不同处理
  return !isSingle ? value : multiTmp?.join(',');
}

function getEnumOptions(optionName) {
  if (enumOptions[optionName]) {
    return enumOptions[optionName];
  }
  if (!loading[optionName]) {
    loading[optionName] = true;
    getGeneralOptions(optionName).then((data) => {
      enumOptions[optionName] = data?.Items[0]?.Config;
    });
  }
  return '';
}

async function getGeneralOptions(optionName) {
  const { app } = getWedaAPI();
  return app.cloud.callWedaApi({
    action: 'DescribeGeneralOptionsDetailList',
    data: {
      PageSize: 1,
      PageIndex: 1,
      OptNameList: [optionName],
    },
  });
}

export function getMpEventHandlerName(widgetId, evtName, modifier = {}) {
  // Only builtin events have will bubble
  return `on${widgetId}$${evtName.replace(/\./g, '_')}${modifier.isCapturePhase ? '$cap' : ''}${
    modifier.noPropagation ? '$cat' : ''
  }`;
}

function isPlainObject(src) {
  return Object.prototype.toString.call(src) === '[object Object]';
}

const isEmptyObj = (obj) => {
  if (!isPlainObject(obj)) {
    return false;
  }
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      return false;
    }
  }
  return true;
};

export function mergeDynamic2StaticData(
  staticData,
  dataBinds,
  context /* : {
    $w: any;
    forContext?: {
      lists: any[]
      forItems: Record<string,any>
    };
    codeContext: {
      instance: any
      event?: Event;
    };
    dataContext?: Record<string,any>;
    paramsContext?: Record<string,any>;
  }*/,
  combainErrors = false,
) {
  const { forContext = {}, codeContext = {}, dataContext = {}, $w, paramsContext = {} } = context;
  const { lists = [], forItems = {} } = forContext;

  const resolvedData = {
    ...staticData,
  };
  let error = null;

  for (const key in dataBinds) {
    try {
      set(
        resolvedData,
        key,
        dataBinds[key].call(
          codeContext.instance,
          codeContext.instance,
          lists,
          forItems,
          codeContext.event,
          dataContext,
          $w,
          paramsContext,
        ),
      );
    } catch(e) {
      if(combainErrors) {
        error = e
      } else {
        throw e
      }
    }
  }
  if(error) {
    throw error
  }

  return resolvedData;
}

function replaceStaticResourceAttribute(obj, replacer, paths, index = 0) {
  const path = paths[index];
  const value = lodashGet(obj, path);
  if (index === paths.length - 1) {
    try {
      if (value) {
        lodashSet(obj, path, replacer(value));
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    if (Array.isArray(value)) {
      value.forEach((current) => {
        replaceStaticResourceAttribute(current, replacer, paths, index + 1);
      });
    } else {
      try {
        Object.values(value).forEach((current) => {
          replaceStaticResourceAttribute(current, replacer, paths, index + 1);
        });
      } catch (e) {}
    }
  }
}

export function processStaticResourceAttribute(data, replacer, property) {
  const { app } = getWedaAPI();
  const { __internal__ = {} } = app || {};
  const { resolveStaticResourceUrl = (str) => str } = __internal__ || {};
  if (!replacer) {
    replacer = resolveStaticResourceUrl;
  }
  let segments = [property];
  if (/\.\*\.?/.test(property)) {
    segments = property
      ?.trim()
      .split('.')
      .reduce((segments, path) => {
        const latest = segments.length ? segments.length - 1 : 0;
        const current = segments[latest];
        if (path === '*') {
          segments.push('');
        } else {
          segments[latest] = current ? `${current}.${path}` : path;
        }
        return segments;
      }, []);
  }
  try {
    replaceStaticResourceAttribute(data, replacer, segments);
  } catch (e) {
    console.error('处理静态资源失败:', e);
  }
}



export async function getExpiredMessage(createdTime = 0) {
  if (wx.getSystemInfoSync().platform === 'devtools') {
    return ;
  }

}


export function patchWdigetPropsWithEvtListeners(widgetProps, evtListeners) {
  const actionMap = Object.keys(evtListeners).reduce((map, evtKey = '') => {
    const matched = evtKey.match(/^on(.*?)\$(.*)$/);
    if (matched?.[1] && matched?.[2] && !/[._]/.test(matched?.[2])) {
      if (!map[matched?.[1]]) {
        map[matched?.[1]] = new Set([]);
      }
      map[matched?.[1]].add(matched?.[2]);
    }
    return map;
  }, {});
  for (let key in widgetProps) {
    const props = widgetProps[key];
    if (actionMap[key]) {
      if (!props.classList) {
        props.classList = [];
      }
      props.classList = Array.from(
        new Set([...props.classList, ...Array.from(actionMap[key]).map((trigger) => `wd-event-${trigger}`)]),
      );
    }
  }
  return widgetProps;
}


export function reportEvent(tag) {
  const { app } = getWedaAPI()
  try {
    const { envVersion } = app.__internal__?.getConfig?.() || {};
    // console.log('>>>>>>reportevent:', tag);
    getApp().globalData._aegis?.reportEvent?.({
      name: tag,
      ext2: envVersion,
    });
  } catch (e) {}
}

export async function getLoginConfig() {
  const { app } = getWedaAPI()
  
  const { staticResourceDomain, loginConfigVersion, id } = app.__internal__?.getConfig() || {};
  if (staticResourceDomain && loginConfigVersion && id) {
    const url = app.__internal__?.resolveStaticResourceUrl?.(`/__auth/app/app-MA8fOLo7/login.config.v1_123c7e86167357e2d8e3224a258856ec.json`)
    if (!LOGIN_CONFIG) {
      LOGIN_CONFIG = await new Promise((resolve, reject) => {
        wx.request({
          url,
          success: res => {
            if(String(res.statusCode).startsWith('2')){
              resolve(res.data)
            } else {
              reject(new Error(`statusCode: ${res.statusCode} 获取${url}失败`))
            }
          },
          fail: e => {
            const error = new Error(e.errMsg)
            error.code = e.errno
            reject(error)
          }
        })
      })
    }
    return LOGIN_CONFIG
  } else {
    throw new Error('缺少登录配置');
  }
  
}
