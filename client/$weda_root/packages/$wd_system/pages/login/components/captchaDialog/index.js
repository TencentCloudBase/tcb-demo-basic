import { app } from '../../../../../../app/weapps-api';
import { EXTRA_API } from '../../../../../../common/cloud-sdk';

async function getAuth() {
  const cloudbase = await app.cloud.getCloudInstance();
  const auth = cloudbase.authInstance || cloudbase.auth;
  return auth;
}

Component({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    token: String,
    captchaData: String,
    state: String,
    visible: { type: Boolean, value: false },
  },

  /**
   * 组件的初始数据
   */
  data: {
    message: '',
    key: '',
    loading: false,
  },

  lifetimes: {
    attached: function () {
      EXTRA_API.EVENT_BUS.on('CAPTCHA_DATA_CHANGE', ({ token, url, state }) => {
        this.setData({
          visible: true,
          state,
          token,
          captchaData: url,
        });
      });
    },
    detached() {
      EXTRA_API.EVENT_BUS.off('CAPTCHA_DATA_CHANGE');
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async _createCaptchaData() {
      const auth = await getAuth();
      try {
        const { token, data } = await auth.createCaptchaData({
          state: this.properties.state,
        });

        this.setData({
          key: '',
          token,
          captchaData: data,
        });
      } catch (e) {
        console.error(e);
        this.setData({ message: `错误：${e.error || ''} - ${e.error_description || e.message}` });
      }
    },
    async onRefresh() {
      this.setData({ message: '' });
      await this._createCaptchaData();
    },
    async onVerifyCaptchaData() {
      const auth = await getAuth();
      try {
        const res = await auth.verifyCaptchaData({
          token: this.data.token,
          key: this.data.key,
        });
        this.setData({
          message: '验证成功',
        });
        this.triggerEvent('sunmit', res);
        EXTRA_API.EVENT_BUS.emit('RESOLVE_CAPTCHA_DATA', res);
        wx.nextTick(() => {
          this.setData({
            visible: false,
          });
        });
      } catch (e) {
        console.error(e);
        this.setData({ message: `输入字符和图片不匹配` });
        await this._createCaptchaData();
      }
    },
    onChange(e) {
      this.setData({
        key: e.detail.value,
      });
    },
  },
  observers: {
    visible: function (visible) {
      if (visible && (!this.data.token || !this.data.captchaData)) {
        this.setData({ loading: true });
        this._createCaptchaData().catch((e) => {
          this.setData({ loading: false });
        });
      }
    },
  },
});
