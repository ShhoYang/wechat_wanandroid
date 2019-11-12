Page({

  data: {

  },

  onLoad: function(options) {
    wx.showNavigationBarLoading()
  },

  onReady: function() {
    wx.hideNavigationBarLoading()
  },

  preview: function(e) {
    var url = e.currentTarget.dataset.image
    wx.previewImage({
      urls: ['http://q0ufu2y74.bkt.clouddn.com/wan/qr.png', 'http://q0ufu2y74.bkt.clouddn.com/wan/qr_wechat.jpg'],
      current: url
    })
  }
})