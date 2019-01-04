const utils = require('../..//utils/refresh')
const http = getApp().ganhuo
const holderUrl = 'https://ws1.sinaimg.cn/large/0065oQSqly1fymj13tnjmj30r60zf79k.jpg'
let leftColumnHeight = 0
let rightColumnHeight = 0
let imageWidth = 0
let imageCount = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    images: [],
    columnleft: [],
    columnright: [],
    isHideLoreMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    utils.loadPageData(
      true,
      page => {
        return http.getList("福利", page)
      },
      data => {
        let images = data.results
        imageCount = images.length
        this.setData({
          images: images
        })
      })
  },

  onReachBottom: function() {
    this.setData({
      isHideLoreMore: false
    })
    utils.loadPageData(
      false,
      page => {
        return http.getList("福利", page)
      },
      data => {
        let images = data.results
        imageCount = images.length
        this.setData({
          isHideLoreMore: true,
          images: images
        })
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