module.exports = function(url) {
  return new Promise((onResponse, onFailed) => {
    wx.request({
      url: url,
      header: {
        'Constent-Type': 'json'
      },
      success: onResponse,
      fail: onFailed
    })
  })
}