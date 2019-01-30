const API = getApp().API

var username = ''
var password = ''
var confrimPassword = ''

Page({

  data: {
    buttonDisabled: true
  },

  onLoad: function(options) {
    wx.showNavigationBarLoading()
    username = ''
    password = ''
    confrimPassword = ''
  },

  onReady: function() {
    wx.hideNavigationBarLoading()
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
   * 确认密码输入监听
   */
  confirmPasswordInput: function(e) {
    confrimPassword = e.detail
    this.buttonDisabled()
  },

  /**
   * 按钮是否可以点击
   */
  buttonDisabled: function() {
    var disable = username.length == 0 || password.length < 6 || confrimPassword.length < 6
    this.setData({
      buttonDisabled: disable
    })
  },

  /**
   * 注册
   */
  register: function(e) {
    console.error(e)
    if (password != confrimPassword) {
      wx.showToast({
        title: '確認密碼和密碼不符',
        icon: 'none'
      })
      return
    }

    wx.showToast({
      title: '註冊中...',
      icon: 'loading',
      duration: 20000
    })
    var value = e.detail.value

    API.register(value.username, value.password, data => {
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1000
      })

      setTimeout(() => {
        var pages = getCurrentPages()
        var size = pages.length
        var login = pages[size - 2]
        login.setUsername(username)
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }, errorMsg => {
      wx.showToast({
        title: errorMsg,
        icon: 'none'
      })
    })
  }
})