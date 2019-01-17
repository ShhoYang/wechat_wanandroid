Page({

  data: {

  },

  onLoad: function(options) {

  },

  preview: function(e) {
    var url = e.currentTarget.dataset.image
    wx.previewImage({
      urls: ['https://haoshi.co/images/qr.png', 'https://haoshi.co/images/qr_wechat.jpg'],
      current: url
    })
  }
})