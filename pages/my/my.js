const app = getApp()
const API = app.API
Page({

  data: {
    username: app.username,
    isLogin: app.isLogin,
    menu: [{
        icon: '../../images/fav.png',
        text: '我的收藏',
        action: 'fav/fav'
      },
      {
        icon: '../../images/about.png',
        text: '關於我們',
        action: 'about/about'
      }
    ]
  },

  onLoad: function(options) {
    wx.showNavigationBarLoading()
  },

  onReady: function() {
    wx.hideNavigationBarLoading()
  },

  navigation: function(e) {
    var action = e.currentTarget.dataset.action
    if (action == 'fav/fav' && !app.isLogin) {
      action = 'login/login?msg=請先登錄'
    }

    wx.navigateTo({
      url: '../' + action
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

    API.logout(this.clearUserInfo, this.clearUserInfo)
  },

  clearUserInfo: function() {
    app.logout()
    wx.hideLoading()
    this.setData({
      username: '未登錄',
      isLogin: false
    })
  }
})