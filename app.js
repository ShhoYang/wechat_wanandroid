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