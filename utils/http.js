module.exports = function(method, url, data) {
  return new Promise((onResponse, onFailed) => {
    wx.request({
      method: method,
      url: url,
      data: data,
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: onResponse,
      fail: onFailed
    })
  })
}