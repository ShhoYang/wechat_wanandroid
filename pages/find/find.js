const LOAD_LIST_PROXY = require('../..//utils/loadListProxy2')
const API = getApp().ganhuo
const holderUrl = 'https://ws1.sinaimg.cn/large/0065oQSqly1fymj13tnjmj30r60zf79k.jpg'
let leftColumnHeight = 0
let rightColumnHeight = 0
let imageWidth = 0
let imageCount = 0

Page({
  data: {
    scrollHeight: 0,
    images: [],
    columnleft: [],
    columnright: []
  },

  onLoad: function(options) {
    LOAD_LIST_PROXY.setPage(this, (currentPageData, totalData) => {
      console.error(currentPageData)
      imageCount = currentPageData.length
      this.setData({
        images: currentPageData
      })
    })
    wx.getSystemInfo({
      success: (res) => {
        let scrollHeight = res.windowHeight
        imageWidth = res.windowWidth / 2
        this.setData({
          scrollHeight: scrollHeight
        })
        wx.startPullDownRefresh()
      }
    })
  },

  onPullDownRefresh: function() {
    this.data.images = []
    this.data.columnleft = []
    this.data.columnright = []
    leftColumnHeight = 0
    rightColumnHeight = 0
    LOAD_LIST_PROXY.refresh(
      page => {
        return API.getList("福利", page)
      })
  },

  onReachBottom: function() {
    LOAD_LIST_PROXY.loadMore(
      page => {
        return API.getList("福利", page)
      })
  },

  onImageError: function(e) {
    let index = e.currentTarget.dataset.index
    let img = 'images[' + index + '].url'
    this.data.images[index].url = holderUrl
    this.setData({
      [img]: holderUrl
    })
  },

  onImageLoad: function(e) {
    let w = e.detail.width
    let h = e.detail.height
    let scale = imageWidth / w
    let imageHeight = h * scale

    let index = e.currentTarget.dataset.index
    let image = this.data.images[index];
    image.height = imageHeight

    let columnleft = this.data.columnleft
    let columnright = this.data.columnright

    if (leftColumnHeight <= rightColumnHeight) {
      leftColumnHeight += imageHeight
      columnleft.push(image)
    } else {
      rightColumnHeight += imageHeight
      columnright.push(image)
    }

    imageCount--
    if (0 == imageCount) {
      this.data.images = []
      this.setData({
        columnleft: columnleft,
        columnright: columnright
      })
    }
  },

  preImage: function(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url]
    })
  }
})