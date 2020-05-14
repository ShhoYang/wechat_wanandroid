const API = require('./utils/api.js')

const KEY_USERNAME = 'KEY_USERNAME'

const KEY_COOKIE = 'KEY_COOKIE'

App({

  API: API,

  globalData: {
    username: '未登錄',
    cookie: [],
    isLogin: false
  },

  onLaunch: function() {
    try {
      this.globalData.username = wx.getStorageSync(KEY_USERNAME)
      wx.getStorage({
        key: KEY_COOKIE,
        success: (res) => {
          if (res.errMsg == 'getStorage:ok') {
            var cookie = res.data
            var that = this.globalData
            if (that.username && cookie) {
              that.isLogin = true
              that.cookie = cookie
            }
          }
        }
      })
    } catch (e) {

    }
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      console.warn('是否有新版本', res)
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function(res) {
          console.warn('准备好更新')
          wx.showModal({
            title: '更新提示',
            content: '已有新版本，是否重启更新？',
            success: function(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function(res) {
          console.warn('更新失败', res)
        })
      }
    })
  },

  logged: function(username, cookie) {
    var that = this.globalData
    that.isLogin = true
    that.username = username
    that.cookie = cookie
    wx.setStorage({
      key: KEY_USERNAME,
      data: username
    })
    wx.setStorage({
      key: KEY_COOKIE,
      data: cookie
    })

  },

  logout: function() {
    var that = this.globalData
    that.isLogin = false
    that.cookie = []
    wx.removeStorage({
      key: KEY_COOKIE,
      success: function(res) {}
    })
  }
})