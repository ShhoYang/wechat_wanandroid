const LOAD_LIST_PROXY = require('../..//utils/loadListProxy')
const API = getApp().API

Page({

  data: {
    banner: []
  },

  onLoad: function(options) {
    LOAD_LIST_PROXY.setPage(this, this.load)
    wx.startPullDownRefresh()
  },

  onShow: function() {
    var app = getApp()
    if (app.hotChange) {
      wx.startPullDownRefresh()
      app.hotChange = false
    }
  },

  onPullDownRefresh: function() {
    if (this.data.banner.length == 0) {
      API.getBanner(data => {
        this.setData({
          banner: data
        })
      }, errorMsg => {

      })
    }
    LOAD_LIST_PROXY.refresh()
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore()
  },

  load: function(page, success, fail) {
    API.getHot(page, success, fail)
  },

  link: function(e) {
    wx.navigateTo({
      url: `../detail/detail?url=${e.currentTarget.dataset.link}`
    })
  },

  fav: function(e) {
    LOAD_LIST_PROXY.fav(e)
  }
})