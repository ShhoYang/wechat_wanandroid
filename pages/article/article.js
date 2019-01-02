const app = getApp()
let id = 0
let page = 1
let loading = false
let listData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoreMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    id = options.id
    page = 1
    wx.startPullDownRefresh()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    page = 1
    listData = []
    this.loadPageData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      isHideLoreMore: false
    })
    this.loadPageData()
  },

  loadPageData: function() {
    if (loading) {
      return
    }
    loading = true
    wx.showNavigationBarLoading()
    app.wanandroid.getWechatArticles(id, page)
      .then(result => {
        setTimeout(() => {
          this.loadFinished()
          listData = listData.concat(result.data.data.datas)
          console.error(listData)
          this.setData({
            articles: listData
          })
        }, 1500)
      })
  },

  loadFinished: function() {
    wx.hideNavigationBarLoading()
    if (page == 1) {
      wx.stopPullDownRefresh()
    } else {
      this.setData({
        isHideLoreMore: true
      })
    }
    page++
    loading = false
  }
})