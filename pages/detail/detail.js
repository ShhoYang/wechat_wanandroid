Page({

  data: {

  },

  onLoad: function(options) {
    wx.showLoading({
      title: '玩命加载中...'
    })
    var url = options.url
    this.setData({
      url: url
    })
  },

  loadFinished: function() {
    wx.hideLoading()
  }
})