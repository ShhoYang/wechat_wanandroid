const LOAD_LIST_PROXY = require('../..//utils/loadListProxy')
const API = getApp().wanandroid
let id = 0
Page({

  data: {},

  onLoad: function(options) {
    id = options.id
    LOAD_LIST_PROXY.setPage(this)
    wx.setNavigationBarTitle({
      title: options.type
    })
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function() {
    LOAD_LIST_PROXY.refresh(
      page => {
        return API.getProjectArticles(id, page)
      })
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore(
      page => {
        return API.getProjectArticles(id, page)
      })
  }
})