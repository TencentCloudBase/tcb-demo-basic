import { auth, getWedaAPI } from '@cloudbase/weda-client'
import { redirectToLogin, findLoginPage, getAuthConfig, checkAnonymous } from '../common/util';
import { setConfig, initTcb } from '../common/cloud-sdk';

const getAccessToken = auth.getAccessToken
const loginScope = auth.loginScope

import { default as config, AEGIS_CONFIG } from './config'

setConfig({
  ...config,
  // 设置数据源请求的 loading 及 toast 处理
  beforeDSRequest: (cfg) => {
    const { app } = getWedaAPI();
    if (!cfg.options || !cfg.options.showLoading) return;
    app.showLoading();
  },
  beforeCallFunction: async (params) => {
    const { app } = getWedaAPI();
    try {
      const loginPage = findLoginPage();

      let skip = false;
      switch (params?.data?.methodName) {
        case 'callWedaApi': {
          if (['GetMiniProgramUserTicket', 'DescribeRuntimeResourceStrategy'].includes(params?.data?.params.action)) {
            skip = true;
          }
          break;
        }
      }

      // 后续做过滤处理
      const endpointType = app?.__internal__?.getCloudSdkConfig('endpointType');
      if ((params?.data?.mode === 'c' && skip) || (endpointType !== 'tcb-api' && !loginPage)) {
        return params;
      }
      // await initTcb();
      const { accessToken } = await getAccessToken();
      if (accessToken) {
        params.data.accessToken = accessToken;
      }
    } catch (e) {
      if (app?.cloud?.currentUser?.userType === 'externalUser' && e?.error === 'unauthenticated') {
        app.showToast({
          title: '登录态失效',
          icon: 'error',
        });
      }
      // console.error('beforeCallFunction error', e);
    }
    return params;
  },
  afterDSRequest: (cfg, error, result) => {
    const { app } = getWedaAPI();
    if (!cfg.options) return;
    if (cfg.options.showLoading) app.hideLoading();
    if (!cfg.options.showToast) return;
    const isSuccess = !error && result && !result.code;
    app.showToast({ icon: isSuccess ? 'success' : 'error' });
  },
  async afterCallFunction(params, error, res) {
    const { app } = getWedaAPI();
    let oauthError =
      error?.message?.includes?.('PERMISSION_DENIED') ||
      error?.code === 'unauthenticated' ||
      error?.error === 'unauthenticated' ||
      error?.code === 'invalid_grant' ||
      error?.error === 'invalid_grant' ||
      error?.code === 'INVALID_ACCESS_TOKEN';

    if (!oauthError) {
      try {
        /**
         * js-sdk v2 实现上吞了所有错误
         * 返回 new Error(JSON.stringify({code: "OPERATION_FAIL", msg:"[INVALID_ACCESS_TOKEN]XXX"}))
         */
        let tcbErrorObj = JSON.parse(error.message);
        if (tcbErrorObj?.code === 'OPERATION_FAIL' && /\[INVALID_ACCESS_TOKEN\]/.test(tcbErrorObj.msg)) {
          oauthError = true;
        }
      } catch (e) {}
    }

    if (
      params?.data?.params?.action != 'DescribeRuntimeResourceStrategy' &&
      (['InnerError.AuthFailure', 'InvalidAccessToken'].includes(res?.result?.code) || oauthError)
    ) {
      const loginPage = findLoginPage();
      if (loginPage) {
        const authConfig = await getAuthConfig();
        if (authConfig.RejectStrategy === 'to_login') {
          if (['InnerError.AuthFailure'].includes(res?.result?.code)) {
            const isAnonymous = await checkAnonymous();
            if (!isAnonymous) return;
            // 匿名用户越权去登录
          }
          redirectToLogin();
        } else if (authConfig.RejectStrategy === 'show_warning') {
          if (oauthError) {
            const isAnonymous = await checkAnonymous();
            if (!isAnonymous) {
              redirectToLogin();
              return;
            }
          }
          app.showToast({
            title: '接口无访问权限',
            icon: 'error',
          });
        }
      }
    }
  },
});
initTcb()


require.async('../packages/$wd_system/index.js').then(({ Aegis }) => {
  let _aegis = new Aegis(AEGIS_CONFIG);
  const app = getApp();
  if(!app.globalData) {
    app.globalData = {}
  }
  app.globalData._aegis = _aegis;
})


// 防止报类型不匹配warning
const originWarn = console.warn;
const warningSkipRegexp = /(type-uncompatible)|(slot "[\w-]*?" is not found)/;
console.warn = (...args) => {
  // 只看第一条
  const shouldSkip = args.length > 0 && args[0][0] === '[' && args[0][1] === 'C' && warningSkipRegexp.test(args[0]);
  if (!shouldSkip) {
    originWarn(...args);
  }
};
