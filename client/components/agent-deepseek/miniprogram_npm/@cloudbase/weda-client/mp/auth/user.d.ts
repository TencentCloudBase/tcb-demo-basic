import { IDescribeWedaUserList } from '../../common/types';
import { IMpSiginParams, IAccessToken, IMpUserInfoFromSDK } from '../../types/mp';
export declare const userObj: {
    /**
     * 实实时订阅wedaUserInfo，从CLOUD_SDK去取
     */
    readonly currentUser: import("../../types/auth").IUserInfoFromSDK;
};
/**
 * 小程序登录方式：目前只支持第三方平台登录
 * 文档：https://docs.cloudbase.net/api-reference/webv3/authentication#authgrantprovidertoken
 * 流程如下：
 * 1、使用手机动态令牌。https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html
 * 2、获取token
 * 3、拿到第三方登录token
 * 4、登录外部用户
 * @param params
 */
export declare function signIn(params: IMpSiginParams): Promise<void>;
/**
 * 文档：https://docs.cloudbase.net/api-reference/webv3/authentication#authsignout
 * 登出
 */
export declare function signOut(): Promise<void>;
/**
 * 调用DescribeWedaUserList接口获取运行时用户信息
 * 文档：https://tcloud4api.woa.com/document/product/1505/72402?!preview&!document=1
 * @param params
 * @returns
 */
export declare function getWedaUserList(params: {
    wedaId: string;
    envId: string;
}): Promise<IDescribeWedaUserList>;
/**
 * 从CLOUD_SDK接口获取，并过滤白名单
 * @returns
 */
export declare function getUserInfoFromCloudSDK(force?: boolean): Promise<IMpUserInfoFromSDK>;
export declare function filterCloudSdkUserInfo(wedaUser: any): IMpUserInfoFromSDK;
/**
 * 获取用户信息
 * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authgetuserinfo-object
 * @returns
 */
export declare function getUserInfo(force?: boolean): Promise<IMpUserInfoFromSDK>;
/**
 * 获取accessToken
 * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authgetaccesstoken-object
 * @returns
 */
export declare function getAccessToken(): Promise<IAccessToken>;
/**
 * 信息为空，暂时不对外
 * 文档：https://docs.cloudbase.net/api-reference/webv3/authentication#authloginscope
 * @returns
 */
export declare function loginScope(): Promise<string>;
