import { signIn, signOut, getUserInfo, getAccessToken, loginScope } from './user';
import { checkAnonymous, getAuthConfig, redirectToLogin, getAccessPermission, findLoginPage, cleanAccessPermissionCache } from './uitl';
/**
 * @description 获取权限、登录相关信息的对象
 */
export declare const auth: {
    signIn: typeof signIn;
    signOut: typeof signOut;
    getUserInfo: typeof getUserInfo;
    getAccessToken: typeof getAccessToken;
    loginScope: typeof loginScope;
    checkAnonymous: typeof checkAnonymous;
    readonly currentUser: import("../../types/auth").IUserInfoFromSDK;
    openIdLoginInWxApp: () => Promise<boolean>;
    unionIdLoginInWxApp: () => Promise<boolean>;
    modifyCurrentUser: any;
    __internal__: {
        redirectToLogin: typeof redirectToLogin;
        getAuthConfig: typeof getAuthConfig;
        getAccessPermission: typeof getAccessPermission;
        findLoginPage: typeof findLoginPage;
        cleanAccessPermissionCache: typeof cleanAccessPermissionCache;
    };
};
