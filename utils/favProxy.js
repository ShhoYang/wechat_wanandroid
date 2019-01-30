const API = getApp().API

/**
 * 收藏操作
 */
function fav(that, listData, e) {
  if (!getApp().globalData.isLogin) {
    wx.navigateTo({
      url: '../../pages/login/login?msg=請先登錄',
    })
    return
  }
  var index = e.currentTarget.dataset.index
  var item = listData[index]
  if (item.collect) {
    cancelFav(that, item, index)
  } else {
    addFav(that, item, index)
  }
}

/**
 * 添加收藏
 */
function addFav(that, item, index) {
  API.addFav(item.id, data => {
    toast('收藏成功', 'success')
    item.collect = true
    that.setData({
      ['list[' + index + '].collect']: true
    })
  }, errorMsg => {
    toast('收藏失敗', 'none')
  })
}

/**
 * 取消收藏
 */
function cancelFav(that, item, index) {
  wx.showModal({
    title: '取消收藏',
    content: '確認取消該收藏',
    success: res => {
      if (res.confirm) {
        doCancleFav(that, item, index)
      }
    }
  })
}

function doCancleFav(that, item, index) {
  API.cancelFav(item.id, data => {
    toast('取消成功', 'success')
    item.collect = false
    that.setData({
      ['list[' + index + '].collect']: false
    })
  }, errorMsg => {
    toast('取消失敗', 'none')
  })
}

function toast(msg, icon) {
  wx.showToast({
    title: msg,
    icon: icon,
    duration: 800
  })
}

module.exports = {
  fav
}