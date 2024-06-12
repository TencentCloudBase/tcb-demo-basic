import { app } from '../../../../../app/weapps-api';
import loginSuccessCallBack from './loginSuccessCallBack'

export default async function (instance, { event }) {
  try {
    const cloud = await app.cloud.getCloudInstance();
    const auth = cloud.auth;
    const { appId: providerId } = wx.getAccountInfoSync().miniProgram;
    const endpointType = app.__internal__ && app.__internal__.getCloudSdkConfig && app.__internal__.getCloudSdkConfig('endpointType');
    const isTcbApi = endpointType === 'tcb-api';
    const phoneCode = event.detail.code
    const providerInfo = {};
    wx.showLoading()
    if (isTcbApi) {
      const { code } = await wx.login();
      providerInfo.provider_id = providerId;
      providerInfo.provider_code = code;
    } else {
      const tokenRes = await app.cloud.callWedaApi({
        action: 'GetMiniProgramUserTicket',
        data: {
          Type: `externalUser`,
          EncryptedPhoneData: phoneCode,
        },
      });
      const token = tokenRes?.token || tokenRes;
      if (!token) {
        throw new Error('请在控制台检查小程序相关配置');
      }
      providerInfo.provider_id = 'weda';
      providerInfo.provider_access_token = `${
        app.utils._getConfig
          ? app.utils._getConfig().envId
          : app.__internal__ && app.__internal__.getConfig && app.__internal__.getConfig().envId
      } ${token}`;
    }

    let providerToken = await auth.grantProviderToken(providerInfo);
    if (providerToken.code) {
      throw providerToken;
    }
    if (isTcbApi) {
      providerToken = await auth.patchProviderToken({
        provider_token: providerToken.provider_token,
        provider_id: providerId,
        provider_params: {
          code: phoneCode
        },
      })
    }
    const signInRes = await auth.signInWithProvider({
      provider_token: providerToken.provider_token,
    });
    if (signInRes.code) {
      throw signInRes;
    }
    await app.cloud.signIn({ userType: 'externalUser', force: true });
    wx.hideLoading()
    loginSuccessCallBack(instance);
  } catch (e) {
    wx.hideLoading()
    console.error('登录失败：', e);
    app.showModal({
      title: '登录失败',
      content: e.errMsg || e.message || JSON.stringify(e),
      showCancel: false,
    })
    throw e;
  }
}
