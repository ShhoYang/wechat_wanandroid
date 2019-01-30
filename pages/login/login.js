const EVENT = require('../../utils/event.js')
const app = getApp()
const API = app.API

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
    var name = app.globalData.username
    if (name != null && name != '' && name != '未登錄') {
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
      wx.showToast({
        title: '登錄成功',
        icon: 'success'
      })
      app.logged(data.username, data.cookie)
      EVENT.send('UserChanged', '')
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