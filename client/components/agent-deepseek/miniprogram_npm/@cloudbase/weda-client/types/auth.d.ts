import { IRelatedRoles } from './common';
/**
 * auth.currentUser或auth.getUserInfo返回的用户信息
 */
export interface IUserInfoFromSDK {
    /**
     * 用户类型
     * 0: internalUser 内部用户
     * 1: externalUser 外部用户
     * 2: anonymousUser 匿名用户
     */
    type: number | '';
    /**
     * 用户名
     */
    name: string;
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 微信openid/企业微信openid。
     */
    openId: string;
    /**
     * 微信unionId。
     */
    unionId: string;
    /**
     * 已关联角色
     */
    relatedRoles: IRelatedRoles;
    /**
     * 微搭用户id
     */
    userId: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 手机
     */
    phone: string;
    /**
     * 是否授权
     */
    licensed: boolean;
    /**
     * 主岗部门（展开 部门名称/部门ID）
     */
    mainOrg: IMainOrg;
    /**
     * 兼岗部门（展开 部门名称/部门ID）
     */
    orgs: IOrgs;
    /**
     * 所属的企业
     */
    corp?: ICorp;
    /**
     * 微搭用户头像
     */
    avatarUrl?: string;
    /**
     * 用户登录类型
     */
    userType?: string;
}
/**
 * 所属企业
 */
export interface ICorp {
    id: string;
    name: string;
    [x: string]: unknown;
}
/**
 * 主岗部门（展开 部门名称/部门ID）
 */
export type IMainOrg = IOrg;
/**
 * 部门名称/部门ID
 */
export interface IOrg {
    name: string;
    id: string;
}
/**
 * 兼岗部门（展开 部门名称/部门ID）
 */
export type IOrgs = Array<IOrg>;
