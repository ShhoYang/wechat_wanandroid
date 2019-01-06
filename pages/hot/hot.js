const REFRESH = require('../..//utils/refresh')
const API = getApp().wanandroid
let bannerData = []
let listData = []

Page({

  data: {
    isHideLoreMore: true,
  },

  onLoad: function(options) {
    wx.startPullDownRefresh()
  },

  onPullDownRefresh: function() {
    if (bannerData.length == 0) {
      API.getBanner()
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
    REFRESH.loadPageData(true,
      page => {
        return API.getHot(page)
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
        return API.getHot(page)
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