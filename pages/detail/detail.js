Page({
  
  data: {

  },

  onLoad: function(options) {
    wx.showLoading({
      title: '玩命加载中...'
    })
    this.setData({
      url: options.url
    })
  },

  loadFinished: function() {
    wx.hideLoading()
  }
})