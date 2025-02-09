/**
 * js-sdk2.x和1.x区别：https://docs.cloudbase.net/api-reference/webv3/upgrade#%E8%BF%81%E7%A7%BB%E6%8C%87%E5%8D%97
 */
import { getTcbInstance, CLOUD_SDK, getAccessToken as _getAccessToken, getConfig } from '@cloudbase/weda-cloud-sdk';
import { callWedaApiFn } from '../../common/models/request';
import { objectKeyFirstUpperToLower, filterMap } from '../../common/utils';
import { RELATEDROLES_WHITELIST } from '../../common/constants';
import { app } from '../app';
import { getOrg } from '../../common/auth';
const WEDA_CLIENT_USER_KEY = 'weda_client_user';
let wedaUserInfo = {
    type: '',
    openId: '',
    unionId: '',
    name: '',
    nickName: '',
    avatarUrl: '',
    relatedRoles: [],
    userId: '',
    email: '',
    phone: '',
    licensed: true,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    mainOrg: {},
    orgs: [],
};
let wxOpenId = '';
export const userObj = {
    /**
     * 实实时订阅wedaUserInfo，从CLOUD_SDK去取
     */
    get currentUser() {
        wedaUserInfo = filterCloudSdkUserInfo(CLOUD_SDK.currentUser);
        /**
         * 这里如果获取的很早
         * openId 会为空，不符合直觉
         */
        wedaUserInfo.openId = wxOpenId || wedaUserInfo.openId;
        return wedaUserInfo;
    },
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
export async function signIn(params) {
    try {
        const cloud = await CLOUD_SDK.getCloudInstance();
        const { auth } = cloud;
        const envId = getConfig('envID');
        const tokenRes = await CLOUD_SDK.callWedaApi({
            action: 'GetMiniProgramUserTicket',
            data: {
                Type: `externalUser`,
                EncryptedPhoneData: params.encryptedPhoneCode,
            },
        });
        const token = tokenRes?.token || tokenRes;
        if (!token) {
            throw new Error('请在控制台检查小程序相关配置');
        }
        const { appId: providerId } = wx.getAccountInfoSync().miniProgram;
        const providerToken = await auth.grantProviderToken({
            provider_id: providerId,
            provider_access_token: `${envId} ${token}`,
        });
        if (providerToken.code) {
            throw providerToken;
        }
        const signInWithProviderRes = await auth.signInWithProvider({
            provider_token: providerToken.provider_token,
        });
        if (signInWithProviderRes.code) {
            throw signInWithProviderRes;
        }
        const signInRes = await CLOUD_SDK.signIn({ userType: 'externalUser', force: true });
        if (wx?.setStorageSync) {
            wx.setStorageSync(WEDA_CLIENT_USER_KEY, JSON.stringify(signInRes));
        }
    }
    catch (err) {
        console.warn('登录失败：', err);
        throw err;
    }
}
/**
 * 文档：https://docs.cloudbase.net/api-reference/webv3/authentication#authsignout
 * 登出
 */
export async function signOut() {
    // const { auth } = await getTcbInstance();
    // await (auth as any).signOut(); // 退出登录
    await CLOUD_SDK.signOut(); // 重回到匿名登录
}
/**
 * 调用DescribeWedaUserList接口获取运行时用户信息
 * 文档：https://tcloud4api.woa.com/document/product/1505/72402?!preview&!document=1
 * @param params
 * @returns
 */
export async function getWedaUserList(params) {
    return callWedaApiFn('DescribeWedaUserList', {
        EnvId: params.envId,
        PageNo: 1,
        PageSize: 10,
        UserIds: [params.wedaId],
        IsNoRelatedOrgFlag: true,
    });
}
/**
 * 从CLOUD_SDK接口获取，并过滤白名单
 * @returns
 */
export async function getUserInfoFromCloudSDK(force = false) {
    try {
        const [wedaUser, wxContext] = await Promise.all([CLOUD_SDK.getUserInfo(force), app.utils.getWXContext()]);
        wedaUserInfo = filterCloudSdkUserInfo(wedaUser);
        // 必须要更新wxOpenId的值，先取from_openid再取openid
        wxOpenId = wxContext?.FROM_OPENID || wxContext?.OPENID;
        CLOUD_SDK?.setCurrentUserInfo?.({ wxOpenId });
        return {
            ...wedaUserInfo,
            openId: wxOpenId,
        };
    }
    catch (err) {
        console.warn('请检查登录用户是否正确 catch err:', err);
        throw err;
    }
}
export function filterCloudSdkUserInfo(wedaUser) {
    // 如果没有数据，返回打印提示
    if (!wedaUser) {
        console.warn('请检查登录用户是否正确');
        return wedaUserInfo;
    }
    // @ts-ignore
    if (wedaUser?.userType === 'anonymousUser') {
        return {
            type: wedaUser?.type === undefined ? 2 : wedaUser?.type,
            name: wedaUser?.name ?? '',
            nickName: wedaUser?.nickName ?? '',
            avatarUrl: wedaUser?.avatarUrl ?? '',
            relatedRoles: [],
            openId: wxOpenId || wedaUser?.wxOpenId || '',
            unionId: wedaUser?.wxUnionId || '',
            userId: wedaUser?.wedaId ?? '',
            email: wedaUser?.email ?? '',
            phone: wedaUser?.phone ?? '',
            licensed: undefined,
            mainOrg: {},
            orgs: [],
            corp: null,
            userType: wedaUser?.userType,
        };
    }
    let tmpRelatedRoles = wedaUser?.relatedRoles;
    if (tmpRelatedRoles) {
        tmpRelatedRoles = tmpRelatedRoles.map((item) => {
            const newItem = objectKeyFirstUpperToLower(item);
            return filterMap(RELATEDROLES_WHITELIST, {
                ...newItem,
            });
        });
    }
    const org = getOrg(wedaUser);
    // { Id: 'xxx', Name: 'yyy' } => { id: 'xxx', name: 'yyy' }
    let corp = wedaUser?.corp;
    if (corp) {
        corp = objectKeyFirstUpperToLower(corp);
    }
    return {
        type: wedaUser?.type,
        name: wedaUser?.name ?? '',
        nickName: wedaUser?.nickName ?? '',
        avatarUrl: wedaUser?.avatarUrl ?? '',
        relatedRoles: tmpRelatedRoles ?? [],
        openId: wxOpenId || wedaUser?.wxOpenId || '',
        unionId: wedaUser?.wxUnionId || '',
        userId: wedaUser?.wedaId ?? '',
        email: wedaUser?.email ?? '',
        phone: wedaUser?.phone ?? '',
        licensed: true,
        mainOrg: org.mainOrg,
        orgs: org.orgs,
        corp,
        userType: wedaUser?.userType,
    };
}
/**
 * 获取用户信息
 * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authgetuserinfo-object
 * @returns
 */
export async function getUserInfo(force = false) {
    const wedaUser = await getUserInfoFromCloudSDK(force);
    // 必须更新wedaUserInfo的值
    wedaUserInfo = wedaUser;
    return wedaUser;
}
/**
 * 获取accessToken
 * 文档：https://git.woa.com/QBase/lcap/weda-alternative/blob/main/packages/weda-client/docs/%E5%A4%96%E9%83%A8%E6%96%87%E6%A1%A3.md#authgetaccesstoken-object
 * @returns
 */
export async function getAccessToken() {
    return _getAccessToken();
}
/**
 * 信息为空，暂时不对外
 * 文档：https://docs.cloudbase.net/api-reference/webv3/authentication#authloginscope
 * @returns
 */
export async function loginScope() {
    const { auth } = await getTcbInstance();
    // @ts-ignore
    return auth?.loginScope?.();
}
