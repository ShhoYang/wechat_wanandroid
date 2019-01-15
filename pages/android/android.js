const API = getApp().API
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  data: {
    tabs: ["公众号", "知识体系"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  onLoad: function(options) {
    wx.getSystemInfo({
      success: res => {
        let scrollHeight = res.windowHeight
        var that = this
        that.setData({
          scrollHeight: scrollHeight,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        })
        wx.startPullDownRefresh()
      }
    })

    API.getAuthors(data => {
      this.setData({
        authors: data
      })
    }, errorMsg => {})

    API.getTree(data => {
      this.setData({
        tree: data
      })
    }, errorMsg => {})
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})