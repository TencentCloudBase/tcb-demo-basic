import { observable } from 'mobx';
import { DS_SDK, CLOUD_SDK, EXTRA_API, getConfig } from '@cloudbase/weda-cloud-sdk';
import { EPLATFORM } from '../common/constants';
import { execOnce, createAppUtils, createAPINamespace } from '../common/utils';
import { createMpActionsAPI } from '../mp/actions';
import { createMpRouterAPI, generatePageUrl } from '../mp/router';
import { init as initTcb } from './app/tcb';
import { auth } from './auth/index';
import { env } from './env/index';
import { createMpAiAPI } from './ai';
let networkStatusChangeListener = null;
function updateNetworkStatus($w) {
    // 监听网络状态变化
    if (networkStatusChangeListener) {
        wx?.offNetworkStatusChange?.(networkStatusChangeListener);
        networkStatusChangeListener = null;
    }
    networkStatusChangeListener = (res) => {
        const newNetworkType = convertNetworkType(res.networkType);
        if ($w.device?.networkType !== newNetworkType) {
            $w.device.networkType = newNetworkType;
        }
    };
    wx?.onNetworkStatusChange?.(networkStatusChangeListener);
}
/**
 * 创建小程序下的app对象，对外暴露
 * @param initData
 * @returns
 */
export function createMpApp(initData = {}) {
    const { appId: mpAppId = '', nickname: mpAppName = '' } = globalThis?.__wxConfig?.accountInfo || {};
    const appId = initData?.appConfig?.id || initData.id || '';
    const api = {
        __internal__: {
            $w: null,
            activePage: null,
            enumOptions: observable({}),
            getConfig: () => {
                return {
                    envVersion: 'production',
                    pages: [],
                    ...initData?.appConfig,
                    appId,
                };
            },
            resolveStaticResourceUrl(staticUrl) {
                if (/^\//.test(staticUrl)) {
                    const domain = api?.__internal__?.getConfig?.()?.staticResourceDomain || api?.domain || '';
                    const url = `https://${domain}${staticUrl}`;
                    return url;
                }
                return staticUrl;
            },
            isMobile() {
                const { platform } = wx.getSystemInfoSync();
                return platform !== 'windows' && platform !== 'mac';
            },
            getCloudSdkConfig: getConfig,
            generatePageUrl: (obj = {}) => {
                return generatePageUrl({ ...obj, basename: obj.basename || api?.__internal__?.getConfig()?.basename });
            },
        },
        id: appId,
        label: initData.appConfig?.label || '',
        version: initData?.appConfig?.version || '',
        /**
         * @deprecated
         */
        domain: initData?.appConfig?.staticResourceDomain,
        mpAppId,
        mpAppName,
        // createMpActionsAPI必须在前面
        ...createMpActionsAPI(initData),
        platform: EPLATFORM.MINIPROGRAM,
        /**
         * 须避免被wx.cloud 覆盖
         */
        cloud: CLOUD_SDK,
        dataSources: DS_SDK,
        _setStateVal(config) { },
        init: initTcb,
        auth,
        invoke(param) {
            // nees to impl
        },
        ai: null, // 保持类型可用，后续覆盖可用的对象
    };
    const apiWithUtils = Object.assign(api, {
        utils: {
            ...createAppUtils(api, initData),
            async getWXContext() {
                let Data = wx.getStorageSync('wd-GetWxContext');
                let getWxContextPromise = api.cloud
                    .callWedaApi({
                    action: 'InvokeComponentWxModule',
                    data: {
                        Method: 'GetWxContext',
                    },
                })
                    .then((res) => {
                    if (res?.Data) {
                        wx.setStorageSync('wd-GetWxContext', res.Data);
                    }
                    return res.Data;
                });
                if (!Data) {
                    Data = await getWxContextPromise;
                }
                try {
                    return typeof Data === 'string' ? JSON.parse(Data) : Data;
                }
                catch (e) {
                    console.error('get wxcontext fail:', e, Data);
                    return {};
                }
            },
            getCurrentPage() {
                return api.__internal__.activePage;
            },
        },
    });
    const mpApp = Object.assign(apiWithUtils, {
        ...createMpActionsAPI(initData, apiWithUtils),
        ...createMpRouterAPI(apiWithUtils),
        ...createMpAiAPI(apiWithUtils),
        /**
         * @deprecated
         */
        invoke(params) {
            const $page = mpApp.utils.getCurrentPage();
            return $page.invokeComponentMethod(params);
        },
        /**
         * @deprecated
         */
        _setStateVal(config) {
            const [key, name] = config?.varPath?.split?.('.') || [];
            if (key !== '$global' && key !== '$page') {
                console.warn('[@deprecated] 禁止跨页面设置变量值，后期版本将放弃对此的支持');
            }
            if (key === '$page') {
                const $page = mpApp.utils.getCurrentPage();
                $page?.setState?.({ [name]: config.val });
            }
            else {
                // @ts-ignore
                EXTRA_API.setState(config.varPath, config.val);
            }
        },
    });
    mpApp.__internal__.$w = createAPINamespace(mpApp, env, {
        device: initData?.device,
        platforms: ['MOBILE', 'MP'],
    });
    updateDeviceInfo(mpApp.__internal__.$w);
    return mpApp;
}
export const app = execOnce(createMpApp);
export const $w = new Proxy({}, {
    get(_, prop) {
        const { $app: currentAppAPI } = getWedaAPI();
        const appInstance = currentAppAPI || app;
        const internal = currentAppAPI.__internal__ || app.__internal__;
        if (prop === 'app') {
            return appInstance;
        }
        else if (prop === 'page') {
            return internal.activePage;
        }
        return internal.$w ? internal.$w?.[prop] : null;
    },
});
function convertNetworkType(networkType) {
    const networkTypes = ['wifi', '2g', '3g', '4g', '5g'];
    if (networkTypes.includes(networkType))
        return networkType;
    return 'other';
}
function updateDeviceInfo($w) {
    if (!$w.device) {
        return;
    }
    try {
        const { windowWidth, windowHeight } = wx.getSystemInfoSync();
        $w.device.viewport = {
            width: windowWidth,
            height: windowHeight,
        };
    }
    catch (e) {
        $w.device.viewport = {
            width: 0,
            height: 0,
        };
        console.log('getSystemInfoSync error', e);
    }
    wx?.getNetworkType?.({
        success({ networkType }) {
            if ($w.device.networkType !== networkType) {
                $w.device.networkType = convertNetworkType(networkType);
            }
        },
    });
    /**
     * 可以用 onWindowResize 监听 resize 变化
     * 但是 微信文档认为该方法非标
     * 转为在页面生命周期执行
     */
    // wx.onWindowResize(({ size = {} }) => {
    //   const { windowWidth, windowHeight } = size;
    //   $w.device.viewport.width = windowWidth;
    //   $w.device.viewport.height = windowHeight;
    // });
    updateNetworkStatus($w);
    return;
}
export function getWedaAPI() {
    const __wedaGlobal__ = globalThis?.__wedaGlobal__ || getApp();
    const { app: _app } = __wedaGlobal__ || {};
    return new Proxy({
        app: _app,
        $app: _app,
    }, {
        get(_target, prop) {
            const __wedaGlobal__ = globalThis?.__wedaGlobal__ || getApp() || { app, $w, $app: app };
            return __wedaGlobal__?.[prop];
        },
    });
}
export async function init({ appId = 'app-fakewdid', envId, isProd = true, appConfig, ...rest }) {
    const initPromise = initTcb({ appId, envId, isProd, ...rest });
    const api = registApp(createMpApp({
        id: appId,
        appConfig: {
            ...appConfig,
            id: appId,
            envId: envId,
            envVersion: isProd ? 'production' : 'preview',
            pages: appConfig.pages || [],
            loginConfigVersion: appConfig.loginConfigVersion || '',
        },
    }));
    await initPromise;
    return api;
}
function registApp(app) {
    globalThis.__wedaGlobal__ = new Proxy({
        app,
        $w: app.__internal__?.$w,
    }, {
        get(_, prop) {
            switch (prop) {
                case 'app':
                case '$app':
                    return app;
                case '$w':
                    return app.__internal__?.$w;
            }
            return undefined;
        },
    });
    return app;
}
