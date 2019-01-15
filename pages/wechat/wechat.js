const LOAD_LIST_PROXY = require('../..//utils/loadListProxy')
const API = getApp().API
let id = 0

Page({

  data: {
    list: []
  },

  onLoad: function(options) {
    id = options.id
    LOAD_LIST_PROXY.setPage(this, this.load)
    wx.setNavigationBarTitle({
      title: options.author
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
    API.getWechatArticles(id, page, success, fail)
  },

  fav: function(e) {
    var index = e.currentTarget.dataset.index
    var itemCollect = 'list[' + index + '].collect'
    var temp = this.data.list[index].collect
    this.data.list[index].collect = !temp
    this.setData({
      [itemCollect]: !temp
    })
  }
})