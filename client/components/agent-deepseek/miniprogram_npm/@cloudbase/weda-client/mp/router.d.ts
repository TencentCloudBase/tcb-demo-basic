import { IAppAPI, IRouterAPI, IMpAuth, IRouterParams } from '../types/mp';
export declare function generatePageUrl({ basename, pageId, mode, packageName: _packageName, url, params }: IRouterParams): any;
/**
 * 重写微信的路由方法
 * @param fnName
 * @returns
 */
export declare function createNavigatorFn(ctx: Omit<IAppAPI<IMpAuth>, keyof IRouterAPI>, fnName: any): ({ pageId, packageName, params, mode, events, success, fail, complete, url: _url, options, }: {
    pageId: any;
    packageName?: string;
    params?: {};
    mode?: string;
    events?: any;
    success?: () => void;
    fail?: () => void;
    complete?: () => void;
    url?: string;
    options?: {};
}) => void;
/**
 * 页面堆栈10以内使用wx.navigateTo，超过10则使用wx.redirectTo
 * @param url
 * @param param1
 * @returns
 */
export declare function navigateToFn(url: any, { events, success, fail, complete, linkUri, options }: {
    events: any;
    success: any;
    fail: any;
    complete: any;
    linkUri: any;
    options?: {};
}): void;
export declare function createMpRouterAPI(ctx: Omit<IAppAPI<IMpAuth>, keyof IRouterAPI>, initData?: any): IRouterAPI;
