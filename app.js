const ganhuo = require('./utils/ganhuoapi.js')

const wanandroid = require('./utils/wanandroidapi.js')

const KEY_USERNAME = 'KEY_USERNAME'

const KEY_COOKIE = 'KEY_COOKIE'

App({
  isLogin: false,
  username: '未登錄',
  cookie: [],
  ganhuo: ganhuo,
  wanandroid: wanandroid,

  onLaunch: function() {
    try {
      var value = wx.getStorageSync(KEY_USERNAME)
      if (value) {
        this.username = value
        this.isLogin = true;
      }
      wx.getStorage({
        key: KEY_COOKIE,
        success: (res) =>{
          if (res.errMsg == 'getStorage:ok') {
            this.cookie = res.data
          }
        }
      })
    } catch (e) {

    }
  },

  logged: function(username, cookie) {
    this.isLogin = true
    this.username = username
    this.cookie = cookie
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
    this.isLogin = false
    this.username = '未登錄'
    this.cookie = []
    wx.removeStorage({
      key: KEY_USERNAME,
      success: function(res) {},
    })
    wx.removeStorage({
      key: KEY_COOKIE,
      success: function(res) {},
    })
  }
})