const app = getApp()
Page({
  data: {

  },

  onLoad: function(options) {
    wx.showNavigationBarLoading()
    this.setData({
      hiddenNickname: !app.isLogin,
      nickname: app.username
    })
  },

  onReady: function() {
    wx.hideNavigationBarLoading()
  }
})