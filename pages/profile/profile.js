const app = getApp()
Page({
  data: {

  },

  onLoad: function(options) {
    this.setData({
      hiddenNickname: !app.isLogin,
      nickname: app.username
    })
  }
})