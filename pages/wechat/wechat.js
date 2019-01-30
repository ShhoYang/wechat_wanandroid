const LOAD_LIST_PROXY = require('../../utils/loadListProxy.js').getProxy()
const FAV_PROXY = require('../../utils/favProxy.js')
const EVENT = require('../../utils/event.js')
const API = getApp().API
let id = 0

var isRefresh = false

Page({

  data: {
    hiddenAuthor: true
  },

  onLoad: function(options) {
    id = options.id
    LOAD_LIST_PROXY.setPage(this, this.load)
    wx.setNavigationBarTitle({
      title: options.author
    })
    wx.startPullDownRefresh()
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
      wx.startPullDownRefresh()
    }
  },

  onPullDownRefresh: function() {
    LOAD_LIST_PROXY.refresh()
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore()
  },

  load: function(page, success, fail) {
    API.getWechatArticles(id, page, success, fail)
  },

  link: function(e) {
    // wx.navigateTo({
    //   url: `../detail/detail?url=${e.currentTarget.dataset.link}`
    // })
  },

  fav: function(e) {
    FAV_PROXY.fav(this, LOAD_LIST_PROXY.getListData(), e)
  }
})