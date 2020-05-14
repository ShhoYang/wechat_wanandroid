// pages/home/home.js
const http = require('../../utils/http.js')
const qiniuUploader = require('../../utils/qiniuUploader');

Page({

  /**
   * 页面的初始数据
   * 
   * 200429000001
   */
  data: {
    isLogin: true,
    mode: 1,
    code: '200429000001',
    photos: [],
    urls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var isLogin = getApp().isLogin()
    this.setData({
      isLogin: isLogin
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 退出
   */
  logout: function() {
    getApp().logout()
    wx.navigateTo({
      url: '../login2/login',
    })
  },

  /**
   * 模式改变
   */
  rgChange: function(e) {
    this.setData({
      mode: e.detail.value
    })
  },

  /**
   * 扫描二维码
   */
  scan: function() {
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        that.setData({
          code: res.result
        })
      },
      fail(res) {
        wx.sh
      }
    })
  },

  /**
   * 选择图片
   */
  selectPhoto: function() {
    var that = this
    wx.chooseImage({
      count: 20,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        that.setData({
          photos: res.tempFilePaths
        })
      }
    })
  },

  /**
   * 预览图片
   */
  previewPhoto: function(e) {
    var index = e.currentTarget.dataset.index
    var photos = this.data.photos
    wx.previewImage({
      urls: photos,
      current: photos[index]
    })
  },

  /**
   * 删除图片
   */
  deletePhoto: function(e) {
    var index = e.currentTarget.dataset.index
    var photos = this.data.photos
    photos.splice(index, 1)
    this.setData({
      photos: photos
    })
  },

  /**
   * 提交图片
   */
  submit: function() {
    if (!this.data.code) {
      this.t('条码不能为空')
      return
    }
    if (this.data.photos.length == 0) {
      this.t('照片不能为空')
      return
    }
    if (getApp().isLogin()) {
      this.getQiniuToken()
    } else {
      wx.navigateTo({
        url: '../login2/login?msg=请先登录',
      })
    }
  },

  /**
   * 获取七牛token
   */
  getQiniuToken: function() {
    wx.showLoading({
      mask: true,
      title: '正在上传...',
    })
    http.request('common/getQiniuToken', {}, data => {
      var options = {
        region: 'ECN',
        uptoken: data.token,
        domain: data.qnUrl,
        shouldUseQiniuFileName: false
      }
      qiniuUploader.init(options)
      this.data.urls = []
      this.doUpload(data, this.data.photos, 0)
    })
  },

  /**
   * 递归上传
   */
  doUpload(qiniu, files, index) {
    if (index >= files.length) {
      this.uploadImageUrls()
      return
    }
    wx.showLoading({
      title: `第${index+1}张/共${files.length}张`,
      mask: true,
    })

    var that = this

    qiniuUploader.upload(
      files[index],
      (res) => {
        that.data.urls.push(res.fileURL)
        that.doUpload(qiniu, files, index + 1)
      },
      (error) => {
        wx.hideLoading()
        this.t('上传失败')
      },
    )
  },

  /**
   * 上传图片地址
   */
  uploadImageUrls: function() {
    var that = this
    var params = {
      codeType: that.data.mode,
      code: that.data.code,
      picUrls: that.data.urls.join()
    }
    http.request('skuEntityPic/savePic', params, data => {
      that.setData({

        photos: [],
        urls: []
      })
      wx.hideLoading()
      this.t('上传成功', 'success')
    })
  },

  t: function(title, icon = 'none') {
    wx.showToast({
      title: title,
      icon: icon
    })
  }
})