export function prefixMsg(msg, prefix = ' - ') {
  return `${msg ? prefix + msg : ''}`;
}

// 登录错误处理
export const parseLoginError = (e) => {
  switch (e.error) {
    case 'not_found':
      return '用户不存在';
    case 'password_not_set':
      return '当前用户未设置密码，请使用验证码登录或第三方登录方式';
    case 'invalid_password':
      if (e.details && e.details.length > 0) {
        return `密码验证失败, 您还有 ${e.details[0].remaining} 次重试机会`;
      }
      return '密码不正确';
    case 'user_pending':
      return '该用户未激活';
    case 'user_blocked':
      return '该用户被停用';
    case 'invalid_status':
      if (e.details && e.details.length > 0) {
        const retryInSeconds = e.details[0].retry_in;
        const retryInTime = retryInSeconds < 3600 ? `${retryInSeconds / 60}分钟` : `${retryInSeconds / 3600}小时`;
        return `您已经超过了密码最大重试次数，请于 ${retryInTime} 后重试`;
      }
      return '您已经超过了密码最大重试次数，请稍后重试';
    case '__invalid_redirect_uri':
      return 'redirect_uri参数无效';
    case 'license_required':
      return '该用户没有产品许可证，请授权后重试';
    case 'unimplemented':
      return '请在控制台上“身份源管理”页面，开启用户名密码登录';
    default:
      return '您输入的帐号或密码不正确，请重新输入';
  }
};

export const parseSmsLoginError = (e) => {
  switch (e.error) {
    case 'not_found':
      return '用户不存在';
    default:
      return parseSignUpError(e);
  }
};

// 注册错误处理
export const parseSignUpError = (e) => {
  switch (e.error) {
    case 'failed_precondition':
      return '您输入的手机号已被注册，请使用其他号码';
    default:
      return parseVerifyError(e);
  }
};

// 验证码验证token
export const parseVerifyError = (e) => {
  switch (e.error) {
    case 'invalid_argument':
      return `您输入的验证码不正确或已过期 ${e.message || ''}`;
    case 'get_verify_code':
      return '请重新获取验证码';
    case 'aborted':
      return '您尝试的次数过多，稍后重试';
    default:
      return parseCommonError(e);
  }
};

// 三方登录表单错误
export const parseProviderSignError = (e) => {
  switch (e.error) {
    case 'permission_denied':
      return '您当前的会话已过期，请返回重试';
    case 'invalid_argument':
      return '您输入的验证码不正确或已过期';
    case 'aborted':
      return '您尝试的次数过多，稍后重试';
    default:
      return parseCommonError(e);
  }
};

// 重置密码错误
export const parseResetPasswordError = (e) => {
  switch (e.error) {
    case 'invalid_argument':
      return '您输入的密码不符合要求, 请重新输入';
    default:
      return parseCommonError(e);
  }
};

// 验证码验证token
export const parseProviderTokenError = (e) => {
  switch (e.error) {
    case 'failed_precondition':
      return `从第三方获取用户信息失败${prefixMsg(e.error_description)}`;
    case 'not_found':
      return `没有找到匹配的用户\n请联系管理员确认您的配置`;
    default:
      return parseCommonError(e);
  }
};

export function parseSmsError(e, verificationTarget, loginOnly) {
  switch (e.error) {
    case 'failed_precondition':
      switch (verificationTarget) {
        case 'USER':
          if (loginOnly) {
            return '用户不存在，请输入在平台注册过的手机号码';
          }
          return '你输入的手机号已被注册，请使用其他号码';
        case 'NOT_USER':
          return '该用户已被注册，请使用其他号码';
        default:
          return '短信功能未开启，请联系管理员开启';
      }
    case 'payment_required':
      return '短信包剩余条数不足，请联系管理员充值';
    case 'aborted':
      return '你尝试的次数过多，稍后重试';
    case 'unavailable':
      return `发件服务不可用，请稍后重试${prefixMsg(e.error_description)}`;
    default:
      return parseCommonError(e);
  }
}

export const parseCommonError = (e) => {
  let msg;
  switch (e.error) {
    // __开头为前端异常
    case '__invalid_redirect_uri':
      msg = 'redirect_uri参数无效';
      break;
    case 'unreachable':
      msg = `网络错误，请检查您的网络连接，稍后重试${prefixMsg(e.error_description)}`;
      break;
    case 'resource_exhausted':
      return '验证码已被使用，或者尝试过于频繁，请稍后重试';
    case 'license_required':
      return '该用户没有产品许可证，请授权后重试';
    default:
      msg = `请刷新后重试${prefixMsg(e.error || e.message)}${prefixMsg(e.error_description)}`;
      break;
  }
  return msg;
};
