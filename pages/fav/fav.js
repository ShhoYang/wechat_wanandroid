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
  },

  fav: function(e) {
    wx.showModal({
      title: '取消收藏',
      content: '確認取消該收藏',
      success: (res) => {
        if (res.confirm) {
          this.cancleFav(e)
        }
      }
    })
  },

  cancleFav: function(e) {
    var index = e.currentTarget.dataset.index
    var item = this.data.list[index]
    API.cancelFavFromMyFav(item.id, item.originId, data => {
      this.toast('取消收藏成功')
      var d = this.data.list
      d.splice(index, 1)
      this.setData({
        list: d
      })
      if (d.length == 0) {
        this.setData({
          loadMoreStatus: 'noData'
        })
      }
      getApp().hotChange = true
    }, errorMsg => {
      this.toast('取消收藏失敗')
    })
  },

  toast: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  }
})