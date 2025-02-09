import { IAppAPI, IMpAuth, IDevice, IMpInitCloudSDKParams } from '../types/mp';
interface IAppConfig {
    id: string;
    envId?: string;
    staticResourceDomain?: string;
    label?: string;
    version?: string;
    envVersion?: string;
    loginConfigVersion?: string;
    pages?: {
        id: string;
        type?: 'login';
    }[];
}
/**
 * 创建小程序下的app对象，对外暴露
 * @param initData
 * @returns
 */
export declare function createMpApp(initData?: {
    id?: string;
    appConfig?: IAppConfig;
    processAction?: (name: string, action: Function) => Function;
    device?: IDevice;
}): IAppAPI<IMpAuth>;
export declare const app: IAppAPI<IMpAuth>;
export declare const $w: any;
export declare function getWedaAPI(): any;
export declare function init({ appId, envId, isProd, appConfig, ...rest }: IMpInitCloudSDKParams & {
    appConfig?: Omit<IAppConfig, 'id' | 'envId' | 'envVersion'>;
}): Promise<any>;
export {};
