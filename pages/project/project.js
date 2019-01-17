const LOAD_LIST_PROXY = require('../../utils/loadListProxy.js').getProxy()
const FAV_PROXY = require('../../utils/favProxy.js')
const API = getApp().API
let id = 0

Page({

  data: {},

  onLoad: function(options) {
    id = options.id
    LOAD_LIST_PROXY.setPage(this, this.load)
    wx.setNavigationBarTitle({
      title: options.type
    })
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function() {
    LOAD_LIST_PROXY.refresh()
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore()
  },

  load: function(page, success, fail) {
    API.getProjectArticles(id, page, success, fail)
  },

  link: function(e) {
    wx.navigateTo({
      url: `../detail/detail?url=${e.currentTarget.dataset.link}`
    })
  },

  fav: function(e) {
    console.error(LOAD_LIST_PROXY.getListData())
    FAV_PROXY.fav(this, LOAD_LIST_PROXY.getListData(), e)
  }
})