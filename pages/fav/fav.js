const LOAD_LIST_PROXY = require('../..//utils/loadListProxy')
const API = getApp().wanandroid
Page({

  data: {},

  onLoad: function(options) {
    LOAD_LIST_PROXY.setPage(this)
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function() {
    LOAD_LIST_PROXY.refresh(
      page => {
        return API.getFav(page)
      })
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore(
      page => {
        return API.getFav(page)
      })
  }
})