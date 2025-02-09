/**
 * 初始化tcb，并挂载到_WedaHostConfig
 */
import { IInitCloudSDKParams } from '../types';
/**
 * 初始化工作台
 * @param params
 */
export declare function initTcb({ isProd, envId: envID, appId: appID, tcbClientId, endpointType, dataSourceProfiles, datasetProfiles, ...rest }: IInitCloudSDKParams): Promise<{
    app: any;
    auth: any;
}>;
