const app = getApp()
const API = getApp().wanandroid
var username = ''
var password = ''
Page({

  data: {
    buttonDisabled: true
  },

  onLoad: function(options) {

  },

  usernameFocus: function() {
    this.setData({
      usernameFocus: true
    })
  },

  usernameBlur: function() {
    this.setData({
      usernameFocus: false
    })
  },

  passwordFocus: function() {
    this.setData({
      passwordFocus: true
    })
  },

  passwordBlur: function() {
    this.setData({
      passwordFocus: false
    })
  },

  usernameInput: function(e) {
    username = e.detail.value
    this.buttonDisabled()
  },

  passwordInput: function(e) {
    password = e.detail.value
    this.buttonDisabled()
  },

  buttonDisabled: function() {
    var disable = username.length == 0 || password.length < 6
    this.setData({
      buttonDisabled: disable
    })
  },

  login: function(e) {
    wx.showToast({
      title: '正在登錄...',
      icon: 'loading',
      duration: 20000
    })
    var value = e.detail.value
    API.login(value.username, value.password)
      .then(result => {
        var ret = result.data
        if (ret.errorCode == 0) {
          app.isLogin = true
          app.username = ret.data.username
          wx.showToast({
            title: '登錄成功',
            icon: 'success'
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: ret.errorMsg,
            icon: 'none'
          })
        }
      })
  }
})