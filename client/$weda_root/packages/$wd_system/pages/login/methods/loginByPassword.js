import { app } from '../../../../../app/weapps-api';
import loginSuccessCallBack from './loginSuccessCallBack'
/**
 * 账号密码登录
 */
export default async function (instance, {username, password}) {
  const cloudbase = await app.cloud.getCloudInstance();
  const auth = cloudbase.authInstance || cloudbase.auth;

  // 校验
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('账号密码填写不合法');
  }
  username = username.trim();
  password = password.trim();
  // 发起校验
  // const validateResult = await Promise.all([$w.input1.custom.handleValidate(), $w.input2.handleValidate()]);
  // if (validateResult.some((item) => item.length !== 0) || !username || !password) {
  //   app.showModal({
  //       title: '无法提交',
  //       content: '账号或密码填写不合法',
  //       showCancel: false,
  //     });
  //   return;
  // }
  // 登录
  try {
    const res = await auth.signIn({ username, password });
    // 登录完成
    loginSuccessCallBack(instance);
  } catch (e) {
    console.error(e)
    // 错误处理
    if (e?.error === 'invalid_password') {
      app.showModal({
        title: '登录失败',
        content: '密码错误',
        showCancel: false,
      });
    } else if (e?.error === 'not_found') {
      app.showModal({
        title: '登录失败',
        content: '用户不存在',
        showCancel: false,
      });
    } else {
      app.showModal({
        title: '登录失败',
        content: JSON.stringify(e),
        showCancel: false,
      });
    }

  }
}
