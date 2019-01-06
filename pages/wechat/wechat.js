const REFRESH = require('../..//utils/refresh')
const API = getApp().wanandroid
let id = 0
let listData = []
Page({
  
  data: {
    isHideLoreMore: true
  },

  onLoad: function(options) {
    id = options.id
    wx.setNavigationBarTitle({
      title: options.author
    })
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function() {
    listData = []
    REFRESH.loadPageData(
      true,
      page => {
        return API.getWechatArticles(id, page)
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
        return API.getWechatArticles(id, page)
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