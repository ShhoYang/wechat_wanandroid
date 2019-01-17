Page({

  data: {

  },

  onLoad: function(options) {
    wx.showLoading({
      title: '玩命加载中...'
    })
    var url = options.url
    url = url.replace('http://www.wanandroid.com', 'https://haoshi.co:8443')
    this.setData({
      url: url
    })
  },

  loadFinished: function() {
    wx.hideLoading()
  }
})