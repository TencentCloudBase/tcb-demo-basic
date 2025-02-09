/**
 * 这里是对外暴露接口。必须严谨！！请勿随意对外暴露！！
 */
import * as DS_CLOUD_SDK from '@cloudbase/weda-cloud-sdk';
export { createMpApp, app, $w, getWedaAPI, init } from './app';
export { auth } from './auth/index';
export { ACTIONS_KEY as _ACTIONS_KEY, ROUTER_KEY as _ROUTER_KEY } from '../common/constants';
export { getGeneralOptions as _getGeneralOptions } from './models/index';
export { generatePageUrl } from './router';
export { urlJoinParams, ControlledPromise, APP_LAUNCH_OPTIONS_PROMISE } from '../common/index';
/**
 * @private _前缀的都是内部方法，有可能调整，不推荐外部用户使用
 */
export declare const _WEDA_CLOUD_SDK: {
    setConfig: typeof DS_CLOUD_SDK.setConfig;
    initTcb: () => Promise<void>;
    CLOUD_SDK: {
        dataSources: {};
        callDataSource: typeof DS_CLOUD_SDK.callDataSource;
        callConnector: typeof DS_CLOUD_SDK.callDataSource;
        callModel: typeof DS_CLOUD_SDK.callDataSource;
        IS_WEDA_IDE: boolean;
        version: string;
        utils: {
            wrapperDatasourceMethod(options: import("@cloudbase/weda-cloud-sdk/dist/cloud-api/utils-api").IWrapperDatasourceOptions): (params: any) => Promise<any>;
        };
        getCloudInstance: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api").getCloudInstance;
        callGraphql: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api").callGraphql;
        callFunction: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api").callFunction;
        callWorkflow: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api/business-api").callWorkflow;
        callWedaApi: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api/business-api").callWedaApi;
        callCommonService: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api").callCommonService;
        getTempFileURL: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api/temp-url-api").getTempFileURL;
        getDataSourceViewId: typeof DS_CLOUD_SDK.getDataSourceViewId;
        getDataSourceProfile: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api/business-api").getDataSourceProfile;
        getDataSourceProfileAsync: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api/business-api").getDataSourceProfileAsync;
        setConfig: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api/config").setCloudConfig;
        checkAuth: typeof import("@cloudbase/weda-cloud-sdk/dist/cloud-api/business-api").checkAuth;
        setDataSourceDefaultParams: typeof DS_CLOUD_SDK.setDefaultParams;
    } & {
        signIn: (params?: import("@cloudbase/weda-cloud-sdk/dist/h5/user").ISignInParams) => Promise<import("@cloudbase/weda-cloud-sdk/dist/types").IUserInfo>;
        getUserInfo: (force?: boolean) => Promise<any>;
        signOut: () => Promise<void>;
        anonymousLogin: () => Promise<void>;
        readonly currentUser: import("@cloudbase/weda-cloud-sdk/dist/types").IUserInfo;
        setCurrentUserInfo(data?: Record<string, any>): void;
        getUrlWithOpenidToken(src: string): Promise<string>;
        openIdLoginInWxApp(): Promise<boolean>;
        unionIdLoginInWxApp(): Promise<boolean>;
        modifyCurrentUser: ({ nickName, userName, avatarUrl, description }?: {
            nickName?: string;
            userName?: string;
            avatarUrl?: string;
            description?: string;
        }) => Promise<any>;
    };
    createDataset: typeof DS_CLOUD_SDK.createDataset;
    setLocalDatasetState: typeof DS_CLOUD_SDK.setLocalDatasetState;
    createStateDataSourceVar: typeof DS_CLOUD_SDK.createStateDataSourceVar;
    generateParamsParser: typeof DS_CLOUD_SDK.generateParamsParser;
    setDatasetProfiles: typeof DS_CLOUD_SDK.setDatasetProfiles;
    getDatasetProfiles: typeof DS_CLOUD_SDK.getDatasetProfiles;
    EXTRA_API: {
        setState: typeof import("@cloudbase/weda-cloud-sdk/dist/extra-api").setState;
        setParams: typeof import("@cloudbase/weda-cloud-sdk/dist/extra-api").setParams;
        EVENT_BUS: {
            on(eventName: string, callback: Function): void;
            once(eventName: string, callback: Function): number;
            emit(eventName: string, ...params: unknown[]): Promise<void>;
            off(eventName: string | string[]): void;
            listen(eventName: string, callback: Function): void;
            broadcast(eventName: string, ...args: any[]): void;
            quit(eventName: string, callback: Function): void;
        };
    };
    DS_SDK: {};
};
export { commonCompBehavior } from './behaviors';
export { createComponent } from './runtime/weapp-component';
export { createPage, PAGE_ROOT_SYMBOL, createSimplePageAPIFromLaunchOptions } from './runtime/weapp-page';
export { generateDatasetQuery } from './runtime/query';
export { watchAndSyncDatasetState2Local } from './runtime/watch';
export { concatClassList, px2rpx } from './runtime/style';
export { createComputed } from './runtime/util';
export { get as _lodashGet, set as _lodashSet } from '../vender';
