import { IRelatedRoles } from '../common';
import { IUserInfoFromSDK } from '../auth';
/**
 * 小程序 auth.signIn参数
 */
export interface IMpSiginParams {
    /**
     * 手机号动态令牌。获取方式参考微信文档：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html
     */
    encryptedPhoneCode: string;
}
/**
 * auth.currentUser或auth.getUserInfo返回的用户信息
 */
export interface IMpUserInfo {
    /**
     * 微信openid/企业微信openid。
     */
    openId: string;
    /**
     * 类型。0: 内部用户;1: 外部用户;2: 匿名用户
     */
    type: number;
    /**
     * 已关联角色
     */
    relatedRoles: IRelatedRoles;
    /**
     * 微搭用户id
     */
    userId: string;
}
/**
 * auth.currentUser或auth.getUserInfo返回的用户信息
 */
export type IMpUserInfoFromSDK = IUserInfoFromSDK;
export interface IMpAuth {
    /**
     * 小程序登录，目前支持外部用户登录
     */
    signIn: Function;
    /**
     * 获取用户信息
     * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authgetuserinfo-object
     * @returns
     */
    getUserInfo: Function;
    /**
     * 获取accessToken
     * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authgetaccesstoken-object
     * @returns
     */
    getAccessToken: Function;
}
