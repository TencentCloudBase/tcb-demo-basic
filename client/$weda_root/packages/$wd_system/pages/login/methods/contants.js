export const phoneNumberPattern = /^1[0-9]{10}$/;
export const phoneVerifyInfoKey = 'sso_phone_verifyInfo'; // 获取短信信息缓存key
export const verifyCodeFailedLimit = 8; // 同一个短信验证码使用8次即提示错误
export const verifyDelay = 60; // 获取验证码倒计时，单位s
export const loginOnly = false;
