const ganhuo = require('./utils/ganhuoapi.js')

const wanandroid = require('./utils/wanandroidapi.js')

const KEY_USERNAME = 'KEY_USERNAME'

App({
  isLogin: false,
  username: '未登錄',
  ganhuo: ganhuo,
  wanandroid: wanandroid,

  onLaunch: function() {
    try {
      var value = wx.getStorageSync(KEY_USERNAME)
      if (value) {
        this.username = value
        this.isLogin = true;
      }
    } catch (e) {

    }
  },

  logged: function(username) {
    this.isLogin = true
    this.username = username
    wx.setStorage({
      key: KEY_USERNAME,
      data: username,
    })

  },

  logout: function() {
    this.isLogin = false
    this.username = '未登錄'
    wx.removeStorage({
      key: KEY_USERNAME,
      success: function(res) {},
    })
  }
})