const LOAD_LIST_PROXY = require('../../utils/loadListProxy.js').getProxy()
const FAV_PROXY = require('../../utils/favProxy.js')
const EVENT = require('../../utils/event.js')
const API = getApp().API
let key = ''

var isRefresh = false

Page({

  data: {

  },

  onLoad: function(options) {
    key = options.key
    LOAD_LIST_PROXY.setPage(this, this.load)
    LOAD_LIST_PROXY.refreshFinished(JSON.parse(decodeURIComponent(options.data)))
    wx.setNavigationBarTitle({
      title: key
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
    API.search(key, page, success, fail)
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