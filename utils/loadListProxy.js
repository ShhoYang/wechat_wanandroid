/**
 * 创建一个代理对象
 */
function getProxy() {
  return new Proxy()
}

function Proxy() {
  const DELAY_TIME = 1000
  const LOAD_MORE_HIDDEN = 'hidden'
  const LOAD_MORE_LOADING = 'loading'
  const LOAD_MORE_NO_DATA = 'noData'
  const LOAD_MORE_NO_MORE_DATA = 'noMoreData'

  const API = getApp().API

  var isLoading = false
  var page = 1
  var enbaleLoadMore = false
  var listData = []
  var that = null
  var loadFun = null
  var dataCallback = null

  /**
   * 保存page对象
   */
  this.setPage = function(p, fun, callback) {
    that = p
    loadFun = fun
    dataCallback = callback
  }

  /**
   * 刷新
   */
  this.refresh = function() {
    if (isLoading) {
      return;
    }
    // wx.showNavigationBarLoading()
    page = 1
    loadFun(page,
      data => this.refreshFinished(data),
      errorMsg => this.refreshFail(errorMsg)
    )
  }

  /**
   * 加载更多
   */
  this.loadMore = function() {
    if (!enbaleLoadMore) {
      return
    }
    if (isLoading) {
      return;
    }
    // wx.showNavigationBarLoading()
    that.setData({
      loadMoreStatus: LOAD_MORE_LOADING
    })
    loadFun(page,
      data => this.loadMoreFinished(data),
      errorMsg => this.loadMoreFail(errorMsg)
    )
  }

  /**
   * 刷新完成
   */
  this.refreshFinished = function(data) {
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      var list = data.datas
      if (list == null || list.length == 0) {
        this.noData()
      } else {
        listData = list
        if (dataCallback == null) {
          that.setData({
            list: listData
          })

        } else {
          dataCallback(list, listData)
        }

        this.isNoMore(data.pageCount)
      }
      isLoading = false
    }, DELAY_TIME)
  }

  /**
   * 加载更多完成
   */
  this.loadMoreFinished = function(data) {
    setTimeout(() => {
      //wx.hideNavigationBarLoading()
      var list = data.datas
      listData = listData.concat(list)
      if (dataCallback == null) {
        that.setData({
          list: listData,
          loadMoreStatus: LOAD_MORE_HIDDEN
        })

      } else {
        dataCallback(list, listData)
      }

      isLoading = false
      this.isNoMore(data.pageCount)
    }, DELAY_TIME)
  }

  /**
   * 没有数据
   */
  this.noData = function() {
    that.setData({
      loadMoreStatus: LOAD_MORE_NO_DATA
    })
  }

  /**
   * 是否全部加载完成
   */
  this.isNoMore = function(pageCount) {
    if (page < pageCount) {
      enbaleLoadMore = true
      page++

    } else {
      that.setData({
        loadMoreStatus: LOAD_MORE_NO_MORE_DATA
      })
      enbaleLoadMore = false
    }
  }

  /**
   * 刷新失败
   */
  this.refreshFail = function(msg) {
    // wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh
    this.toast('刷新失敗')
  }

  /**
   * 加载失败
   */
  this.loadMoreFail = function(msg) {
    // wx.hideNavigationBarLoading()
    that.setData({
      loadMoreStatus: LOAD_MORE_HIDDEN
    })
    this.toast('加載失敗')
  }

  this.toast = function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  }

  this.getListData = function() {
    return listData
  }
}
module.exports = {
  getProxy
}