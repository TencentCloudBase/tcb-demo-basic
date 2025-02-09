/**
 * 初始化tcb，并挂载到_WedaHostConfig
 */
import { setConfig, initTcb as _initTcb } from '@cloudbase/weda-cloud-sdk';
/**
 * 初始化工作台
 * @param params
 */
export async function initTcb({ isProd = true, envId: envID, appId: appID = 'app-fakewdid', tcbClientId = '', endpointType, dataSourceProfiles = [], datasetProfiles = {}, ...rest }) {
    setConfig({
        ...(endpointType ? { endpointType } : {}),
        isProd,
        envID,
        appID,
        tcbClientId,
        dataSourceProfiles,
        datasetProfiles,
        ...rest,
    });
    const res = await _initTcb();
    return res;
}
