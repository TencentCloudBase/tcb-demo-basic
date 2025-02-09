import { findStatusPage } from '../util';
import { getWedaAPI, auth } from '@cloudbase/weda-client';
const { __internal__ = {} } = auth;
const { redirectToLogin } = __internal__

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    message: String,
    toLogin: Boolean,
    enableCustom: {
      type: Boolean,
      value: false
    },
    pageCodeContext: Object,
    pageUUID: String,
    error: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    message: '',
    visible: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    login() {
      if (this.data.toLogin) {
        redirectToLogin()
      } else {
        getWedaAPI()?.app?.relaunchHome()
      }
    },
    showCustomService() {
      wx.previewImage({
        urls: ['https://weda.cloud.tencent.com/img/customer_service.jpeg'],
        showmenu:true
      })
    }
  },
  lifetimes: {
    attached() {
      if (this.data.enableCustom) {
        const status = findStatusPage();
        const $page = this.data.pageCodeContext || getWedaAPI()?.app?.utils.getCurrentPage();
        const uuid = this.data.pageUUID || $page.uuid;
        if (status && status.id !== uuid) {
          switch (this.data.type) {
            case 'auth': {
              if( $page?.id){
                getWedaAPI().app?.redirectTo({
                  pageId: status.id,
                  params: {
                    statusCode: "403",
                    sourcePagePackageName: $page?.__internal__.packageName,
                    sourcePageId: $page?.id,
                    sourcePageParams: $page?.dataset?.params,
                  }
                })
                return;
              }
            }
            case 'notfound': {
              getWedaAPI().app?.redirectTo({
                pageId: status.id,
                params: {
                  statusCode: "404",
                  // path,
                  // sourcePageParams: query,
                }
              })
              return;
            }
          }
        }
      }
      /**
       * 暂不启用 redirto login
       */
      // this.setData({
      //   toLogin: findLoginPage()
      // })
      setTimeout(() => {
        const data = {
          visible: true
        }
        if (this.data.type === 'loading') {
          data.message = '登录鉴权中...'
        }
        this.setData(data)
      }, 100)
    },
  },
})
