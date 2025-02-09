import { signIn, signOut, getUserInfo, getAccessToken, loginScope, userObj } from './user';
import { checkAnonymous, getAuthConfig, redirectToLogin, getAccessPermission, findLoginPage, cleanAccessPermissionCache, } from './uitl';
import { CLOUD_SDK } from '@cloudbase/weda-cloud-sdk';
/**
 * @description 获取权限、登录相关信息的对象
 */
export const auth = {
    signIn,
    signOut,
    getUserInfo,
    getAccessToken,
    loginScope,
    checkAnonymous,
    get currentUser() {
        return userObj.currentUser;
    },
    openIdLoginInWxApp: CLOUD_SDK.openIdLoginInWxApp,
    unionIdLoginInWxApp: CLOUD_SDK.unionIdLoginInWxApp,
    modifyCurrentUser: CLOUD_SDK.modifyCurrentUser,
    __internal__: {
        redirectToLogin,
        getAuthConfig,
        getAccessPermission,
        findLoginPage,
        cleanAccessPermissionCache,
    },
};
