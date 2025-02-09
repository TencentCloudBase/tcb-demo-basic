import { IRelatedRoles } from '../../types/common';
/**
 * DescribeWedaUserList接口返回参数
 */
export interface IDescribeWedaUserList {
    Total: number;
    UserList: Array<IUserListItem>;
}
export interface IUserListItem {
    Email: string;
    EnvId: string;
    InternalUserType: number;
    Name: string;
    RelatedRoles: IRelatedRoles;
    Source: number;
    Type: number;
    Uin: string;
    UserDesc: string;
    UserExtend: string;
    UserId: string;
    Uuid: string;
}
/**
 * DescribeWedaUserList接口返回参数
 */
export type IUserListRelatedRoles = Array<IUserListRelatedRolesItem>;
/**
 * DescribeWedaUserList接口返回参数
 */
export interface IUserListRelatedRolesItem {
    EnvId: string;
    Id: string;
    Name: string;
    RoleDesc: string;
    RoleIdentity: string;
    UpdateTime: string;
}
export interface ICustomMenu {
    Key: string;
    title: string;
    type: string;
    path: string;
    iconUrl: string;
    children: Array<ICustomMenu>;
    linkTargetBlank: boolean;
    level: number;
}
export interface IGetAdminAppInfoParams {
    uid: string;
    WeappIds?: Array<string>;
}
/**
 * 接口信息：https://iwiki.woa.com/pages/viewpage.action?pageId=1238983284#id-%E4%BC%81%E4%B8%9A%E5%B7%A5%E4%BD%9C%E5%8F%B0%E6%80%BB%E4%BD%93%E8%AE%BE%E8%AE%A1-GetAdminAppInfo(%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BC%81%E4%B8%9A%E5%B7%A5%E4%BD%9C%E5%8F%B0%E5%BA%94%E7%94%A8%E4%BF%A1%E6%81%AF)
 */
export interface IGetAdminAppInfoResponse {
    VisitApps: Array<IVisitAppsItem>;
}
export interface IVisitAppsItem {
    AppCustomNav: any;
    DeployUrl: string;
    Id: string;
    Name: string;
}
export interface IGetResourcesPermissionParams {
    EnvId: string;
    Uid: string;
    Source: number;
    ResourceType: string;
    ResourceIdList: Array<string>;
    EnvType: string;
    SubType?: number;
}
