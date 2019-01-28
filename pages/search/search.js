const API = getApp().API

Page({

  data: {
    searchKey: ''
  },

  onLoad: function(options) {
    wx.showNavigationBarLoading()
    API.getHotKey(data => {
      this.setData({
        hotKey: data
      })
      wx.hideNavigationBarLoading()
    }, errorMsg => {
      wx.showToast({
        title: 'errorMsg',
        icon: 'none'
      })
      wx.hideNavigationBarLoading()
    })
  },

  input: function(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  search: function(e) {
    this.doSearch(this.data.searchKey)
  },

  searchByHotKey: function(e) {
    this.doSearch(e.currentTarget.dataset.key)
  },

  doSearch: function(key) {
    if (!key) {
      return
    }
    wx.showLoading({
      title: '正在搜索...',
    })
    API.search(key, 1, data => {
      wx.hideLoading()
      if (data.total == 0) {
        wx.showToast({
          title: '沒有搜索到項目內容',
          icon: 'none'
        })
      } else {
        wx.navigateTo({
          url: `../searchResult/searchResult?key=${key}&data=${encodeURIComponent(JSON.stringify(data))}`,
        })
      }
    }, errorMsg => {
      wx.hideLoading()
      wx.showToast({
        title: errorMsg,
        icon: 'none'
      })
    })
  }
})