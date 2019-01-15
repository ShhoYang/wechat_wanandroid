const app = getApp()
const API = app.API

var username = ''
var password = ''

Page({

  data: {
    buttonDisabled: false
  },

  onLoad: function(options) {
    var msg = options.msg
    if (msg != null) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
  },

  /**
   * 用户名输入监听
   */
  usernameInput: function(e) {
    username = e.detail
    this.buttonDisabled()
  },

  /**
   * 密码输入监听
   */
  passwordInput: function(e) {
    password = e.detail
    this.buttonDisabled()
  },

  /**
   * 按钮是否可以点击
   */
  buttonDisabled: function() {
    var disable = username.length == 0 || password.length < 6
    this.setData({
      buttonDisabled: disable
    })
  },

  /**
   * 登录
   */
  login: function(e) {
    wx.showToast({
      title: '正在登錄...',
      icon: 'loading',
      duration: 20000
    })
    var value = e.detail.value
    API.login(value.username, value.password, data => {
      app.logged(data.username, data.cookie)
      wx.showToast({
        title: '登錄成功',
        icon: 'success'
      })
      wx.navigateBack({
        delta: 1
      })
    }, errorMsg => {
      wx.showToast({
        title: errorMsg,
        icon: 'none'
      })
    })
  }
})