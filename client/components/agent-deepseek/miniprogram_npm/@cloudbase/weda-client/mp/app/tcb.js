/**
 * 初始化tcb，并挂载到_WedaHostConfig
 */
import { initTcb as commonInit } from '../../common/tcb';
import { getWedaAPI } from '../app';
import { getAccessToken, getUserInfo } from '../auth/user';
import { checkAnonymous, findLoginPage, getAuthConfig, redirectToLogin } from '../auth/uitl';
/**
 * 初始化工作台
 * @param params
 */
export async function init({ isAdminPortal = false, ...params }) {
    const res = await commonInit({
        beforeCallFunction: async (params) => {
            const { app } = getWedaAPI();
            try {
                let skip = false;
                switch (params?.data?.methodName) {
                    case 'callWedaApi': {
                        if (['GetMiniProgramUserTicket', 'DescribeRuntimeResourceStrategy'].includes(params?.data?.params.action)) {
                            skip = true;
                        }
                        break;
                    }
                }
                // 后续做过滤处理
                if (params?.data?.mode === 'c' && skip) {
                    return params;
                }
                const { accessToken } = await getAccessToken();
                if (accessToken) {
                    params.data.accessToken = accessToken;
                }
            }
            catch (e) {
                if (app?.cloud?.currentUser?.userType === 'externalUser' && e?.error === 'unauthenticated') {
                    app.showToast({
                        title: '登录态失效',
                        icon: 'error',
                    });
                }
                // console.error('beforeCallFunction error', e);
            }
            return params;
        },
        async afterCallFunction(params, error, res) {
            const { app } = getWedaAPI();
            let oauthError = error?.message?.includes?.('PERMISSION_DENIED') ||
                error?.code === 'unauthenticated' ||
                error?.error === 'unauthenticated' ||
                error?.code === 'invalid_grant' ||
                error?.error === 'invalid_grant' ||
                error?.code === 'INVALID_ACCESS_TOKEN';
            if (!oauthError) {
                try {
                    /**
                     * js-sdk v2 实现上吞了所有错误
                     * 返回 new Error(JSON.stringify({code: "OPERATION_FAIL", msg:"[INVALID_ACCESS_TOKEN]XXX"}))
                     */
                    let tcbErrorObj = JSON.parse(error.message);
                    if (tcbErrorObj?.code === 'OPERATION_FAIL' && /\[INVALID_ACCESS_TOKEN\]/.test(tcbErrorObj.msg)) {
                        oauthError = true;
                    }
                }
                catch (e) { }
            }
            if (params?.data?.params?.action != 'DescribeRuntimeResourceStrategy' &&
                (['InnerError.AuthFailure', 'InvalidAccessToken'].includes(res?.result?.code) || oauthError)) {
                const loginPage = findLoginPage();
                if (loginPage) {
                    const authConfig = await getAuthConfig(isAdminPortal);
                    if (authConfig.RejectStrategy === 'to_login') {
                        if (['InnerError.AuthFailure'].includes(res?.result?.code)) {
                            const isAnonymous = await checkAnonymous();
                            if (!isAnonymous)
                                return;
                            // 匿名用户越权去登录
                        }
                        await redirectToLogin();
                    }
                    else if (authConfig.RejectStrategy === 'show_warning') {
                        if (oauthError) {
                            const isAnonymous = await checkAnonymous();
                            if (!isAnonymous) {
                                await redirectToLogin();
                                return;
                            }
                        }
                        app.showToast({
                            title: '接口无访问权限',
                            icon: 'error',
                        });
                    }
                }
            }
        },
        ...params,
    });
    await getUserInfo();
    return res;
}
