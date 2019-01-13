const LOAD_LIST_PROXY = require('../..//utils/loadListProxy')
const API = getApp().wanandroid
let bannerData = []

Page({

  data: {
    
  },

  onLoad: function(options) {
    LOAD_LIST_PROXY.setPage(this) 
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
    LOAD_LIST_PROXY.refresh(
      page => {
        return API.getHot(page)
      })
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore(
      page => {
        return API.getHot(page)
      })
  },

  link: function(e) {
    wx.navigateTo({
      url: `../detail/detail?url=${e.currentTarget.dataset.link}`
    })
  }
})