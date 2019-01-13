/**
 * 干货
 */

const DELAY_TIME = 0
const LOAD_MORE_HIDDEN = 'hidden'
const LOAD_MORE_LOADING = 'loading'
const LOAD_MORE_NO_DATA = 'noData'
const LOAD_MORE_NO_MORE_DATA = 'noMoreData'
var isLoading = false
var page = 1
var enbaleLoadMore = false
var that = null
var listData = []
var dataCallback = null

/**
 * 保存page对象
 */
function setPage(p, callback) {
  that = p
  dataCallback = callback
}

/**
 * 刷新
 */
function refresh(fun, response) {
  if (isLoading) {
    return;
  }
  wx.showNavigationBarLoading()
  page = 1
  loadData(true, fun, result => {
    if (!result.error) {
      refreshFinished(result.results)
    } else {
      refreshFail(result.errorMsg)
    }
  })
}

/**
 * 加载更多
 */
function loadMore(fun, response) {
  if (!enbaleLoadMore) {
    return
  }
  if (isLoading) {
    return;
  }
  wx.showNavigationBarLoading()
  that.setData({
    loadMoreStatus: LOAD_MORE_LOADING
  })
  loadData(false, fun, result => {
    if (!result.error) {
      loadMoreFinished(result.results)
    } else {
      loadMoreFail(result.errorMsg)
    }
  })
}

/**
 * 加载数据
 */
function loadData(b, fun, response) {
  fun(page).then(result => {
    var code = result.statusCode
    if (code = 200) {
      response(result.data)
    } else if (b) {
      refreshFail(code)
    } else {
      loadMoreFail(code)
    }

  })
}

/**
 * 刷新完成
 */
function refreshFinished(data) {
  setTimeout(() => {
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
    if (data == null || data.length == 0) {
      noData()
    } else {
      listData = data
      if (dataCallback == null) {
        that.setData({
          list: listData
        })

      } else {
        dataCallback(data, listData)
      }
      isNoMore(data.length)
    }
    isLoading = false
  }, DELAY_TIME)
}

/**
 * 加载更多完成
 */
function loadMoreFinished(data) {
  setTimeout(() => {
    wx.hideNavigationBarLoading()
    listData = listData.concat(data)
    if (dataCallback == null) {
      that.setData({
        list: listData,
        loadMoreStatus: LOAD_MORE_HIDDEN
      })

    } else {
      dataCallback(data, listData)
    }

    isLoading = false
    isNoMore(data.length)
  }, DELAY_TIME)
}

/**
 * 没有数据
 */
function noData() {
  that.setData({
    loadMoreStatus: LOAD_MORE_NO_DATA
  })
}

/**
 * 是否全部加载完成
 */
function isNoMore(count) {
  if (count >= 10) {
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
function refreshFail(msg) {
  wx.hideNavigationBarLoading()
  wx.stopPullDownRefresh
}

/**
 * 加载失败
 */
function loadMoreFail(msg) {
  wx.hideNavigationBarLoading()
  that.setData({
    loadMoreStatus: LOAD_MORE_HIDDEN
  })
}

module.exports = {
  setPage,
  refresh,
  loadMore
}