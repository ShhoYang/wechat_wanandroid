var isLoading = false
var page = 1

function loadPageData(b, fun, response) {
  if (isLoading) {
    return;
  }
  isLoading = true;
  if (b) {
    page = 1
  }
  wx.showNavigationBarLoading()
  fun(page).then(result => {
    setTimeout(() => {
      loadFinished()
      response(result.data)
    }, 1000)
  })
}

function loadFinished() {
  wx.hideNavigationBarLoading()
  if (page == 1) {
    wx.stopPullDownRefresh()
  }
  page++
  isLoading = false
}

module.exports = {
  loadPageData
}