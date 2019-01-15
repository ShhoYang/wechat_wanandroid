Page({

  data: {

  },

  onLoad: function(options) {

  },

  preview: function(e) {
    wx.previewImage({
      urls: ['https://haoshi.co/images/qr.png']
    })
  }
})