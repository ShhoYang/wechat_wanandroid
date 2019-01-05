const utils = require('../..//utils/refresh')
const http = getApp().wanandroid
let bannerData = []
let listData = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHideLoreMore: true,
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
      http.getBanner()
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
    listData = []
    utils.loadPageData(true,
      page => {
        return http.getHot(page)
      },
      data => {
        listData = data.data.datas
        this.setData({
          articles: listData
        })
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      isHideLoreMore: false
    })
    utils.loadPageData(
      false,
      page => {
        return http.getHot(page)
      },
      data => {
        listData = listData.concat(data.data.datas)
        this.setData({
          isHideLoreMore: true,
          articles: listData
        })
      })
  },

  link: function(e) {
    wx.navigateTo({
      url: `../detail/detail?url=${e.currentTarget.dataset.link}`
    })
  }
})