const LOAD_LIST_PROXY = require('../../utils/loadListProxy.js').getProxy()
const FAV_PROXY = require('../../utils/favProxy.js')
const API = getApp().API

Page({

  data: {
    banner: []
  },

  onLoad: function(options) {
    getApp().a = LOAD_LIST_PROXY
    LOAD_LIST_PROXY.setPage(this, this.load)
    wx.startPullDownRefresh()
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
    // wx.navigateTo({
    //   url: `../detail/detail?url=${e.currentTarget.dataset.link}`
    // })
  },

  fav: function(e) {
    FAV_PROXY.fav(this, LOAD_LIST_PROXY.getListData(), e)
  }
})