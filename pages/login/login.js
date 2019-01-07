const app = getApp()
const API = getApp().wanandroid

var username = ''
var password = ''
Page({

  data: {
    usernameFocus: true,
    passwordFocus: false,
    buttonDisabled: true
  },

  onLoad: function(options) {

  },

  /**
   * 用户名输入监听
   */
  usernameInput: function(e) {
    console.error('==========' + e.detail.value)
    //username = e.detail.username
    this.buttonDisabled()
  },

  /**
   * 密码输入监听
   */
  passwordInput: function(e) {
    console.error('==========' + e)
    //password = e.detail.password
    this.buttonDisabled()
  },

  /**
   * 按钮是否可以点击
   */
  buttonDisabled: function() {
    // var disable = username.length == 0 || password.length < 6
    // this.setData({
    //   buttonDisabled: disable
    // })
  },

  /**
   * 登录
   */
  login: function(e) {
    console.error('==========' + e.detail)
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