import { IInitCloudSDKParams } from '../common';
/**
 * 小程序app.init入参
 */
export interface IMpInitCloudSDKParams extends IInitCloudSDKParams {
    isAdminPortal?: boolean;
}
