const REFRESH = require('../..//utils/refresh')
const API = getApp().wanandroid
let listData = []
Page({

  data: {
    isHideLoreMore: true
  },

  onLoad: function(options) {
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function() {
    listData = []
    REFRESH.loadPageData(
      true,
      page => {
        return API.getFav(page)
      },
      data => {
        listData = data.data.datas
        this.setData({
          articles: listData
        })
      })
  },

  onReachBottom: function() {
    this.setData({
      isHideLoreMore: false
    })
    REFRESH.loadPageData(
      false,
      page => {
        return API.getFav(page)
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