import { IRelatedRoles } from '../common';
import { IUserInfoFromSDK } from '../auth';
export interface IWebSiginParams {
    username: string;
    password: string;
}
/**
 * auth.currentUser或auth.getUserInfo返回的用户信息
 */
export interface IWebUserInfo {
    /**
     * 用户名
     */
    name: string;
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
export type IWebUserInfoFromSDK = IUserInfoFromSDK;
/**
 * auth.onLoginStateChanged回调参数 appInfo信息
 */
export type IWebAppInfo = Array<IWebAppInfoItem>;
/**
 * auth.onLoginStateChanged回调参数 appInfo子项信息
 */
export interface IWebAppInfoItem {
    /**
     * 菜单导航信息
     */
    appCustomNav: IWebAppCustomNav;
    /**
     * 部署地址
     */
    deployUrl: string;
    /**
     * 应用id
     */
    id: string;
    /**
     * 应用名
     */
    name: string;
}
export interface IWebAppCustomNav {
    /**
     * 是否是双端菜单
     */
    isMultiTerminal: boolean;
    /**
     * pc端菜单
     */
    menuData: Array<string>;
    /**
     * 移动端菜单
     */
    mobileMenuData: Array<string>;
    /**
     * 导航样式
     */
    navigationStyle: string;
}
export interface IWebAuth {
    /**
     * 登录用户，目前支持手机号，邮箱，用户名密码登录。
     * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authsigninparams-object
     * @param params
     */
    signIn: Function;
    /**
     * 登出
     * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authsignout
     */
    signOut: Function;
    /**
     * 获取用户信息
     * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authgetuserinfo-object
     * @returns
     */
    getUserInfo: Function;
    /**
     * 获取当前用户，推荐在 Auth 对象上设置一个回调函数，每当用户登录状态转变时，会触发这个回调函数，并且获得当前的 LoginState
     * 文档：https://docs.cloudbase.net/authentication/auth/manage-users#%E8%AE%A2%E9%98%85%E7%99%BB%E5%BD%95%E7%8A%B6%E6%80%81%E5%8F%98%E5%8C%96%E7%9A%84%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0
     * @returns
     */
    getAccessToken: Function;
    /**
     * 获取当前用户，推荐在 Auth 对象上设置一个回调函数，每当用户登录状态转变时，会触发这个回调函数，并且获得当前的 LoginState
     * 文档：https://docs.cloudbase.net/authentication/auth/manage-users#%E8%AE%A2%E9%98%85%E7%99%BB%E5%BD%95%E7%8A%B6%E6%80%81%E5%8F%98%E5%8C%96%E7%9A%84%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0
     * @returns
     */
    onLoginStateChanged: Function;
}
export interface IUserAllInfo {
    UserInfo: {
        accessibleService: Array<string>;
        avatar: string;
        email: string;
        envId: string;
        name: string;
        phone: string;
        type: number;
        uin: string;
        userId: string;
        uuid: string;
    };
}
export interface IWedaHostUser {
    accessibleService: Array<String>;
    avatar: string;
    email: string;
    envId: string;
    name: string;
    phone: string;
    relatedRoles: Array<{
        envId: string;
        id: string;
        name: string;
        roleDesc: string;
        roleIdentity: string;
        updateTime: string;
    }>;
    type: number;
    uin: string;
    userId: string;
    uuid: string;
}
