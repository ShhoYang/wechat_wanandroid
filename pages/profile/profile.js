const app = getApp()

Page({

  data: {
    username: app.username,
    isLogin: app.isLogin
  },

  onLoad: function(options) {

  },

  onShow: function() {
    this.setData({
      username: app.username,
      isLogin: app.isLogin
    })
  },

  goLogin: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})