const app = getApp()
let page = 1
let bannerData = []
let listData = []
let loading = false
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
    wx.startPullDownRefresh()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (bannerData.length == 0) {
      app.wanandroid.getBanner()
        .then(result => {
          bannerData = result.data.data;
          this.setData({
            banner: bannerData
          })
        })
        .catch(e => {
          console.error(e)
        })
    }

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
      return;
    }
    loading = true;
    wx.showNavigationBarLoading()
    app.ganhuo.getList("Android", page).then(result => {
      setTimeout(() => {
        this.loadFinished()
        listData = listData.concat(result.data.results)
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