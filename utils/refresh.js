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
      console.error(result.data)
      response(result.data)
    }, 1500)
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