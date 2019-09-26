// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('../../libs/runtime')

const app = getApp()

Page({

  db: null, // db instance
  /**
   * 页面的初始数据
   */
  data: {
    title: 'user',
    isAuthorized: false, // 已取得授权
    userInfo: app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    this.db = wx.cloud.database()
    this.checkAuthSetting()
    this.checkUser()
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '小程序·云开发体验 - 用户管理',
      path: '/pages/user/index',
    }
  },

  // 检测权限，在旧版小程序若未授权会自己弹起授权
  checkAuthSetting() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: async (res) => {
              if (res.userInfo) {
                const userInfo = res.userInfo
                // 将用户数据放在临时对象中，用于后续写入数据库
                this.setUserTemp(userInfo)
              }

              const userInfo = this.data.userInfo || {}
              userInfo.isLoaded = true
              this.setData({
                userInfo,
                isAuthorized: true
              })
            }
          })
        } else {
          this.setData({
            userInfo: {
              isLoaded: true,
            }
          })
        }
      }
    })
  },

  // 检测小程序的 session 是否有效
  async checkUser() {
    const Users = this.db.collection('users')
    const users = await Users.get()

    wx.checkSession({
      success: () => {
        // session_key 未过期，并且在本生命周期一直有效
        // 数据里有用户，则直接获取
        if (users.data.length && this.checkSession(users.data[0].expireTime || 0)) {
          this.setUserInfo(users.data[0])
        } else {
          this.setUserInfo()
          // 强制更新并新增了用户
          this.updateSession()
        }
      },
      fail: () => {
        // session_key 已经失效，需要重新执行登录流程
        this.updateSession()
      }
    })
  },

  // 更新 session_key
  updateSession() {
    wx.login({
      success: async (res) => {
        try {
          await wx.cloud.callFunction({
            name: 'user-session',
            data: {
              code: res.code
            }
          })
        } catch (e) {

        }
      }
    })
  },

  // 检查用户是否登录态还没过期
  checkSession(expireTime = 0) {
    if (Date.now() > expireTime) {
      return false
    }

    return true
  },

  // 设置用户数据
  setUserInfo(userInfo = {}, cb = () => {}) {
    userInfo.isLoaded = true

    // 去掉敏感信息 session_key
    if (Object.prototype.hasOwnProperty.call(userInfo, 'session_key')) {
      delete userInfo.session_key
    }

    app.globalData.userInfo = userInfo
    this.setData({
      userInfo,
    }, cb)
  },

  // 设置临时数据，待 “真正登录” 时将用户数据写入 collection "users" 中
  setUserTemp(userInfo = null, isAuthorized = true, cb = () => {}) {
    this.setData({
      userTemp: userInfo,
      isAuthorized,
    }, cb)
  },

  // 手动获取用户数据
  async bindGetUserInfoNew(e) {
    const userInfo = e.detail.userInfo
    // 将用户数据放在临时对象中，用于后续写入数据库
    this.setUserTemp(userInfo)
  },

  // 获取用户手机号码
  async bindGetPhoneNumber(e) {
    wx.showLoading({
      title: '正在获取',
    })

    try {
      const data = this.data.userTemp
      const result = await wx.cloud.callFunction({
        name: 'user-login-register',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          user: {
            nickName: data.nickName,
            avatarUrl: data.avatarUrl,
            gender: data.gender
          }
        }
      })

      if (!result.result.code && result.result.data) {
        this.setUserInfo(result.result.data)
      }

      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      wx.showToast({
        title: '获取手机号码失败，请重试',
        icon: 'none'
      })
    }
  },

  // 退出登录
  async bindLogout() {
    const userInfo = this.data.userInfo

    await this.db.collection('users').doc(userInfo._id).update({
      data: {
        expireTime: 0
      }
    })

    this.setUserInfo()
  }
})
