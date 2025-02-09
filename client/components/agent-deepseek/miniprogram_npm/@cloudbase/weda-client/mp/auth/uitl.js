import { dealCache } from '@cloudbase/weda-cloud-sdk';
import { callWedaApiFn } from '../../common/models/request';
import { getWedaAPI } from '../app';
import { getAccessToken, loginScope } from './user';
import { createSimplePageAPIFromLaunchOptions } from '../runtime/weapp-page';
export async function checkAnonymous() {
    let isAnonymous = true;
    try {
        const { accessToken } = await getAccessToken();
        isAnonymous = !accessToken;
        // 有 token 的情况下需要验证匿名登录需要多验证scope === 'anonymous'
        if (accessToken) {
            const scope = await loginScope();
            isAnonymous = scope === 'anonymous';
        }
    }
    catch (e) { }
    return isAnonymous;
}
export function findLoginPage() {
    const { app } = getWedaAPI();
    const { pages = [], loginConfigVersion } = app.__internal__.getConfig();
    const custom = pages.find((item) => item.type === 'login');
    if (loginConfigVersion) {
        return (custom || {
            id: 'login',
            packageName: '$wd_system',
            uuid: '$wd_system/login',
            type: 'login',
        });
    }
}
let _AUTH_CACHE_MAP = {};
export async function getAccessPermission(appId, packageName = '', pageId, isAdminPortal = false) {
    let cacheKey = `${appId}-${pageId}`;
    if (packageName) {
        const matched = packageName.match(/packages\/(.*)$/);
        const subKey = matched?.[1] || packageName;
        cacheKey = `${appId}-${subKey}-${pageId}`;
    }
    try {
        const localCache = await dealCache({ key: 'RENDER_ACCESS', type: 'get' });
        if (localCache?.[cacheKey]) {
            // 异步更新
            getAccessPermissionRes({ isAdminPortal, cacheKey, appId });
            return localCache?.[cacheKey];
        }
    }
    catch (e) {
        if (_AUTH_CACHE_MAP[cacheKey] !== undefined) {
            return _AUTH_CACHE_MAP[cacheKey];
        }
    }
    return getAccessPermissionRes({ isAdminPortal, cacheKey, appId });
}
async function getAccessPermissionRes({ isAdminPortal, cacheKey, appId }) {
    const res = await callWedaApiFn('DescribeResourcesPermission', {
        ResourceType: isAdminPortal ? 'modelApp' : 'app',
        ResourceIdList: [cacheKey],
        AppResourceId: appId,
    });
    if (Array.isArray(res)) {
        const resourceInfo = res.find((i) => i.ResourceId === cacheKey);
        const value = {
            isAccess: !!resourceInfo?.IsAccess,
            roleId: resourceInfo?.RoleId,
        };
        let localCache = await dealCache({ key: 'RENDER_ACCESS', type: 'get' });
        if (!localCache) {
            localCache = _AUTH_CACHE_MAP;
        }
        localCache[cacheKey] = value;
        dealCache({ key: 'RENDER_ACCESS', value: localCache, type: 'set' });
        _AUTH_CACHE_MAP[cacheKey] = value;
        return value;
    }
    else {
        throw new Error(`鉴权接口返回参数不正确 - ${JSON.stringify(res)}`);
    }
}
export function cleanAccessPermissionCache() {
    _AUTH_CACHE_MAP = {};
    dealCache({ key: 'RENDER_ACCESS', type: 'remove' });
}
export async function redirectToLogin(currentPage = undefined, extraUrlParams = {}) {
    // 去登录则清空权限缓存。
    cleanAccessPermissionCache();
    const { app } = getWedaAPI();
    const loginPage = findLoginPage();
    const home = app?.__internal__?.getConfig()?.pages?.[0];
    let pageMeta;
    if (!currentPage) {
        currentPage = app.utils.getCurrentPage();
    }
    if (currentPage) {
        pageMeta = {
            id: currentPage.id,
            uuid: currentPage.uuid || currentPage.id,
            packageName: currentPage.__internal__.packageName || undefined,
            params: currentPage.params || currentPage.dataset?.params,
        };
    }
    if (!pageMeta) {
        try {
            const options = await Promise.race([
                createSimplePageAPIFromLaunchOptions(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject();
                    }, 300);
                }),
            ]);
            if (options?.id) {
                pageMeta = {
                    id: options.id,
                    uuid: options.uuid,
                    params: options.params,
                };
            }
        }
        catch (e) { }
    }
    const loginPageUUID = loginPage?.uuid || loginPage?.id;
    if (loginPageUUID === pageMeta.uuid) {
        return true;
    }
    if (!pageMeta) {
        pageMeta = { id: home?.id, uuid: home?.id };
    }
    if (loginPage) {
        app.redirectTo({
            pageId: loginPage.id,
            packageName: loginPage.packageName,
            params: {
                ...extraUrlParams,
                sourcePagePackageName: pageMeta.packageName,
                sourcePageId: pageMeta.id,
                sourcePageParams: pageMeta.params,
            },
        });
    }
    else {
        app.showToast({
            title: '用户未登录',
            icon: 'error',
        });
    }
}
let _AUTH_CONFIG_CACHE = null;
export async function getAuthConfig(isAdminPortal = false) {
    const { app } = getWedaAPI();
    if (_AUTH_CONFIG_CACHE) {
        return _AUTH_CONFIG_CACHE;
    }
    const { envId, accessType } = app.__internal__.getConfig();
    try {
        const res = await app.cloud.callWedaApi({
            action: 'DescribeRuntimeResourceStrategy',
            data: {
                ResourceType: isAdminPortal ? 'modelApp' : 'app',
                ResourceId: accessType === 'env' && !isAdminPortal ? envId : app.id,
            },
        });
        const settingData = {};
        // 云api不支持map只能传字符串，需要转换
        res.forEach((item) => {
            settingData[item.Key] = ['AllowRegister', 'NeedLogin'].includes(item.Key) ? item.Value === '1' : item.Value;
        });
        _AUTH_CONFIG_CACHE = settingData;
        return _AUTH_CONFIG_CACHE;
    }
    catch (e) {
        return {
            NeedLogin: false,
            RejectStrategy: 'show_warning',
        };
    }
}
