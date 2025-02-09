import { urlJoinParams, normalizePageId, normalizePackageName, normalizeRouterParams } from '../common/utils';
import { ROUTER_KEY, LINK_PROTOCOL } from '../common/index';
export function generatePageUrl({ basename, pageId, mode, packageName: _packageName, url, params }) {
    let processedUrl;
    const packageName = normalizePackageName(_packageName);
    if (mode === 'plugin') {
        processedUrl = `plugin://${packageName}/${pageId}`;
    }
    else if (mode === 'web') {
        return url;
    }
    else {
        pageId = normalizePageId(pageId);
        basename = normalizeBasename(basename);
        processedUrl = packageName ? `/packages/${packageName}/pages/${pageId}/index` : `/pages/${pageId}/index`;
        if (basename) {
            processedUrl = basename ? `/${basename}${processedUrl}` : processedUrl;
        }
    }
    return urlJoinParams(processedUrl, params);
}
function normalizeBasename(basename = '') {
    return basename
        .split('/')
        .filter((item) => !!item && item !== '.')
        .join('/');
}
/**
 * 重写微信的路由方法
 * @param fnName
 * @returns
 */
export function createNavigatorFn(ctx, fnName) {
    return function ({ pageId, packageName = '', params = {}, mode = '', events = undefined, success = () => { }, fail = () => { }, complete = () => { }, url: _url = '', options = {}, }) {
        const { basename = '' } = ctx.__internal__.getConfig();
        const linkUri = _url ? normalizeRouterParams(_url) : {};
        if (mode === 'web' || ['http', 'https'].includes(linkUri.protocol)) {
            console.warn(`${fnName} url can only be used in h5 build`);
            return;
        }
        const pageUrlParams = LINK_PROTOCOL['weda-page'] === linkUri.protocol
            ? { ...linkUri, basename, url: '' }
            : { basename, pageId, mode, packageName, params, url: '' };
        let url = generatePageUrl(pageUrlParams);
        if (fnName === 'navigateTo') {
            navigateToFn(url, { events, success, fail, complete, linkUri, options });
            return;
        }
        wx[fnName]({
            url,
            events,
            success,
            fail,
            complete,
        });
    };
}
/**
 * 页面堆栈10以内使用wx.navigateTo，超过10则使用wx.redirectTo
 * @param url
 * @param param1
 * @returns
 */
export function navigateToFn(url, { events, success, fail, complete, linkUri, options = {} }) {
    const pages = getCurrentPages();
    if (pages && pages.length >= 10) {
        wx.redirectTo({
            url,
            success,
            fail,
            complete,
        });
        return;
    }
    switch (linkUri?.protocol) {
        case LINK_PROTOCOL.miniprogram:
            wx.navigateToMiniProgram({
                ...options,
                appId: linkUri?.appId,
                path: urlJoinParams(linkUri?.path, linkUri.params),
            });
            break;
        case LINK_PROTOCOL.plugin:
            wx.navigateTo({
                ...options,
                url: urlJoinParams(`plugin://${linkUri?.path}`, linkUri.params),
            });
            break;
        default:
            wx.navigateTo({
                url,
                // @types/weixin-app@2.9.3没有events的定义，但实际上官方文档有：https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
                // @ts-ignore
                events,
                success,
                fail,
                complete,
            });
            break;
    }
}
export function createMpRouterAPI(ctx, initData) {
    const reLaunch = createNavigatorFn(ctx, 'reLaunch');
    return {
        navigateBack(...params) {
            const wxPages = getCurrentPages();
            if (wxPages.length <= 1) {
                console.warn('当前页面为首页，没有页面可以返回了');
                return;
            }
            wx.navigateBack(...params);
        },
        navigateTo: createNavigatorFn(ctx, 'navigateTo'),
        reLaunch,
        redirectTo: createNavigatorFn(ctx, 'redirectTo'),
        [ROUTER_KEY.relaunchHome]() {
            let wx_pages = getCurrentPages();
            const { pages = [] } = ctx.__internal__.getConfig();
            if (wx_pages.length !== 1 && wx_pages[0]?.route?.match?.(/pages\/(.*)\/index/)?.[1] === pages[0]?.id) {
                wx.navigateBack({ delta: 10 });
            }
            else if (pages[0]?.id) {
                reLaunch({
                    pageId: pages[0].id,
                });
            }
        },
    };
}
