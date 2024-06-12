import { parseSmsLoginError } from './errorHandler';
import { app } from '../../../../../app/weapps-api';
import loginSuccessCallBack from './loginSuccessCallBack';
import { phoneVerifyInfoKey, verifyCodeFailedLimit, loginOnly } from './contants';

export default async function loginBySms(
  instance,
  { callback, verificationInfo, verificationCode, phoneNum, bindInfo },
) {
  wx.showLoading();
  const { usedCount = 0 } = wx.getStorageSync(phoneVerifyInfoKey) || {};
  try {
    const cloud = await app.cloud.getCloudInstance();
    const auth = cloud.auth;
    const endpointType =
      app.__internal__ && app.__internal__.getCloudSdkConfig && app.__internal__.getCloudSdkConfig('endpointType');
    const isTcbApi = endpointType === 'tcb-api';
    const isV2 = false;

    // 验证码使用次数超过限制，直接提示错误
    if (usedCount >= verifyCodeFailedLimit) {
      throw { error: 'get_verify_code' };
    }
    // 1. 验证验证码
    const { verification_token } = await auth.verify({
      verification_id: isV2 ? undefined : verificationInfo.id,
      verification_token: isV2 ? verificationInfo.id : undefined,
      verification_code: verificationCode,
      version: isV2 ? 'v2' : undefined,
    });
    // 2. 根据是否已经是用户，分别走登录或注册逻辑
    if (verificationInfo.isUser || loginOnly) {
      // 私有化环境或者自定义应用走v1版本的老逻辑
      if (!isV2) {
        await auth.signIn({
          username: `+86 ${phoneNum}`,
          verification_token,
        });
      }
      if (bindInfo) {
        await auth.bindWithProvider({
          provider_token: bindInfo.providerToken,
        });
      }
    } else if (!isV2) {
      // 自定义应用走signUp逻辑
      await auth.signUp({
        phone_number: `+86 ${phoneNum}`,
        verification_token,
        provider_token: bindInfo?.providerId,
      });
    }

    await app.cloud.signIn({ userType: 'externalUser', force: true });
    callback?.(null, 'success');
    wx.hideLoading();
    loginSuccessCallBack(instance);
  } catch (e) {
    wx.hideLoading();
    wx.showModal({
      title: '验证码登录失败',
      content: parseSmsLoginError(e),
    });
    callback?.(new Error(parseSmsLoginError(e)));
  }
}
