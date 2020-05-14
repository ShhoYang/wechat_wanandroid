const EVENT = require('../../utils/event.js')
const app = getApp()
const API = app.API
const globalData = app.globalData

var isRefresh = false

Page({

  data: {
    username: '',
    isLogin: false,
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
    this.setData({
      username: globalData.isLogin ? globalData.username : '未登錄',
      isLogin: globalData.isLogin
    })
    EVENT.register('UserChanged', this, function() {
      isRefresh = true
    })
  },

  onUnload: function() {
    EVENT.unregister('UserChanged', this)
  },

  onShow: function() {
    if (isRefresh) {
      isRefresh = false
      this.setData({
        username: globalData.isLogin ? globalData.username : '未登錄',
        isLogin: globalData.isLogin
      })
    }
  },

  onReady: function() {
    wx.hideNavigationBarLoading()
  },

  navigation: function(e) {
    var action = e.currentTarget.dataset.action
    if (action == 'fav/fav' && !globalData.isLogin) {
      action = 'login/login?msg=請先登錄'
    }

    wx.navigateTo({
      url: '../' + action
    })
  },

  goLogin: function() {
    // this.test()
    wx.navigateTo({
      url: '../login/login',
    })
  },

  logout: function() {
    wx.showLoading({
      title: '正在退出登錄...',
    })
    this.clearUserInfo()
    EVENT.send('UserChanged', {})
    isRefresh = false
    API.logout(function() {}, function() {})
  },

  clearUserInfo: function() {
    app.logout()
    wx.hideLoading()
    this.setData({
      username: '未登錄',
      isLogin: false
    })
  },

  test() {
    wx.setTopBarText({
      text: 'hello, world!'
    })
  },

  selectPhoto: function() {
    wx.chooseImage({
      count: 20,
      sizeType: ['original'],
      sourceType: ['album'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.error('---------', tempFilePaths)
      }
    })
  }
})