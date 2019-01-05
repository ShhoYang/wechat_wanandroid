const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["公众号", "知识体系"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSystemInfo({
      success: (res) => {
        let scrollHeight = res.windowHeight
        this.setData({
          scrollHeight: scrollHeight
        })
        wx.startPullDownRefresh()
      }
    })
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    app.wanandroid.getAuthors()
    .then(result=>{
      this.setData({
        authors:result.data.data
      })
    })

    app.wanandroid.getTree()
    .then(result=>{
      this.setData({
        tree:result.data.data
      })
    })
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})