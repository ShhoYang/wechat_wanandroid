Page({

  data: {

  },

  onLoad: function(options) {

  },

  preview:function(e){
    wx.previewImage({
      urls: ['http://haoshi.co/apk_qr.png']
    })
  }
})