const LOAD_LIST_PROXY = require('../..//utils/loadListProxy')
const API = getApp().API

Page({

  data: {},

  onLoad: function(options) {
    LOAD_LIST_PROXY.setPage(this, this.load)
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function() {
    LOAD_LIST_PROXY.refresh()
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore()
  },

  load: function(page, success, fail) {
    API.getFav(page, success, fail)
  }
})