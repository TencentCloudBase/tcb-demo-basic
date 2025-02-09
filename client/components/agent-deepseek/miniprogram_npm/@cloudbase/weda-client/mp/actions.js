import { promisifyAll } from 'miniprogram-api-promise';
import { ACTIONS_KEY } from '../common/index';
import { callWedaApiFn } from '../common/models/index';
import { getEnumValue } from '../common/utils';
// turn to promisify api
const wxp = {};
try {
    const promisedwx = {};
    promisifyAll(wx, promisedwx);
    for (let key in promisedwx) {
        if (typeof promisedwx[key] === 'function') {
            wxp[key] = promisedwx[key];
        }
    }
}
catch (err) {
    // console.log('not in miniprogram, err is ', err)
}
/**
 * 小程序下的scanCode包裹了原生的wx.scanCode
 * @param options
 * @returns
 */
export const scanCode = (options) => {
    const { enableDefaultBehavior, ...restOptions } = options;
    const shouldReturnPromise = !restOptions.success && !restOptions.complete && !restOptions.fail;
    if (shouldReturnPromise) {
        return new Promise((resolve, reject) => {
            wxp
                .scanCode(restOptions)
                .then((res) => {
                if (enableDefaultBehavior) {
                    wxp.showModal({
                        title: '扫描到以下内容',
                        content: res.result,
                        showCancel: false,
                    });
                }
                resolve(res);
            })
                .catch(reject);
        });
    }
    return scanCode(restOptions);
};
export function createMpActionsAPI(options, api) {
    const { processAction = function (name, action) {
        return action;
    }, } = options || {};
    const processedAction = {
        showToast(params = { title: '' }) {
            return wxp.showToast({
                ...params,
                title: params.title === undefined ? '' : params.title,
            });
        },
        showLoading: wxp.showLoading,
        setClipboardData: wxp.setClipboardData,
        hideLoading(params) {
            try {
                return wxp.hideLoading(params).catch((e) => {
                    console.error(e);
                    return { errMsg: 'hideLoading:ok' };
                });
            }
            catch (e) {
                console.error(e);
            }
        },
        showModal: wxp.showModal,
        scanCode,
        [ACTIONS_KEY.callProcess]({ processKey, ProcessKey, startParams, StartParams }) {
            return callWedaApiFn('StartProcessWithParams', {
                ProcessKey: processKey || ProcessKey,
                TriggerType: 1,
                StartParams: startParams || StartParams || [],
            });
        },
        [ACTIONS_KEY.callWorkflow]({ flowId, params = {}, debugEnabled = false }) {
            return callWedaApiFn('StartFlowInstance', {
                FlowId: flowId,
                Params: params,
                DebugEnabled: debugEnabled,
            });
        },
        [ACTIONS_KEY.callPhone]({ tel }) {
            return wxp
                .makePhoneCall({
                phoneNumber: tel,
            })
                .catch((e) => {
                // “取消拨打电话”的场景下，用户不必感知错误
                if (!/makePhoneCall:fail cancel/.test(e.errMsg)) {
                    throw e;
                }
            });
        },
        [ACTIONS_KEY.requestSubscribeMessage]({ params }) {
            return new Promise((resolve, reject) => {
                let tmplIds = [];
                try {
                    if (Array.isArray(params?.tmplIds)) {
                        tmplIds = params?.tmplIds;
                        for (const id of tmplIds) {
                            if (typeof id !== 'string')
                                throw new Error('tmplIds 必须是字符串数组');
                        }
                    }
                    else
                        throw new Error('tmplIds 必须是字符串数组');
                }
                catch (error) {
                    reject(error);
                }
                wxp
                    .requestSubscribeMessage({ tmplIds })
                    .then((res) => resolve({ res }))
                    .catch((err) => reject(err));
            });
        },
        [ACTIONS_KEY.openLocation]: wxp.openLocation,
        /** 不支持 promise，只能用回调函数处理 **/
        [ACTIONS_KEY.reserveChannelsLive]({ params }) {
            return new Promise((resolve, reject) => {
                wxp.reserveChannelsLive({
                    success: (successRes) => {
                        resolve(successRes);
                    },
                    fail: (failRes) => {
                        reject(failRes);
                    },
                    ...params,
                });
            });
        },
        [ACTIONS_KEY.openChannelsUserProfile](params) {
            return new Promise((resolve, reject) => {
                wxp.openChannelsUserProfile({
                    success: (successRes) => {
                        resolve(successRes);
                    },
                    fail: (failRes) => {
                        reject(failRes);
                    },
                    ...params,
                });
            });
        },
        [ACTIONS_KEY.openChannelsLive](params) {
            return new Promise((resolve, reject) => {
                wxp.openChannelsLive({
                    success: (successRes) => {
                        resolve(successRes);
                    },
                    fail: (failRes) => {
                        reject(failRes);
                    },
                    ...params,
                });
            });
        },
        [ACTIONS_KEY.openChannelsEvent](params) {
            return new Promise((resolve, reject) => {
                wxp.openChannelsEvent({
                    success: (successRes) => {
                        resolve(successRes);
                    },
                    fail: (failRes) => {
                        reject(failRes);
                    },
                    ...params,
                });
            });
        },
        [ACTIONS_KEY.openChannelsActivity](params) {
            return new Promise((resolve, reject) => {
                wxp.openChannelsActivity({
                    success: (successRes) => {
                        resolve(successRes);
                    },
                    fail: (failRes) => {
                        reject(failRes);
                    },
                    ...params,
                });
            });
        },
        [ACTIONS_KEY.getChannelsLiveNoticeInfo]({ params }) {
            return new Promise((resolve, reject) => {
                wxp.getChannelsLiveNoticeInfo({
                    success: (successRes) => {
                        resolve(successRes);
                    },
                    fail: (failRes) => {
                        reject(failRes);
                    },
                    ...params,
                });
            });
        },
        [ACTIONS_KEY.getChannelsLiveInfo]({ params }) {
            return new Promise((resolve, reject) => {
                wxp.getChannelsLiveInfo({
                    success: (successRes) => {
                        resolve(successRes);
                    },
                    fail: (failRes) => {
                        reject(failRes);
                    },
                    ...params,
                });
            });
        },
        async [ACTIONS_KEY.exportData]({ data, fileName = 'download', fileType = 'csv', options }) {
            const INVALID_PARAMS = 'InvalidParams';
            if (!Array.isArray(data) && typeof data !== 'object') {
                const error = new Error(`数据格式为对象数组 Object[]，如[{name: 'sam', age: 18}]`);
                error.code = INVALID_PARAMS;
                throw error;
            }
            if (!['csv', 'xlsx'].includes(fileType)) {
                const error = new Error('fileType 仅支持 csv, xlsx');
                error.code = INVALID_PARAMS;
                throw error;
            }
        },
        [ACTIONS_KEY.getEnumValue](params) {
            return getEnumValue(params, api?.__internal__?.$w?.app);
        },
        [ACTIONS_KEY.setTitle](newTitle) {
            return new Promise((res, rej) => wx.setNavigationBarTitle({ title: newTitle, success: res, fail: rej }));
        },
    };
    return Object.keys(processedAction).reduce((map, key) => {
        map[key] = processAction(key, processedAction[key]);
        return map;
    }, { ...wxp });
}
