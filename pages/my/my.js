const app = getApp()

Page({

  data: {
    username: app.username,
    isLogin: app.isLogin,
    menu: [{
        icon: '../../images/fav.png',
        text: '我的收藏',
        url: '../fav/fav'
      },
      {
        icon: '../../images/about.png',
        text: '關於我們',
        url: '../about/about'
      }
    ]
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
  },

  logout: function() {
    wx.showLoading({
      title: '正在退出登錄...',
    })
    app.logout()
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        username: '未登錄',
        isLogin: false
      })
    }, 2000)
  }
})