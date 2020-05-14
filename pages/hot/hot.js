const LOAD_LIST_PROXY = require('../../utils/loadListProxy.js').getProxy()
const FAV_PROXY = require('../../utils/favProxy.js')
const EVENT = require('../../utils/event.js')
const API = getApp().API

var isRefresh = false

Page({

  data: {
    banner: []
  },

  onLoad: function(options) {
    LOAD_LIST_PROXY.setPage(this, this.load)
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
    if (this.data.banner.length == 0) {
      API.getBanner(data => {
        setData({
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
    FAV_PROXY.fav(this, LOAD_LIST_PROXY.getListData(), e)
  }
})