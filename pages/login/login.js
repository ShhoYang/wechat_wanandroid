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
    console.error(e)
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
          app.logged(username)
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