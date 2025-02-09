/**
 * 这里是对外暴露接口。必须严谨！！请勿随意对外暴露！！
 */
import * as DS_CLOUD_SDK from '@cloudbase/weda-cloud-sdk';
import { auth } from './auth/index';
export { createMpApp, app, $w, getWedaAPI, init } from './app';
export { auth } from './auth/index';
export { ACTIONS_KEY as _ACTIONS_KEY, ROUTER_KEY as _ROUTER_KEY } from '../common/constants';
export { getGeneralOptions as _getGeneralOptions } from './models/index';
export { generatePageUrl } from './router';
export { urlJoinParams, ControlledPromise, APP_LAUNCH_OPTIONS_PROMISE } from '../common/index';
/**
 * @private _前缀的都是内部方法，有可能调整，不推荐外部用户使用
 */
export const _WEDA_CLOUD_SDK = {
    setConfig: DS_CLOUD_SDK.setConfig,
    // initTcb: DS_CLOUD_SDK.initTcb,
    initTcb: async () => {
        await DS_CLOUD_SDK.initTcb();
        await auth.getUserInfo();
    },
    CLOUD_SDK: DS_CLOUD_SDK.CLOUD_SDK,
    createDataset: DS_CLOUD_SDK.createDataset,
    setLocalDatasetState: DS_CLOUD_SDK.setLocalDatasetState,
    createStateDataSourceVar: DS_CLOUD_SDK.createStateDataSourceVar,
    generateParamsParser: DS_CLOUD_SDK.generateParamsParser,
    setDatasetProfiles: DS_CLOUD_SDK.setDatasetProfiles,
    getDatasetProfiles: DS_CLOUD_SDK.getDatasetProfiles,
    EXTRA_API: DS_CLOUD_SDK.EXTRA_API,
    DS_SDK: DS_CLOUD_SDK.DS_SDK,
};
export { commonCompBehavior } from './behaviors';
export { createComponent } from './runtime/weapp-component';
export { createPage, PAGE_ROOT_SYMBOL, createSimplePageAPIFromLaunchOptions } from './runtime/weapp-page';
export { generateDatasetQuery } from './runtime/query';
export { watchAndSyncDatasetState2Local } from './runtime/watch';
export { concatClassList, px2rpx } from './runtime/style';
export { createComputed } from './runtime/util';
export { get as _lodashGet, set as _lodashSet } from '../vender';
