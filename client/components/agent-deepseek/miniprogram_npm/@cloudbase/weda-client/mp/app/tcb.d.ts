/**
 * 初始化tcb，并挂载到_WedaHostConfig
 */
import { IMpInitCloudSDKParams } from '../../types';
/**
 * 初始化工作台
 * @param params
 */
export declare function init({ isAdminPortal, ...params }: IMpInitCloudSDKParams): Promise<{
    app: any;
    auth: any;
}>;
