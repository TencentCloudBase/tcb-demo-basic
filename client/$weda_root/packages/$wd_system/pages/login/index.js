import { app, $app } from '../../../../app/weapps-api';
import loginByPassword from './methods/loginByPassword';
import loginByWXPhone from './methods/loginByWXPhone';
import { parseSmsError } from './methods/errorHandler';
import loginBySms from './methods/loginBySms';
import { getLoginConfig } from '../../../../common/util';
import { phoneNumberPattern, phoneVerifyInfoKey, verifyDelay, loginOnly } from './methods/contants';

function decodePageQuery(query) {
  return Object.keys(query).reduce((decoded, key) => {
    decoded[key] = decodeURIComponent(query[key]);
    return decoded;
  }, {});
}

const BUTTON_CLASSNAME = 'weda-ui weda-button weui-btn weui-btn_primary wd-event-tap';

function setStorage(data) {
  const current = wx.getStorageSync(phoneVerifyInfoKey);
  wx.setStorageSync(phoneVerifyInfoKey, { ...current, ...data });
}

Component({
  data: {
    params: {},
    initing: true,
    error: null,
    settingData: {
      logo: '',
      agreement: {
        items: [],
        enable: false,
      },
      miniprogram: [],
    },
    pageStyle: '',
    agreement: false,
    wxLoginStatus: '',
    passwordVisible: false,
    enablePassword: false,
    enableMpPhone: false,
    enbaleSms: false,
    disableLoginSubmit: false,
    loginButtonClass: BUTTON_CLASSNAME,
    phoneValidateMessage: '手机号为空',
    phoneNum: '',
    defaultPhoneNumber: '',
    smsVerificationInfo: {
      id: '',
      isUser: false,
    },
  },
  methods: {
    async getPhoneCodeNumber(e) {
      const agree = this.checkAgreement();
      if (!agree) {
        return;
      }
      if (e?.detail?.errMsg?.includes('fail') || e?.detail?.errno || !e?.detail?.code) {
        console.warn('获取手机号授权令牌失败:', !e?.detail.code ? { errMsg: '可能基础库版本过低' } : e.detail);

        $app.showModal({
          cancelColor: '#000000',
          cancelText: '取消',
          confirmColor: '#576B95',
          confirmText: '确认',
          showCancel: true,
          title: '获取手机号授权令牌失败',
          content: `获取手机号授权令牌失败: ${e.detail.errno || e.detail?.errMsg || '可能基础库版本过低'}`,
        });

        return;
      }

      return loginByWXPhone(this, { event: e });
    },
    async onLoad(options) {
      try {
        const cache = wx.getStorageSync(phoneVerifyInfoKey);
        if (cache.phoneNum) {
          this.setData({ defaultPhoneNumber: cache.phoneNum, phoneNum: cache.phoneNum, phoneValidateMessage: '' });
        }

        const config = await getLoginConfig().catch(() => {
          return getLoginConfig();
        });
        const query = decodePageQuery(options || {});
        let settingData = {
          logo:
            app.__internal__.resolveStaticResourceUrl(config.logo) ||
            'https://sso-1303824488.cos.ap-shanghai.myqcloud.com/logo.svg',
          agreement: {
            items: [],
            enable: false,
            ...config.agreement,
          },
          miniprogram: config.miniprogram || [],
        };

        const enableSms = this._getEnableSms(settingData);
        const smsDelay =
          enableSms && !cache.phoneNum ? Math.max(0, Math.ceil(((cache?.smsDelay || 0) - +new Date()) / 1000)) : 0;

        this.setData({
          params: query,
          settingData,
          enablePassword: this._getEnablePassword(settingData),
          enableMpPhone: this._getEnableMpPhone(settingData),
          enableSms,
          smsDelay,
          smsVerificationInfo: cache,
          pageStyle: `${this.data.pageStyle}; background-color: ${config.backgroundColor || '#fff'};`,
          initing: false,
        });

        if (smsDelay > 0) {
          this._intervalSender(smsDelay);
        }
      } catch (e) {
        console.error('获取登录配置失败:', e);
        this.setData({
          initing: false,
          error: {
            message: '获取登录配置失败,' + (e.message || ''),
          },
        });
      }
    },
    togglePasswordVisible() {
      this.setData({
        passwordVisible: !this.data.passwordVisible,
      });
    },
    loginByPassword(e) {
      if (!this.checkAgreement()) {
        return;
      }

      const values = e.detail.value;

      return loginByPassword(this, {
        phone: values?.username?.value,
        sms: values?.password?.value,
      });
    },
    loginBySms(e) {
      if (!this.checkAgreement()) {
        return;
      }

      const values = e.detail.value;

      return loginBySms(this, {
        phoneNum: values?.phoneNum,
        verificationCode: values?.verificationCode,
        verificationInfo: this.data.smsVerificationInfo,
        callback: (err, data) => {
          if (err) {
            const { usedCount = 0 } = wx.getStorageSync(phoneVerifyInfoKey) || {};
            setStorage({ usedCount: usedCount + 1 });
          } else {
            setStorage({ usedCount: 0, smsDelay: 0 });
          }
        },
      });
    },
    showAgreement(e) {
      const index = e.currentTarget?.dataset?.index;
      const agreementContent = this.data.settingData.agreement.items[index]?.value;
      this.setData({
        agreementContent,
        isShowAgreement: !!agreementContent,
      });
    },
    checkAgreement() {
      if (this.data.settingData?.agreement?.enable && !this.data.agreement) {
        app.showToast({
          title: '请阅读勾选协议',
          icon: 'error',
          duartion: 1500,
        });

        return false;
      }
      return true;
    },
    onAgreementChange(e) {
      this.setData({
        agreement: e.detail.value.length > 0,
      });
    },
    onPhoneChange(e) {
      const { value } = e.detail;
      if (!phoneNumberPattern.test(value)) {
        this.setData({ phoneValidateMessage: '手机号格式非法', phoneNum: value });
      } else {
        this.setData({ phoneValidateMessage: '', phoneNum: value });
      }
    },
    getCaptcha(e) {
      if (this.data.phoneValidateMessage) {
        wx.showToast({
          icon: 'error',
          title: this.data.phoneValidateMessage,
        });
        return;
      }
      if (this.data.smsDelay > 0) {
        return;
      }
      this._intervalSender(verifyDelay);
      const target = loginOnly ? 'USER' : 'ANY';
      const phoneNum = this.data.phoneNum;
      app.cloud
        .getCloudInstance()
        .then((cloudbase) => {
          return cloudbase.authInstance || cloudbase.auth;
        })
        .then((auth) => {
          setStorage({ phoneNum });
          return auth.getVerification({
            target,
            phone_number: `+86 ${phoneNum}`,
          });
        })
        .then((data) => {
          const verifyInfo = {
            id: data.verification_id,
            isUser: data.is_user,
          };
          this.setData({
            smsVerificationInfo: verifyInfo,
          });
          setStorage({ ...verifyInfo, usedCount: 0 });
          wx.showToast({
            title: '验证码已发送',
          });
        })
        .catch((e) => {
          wx.hideLoading()
          clearInterval(this.timerInterval);
          this.setData({ smsDelay: 0 });
          setStorage({ smsDelay: 0 });
          wx.showModal({
            title: '获取验证码失败',
            content: parseSmsError(e, target, loginOnly),
            showCancel: false,
          });
        });
    },
    _getEnablePassword(settingData) {
      const config = settingData || this.data.settingData;
      return config.miniprogram?.find?.((item) => item.type === 'password')?.enable ?? false;
    },
    _getEnableMpPhone(settingData) {
      const config = settingData || this.data.settingData;
      return !!config.miniprogram.find(function (item) {
        return item.type === 'miniprogram_phone';
      })?.enable;
    },
    _getEnableSms(settingData) {
      const config = settingData || this.data.settingData;
      return !!config.miniprogram.find(function (item) {
        return item.type === 'sms';
      })?.enable;
    },
    _intervalSender(delay) {
      this.setData({ smsDelay: delay });
      const timerInterval = setInterval(() => {
        delay = delay - 1;
        if (delay <= 0) {
          clearInterval(timerInterval);
        }
        this.setData({ smsDelay: delay });
        setStorage({ smsDelay: +new Date() + delay * 1000 });
      }, 1000);
      this.timerInterval = timerInterval;
    },
  },
  observers: {
    'settingData,agreement': function (settingData, agreement) {
      const disabled = settingData?.agreement?.enable && !agreement;
      if (!!this.data.disableLoginSubmit !== disabled) {
        this.setData({ disableLoginSubmit: disabled });
      }
    },
    disableLoginSubmit: function (disableLoginSubmit) {
      this.setData({
        loginButtonClass: `${BUTTON_CLASSNAME} ${disableLoginSubmit ? 'is-disabled' : ''}`,
      });
    },
  },
});
