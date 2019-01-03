const utils = require('../..//utils/refresh')
const http = getApp().wanandroid
let id = 0
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
  onLoad: function (options) {
    id = options.id
    wx.setNavigationBarTitle({
      title: options.type
    })
    wx.startPullDownRefresh()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    listData = []
    utils.loadPageData(
      true,
      page => {
        return http.getProjectArticles(id, page)
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
  onReachBottom: function () {
    this.setData({
      isHideLoreMore: false
    })
    utils.loadPageData(
      false,
      page => {
        return http.getProjectArticles(id,page)
      },
      data => {
        listData = listData.concat(data.data.datas)
        this.setData({
          isHideLoreMore: true,
          articles: listData
        })
      })
  }
})