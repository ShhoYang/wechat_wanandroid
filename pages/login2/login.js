const http = require('../../utils/http.js')
const md5 = require('../../utils/md5.js')

var username = ''
var password = ''

Page({

  data: {
    buttonDisabled: true
  },

  onLoad: function(options) {
    wx.showNavigationBarLoading()
    var msg = options.msg
    if (msg != null) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
    var name = getApp().globalData.username
    if (username) {
      this.setUsername(name)
    }
  },

  onReady: function() {
    wx.hideNavigationBarLoading()
  },

  setUsername: function(name) {
    username = name
    password = ''
    this.setData({
      username: name,
      password: '',
      buttonDisabled: true
    })
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
    var disable = username.length == 0 || password.length == 0
    this.setData({
      buttonDisabled: disable
    })
  },

  /**
   * 登录
   */
  login: function(e) {
    wx.showLoading({
      title: '正在登录...',
    })
    var value = e.detail.value
    var params = {
      account: value.username,
      password: md5.md5(value.password)
    }

    http.request('user/login', params, data => {
      getApp().logged(data.account, data.token)
      wx.hideLoading()
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      wx.navigateBack({
        delta: 1
      })
    })
  }
})