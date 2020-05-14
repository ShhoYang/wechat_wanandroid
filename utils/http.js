const BASE_URL = 'http://dev-mgr-wms.highstreet.top/mgr_wms/'
// const BASE_URL = 'http://mgr.wms.highstreet.top'
// https://up.qiniup.com/

function request(
  url,
  params,
  success,
  fail) {
  wx.request({
    method: 'POST',
    url: BASE_URL + url,
    data: params,
    header: {
      'content-type': 'application/json;charset=UTF-8',
      'Authorization': getApp().globalData.token
    },
    success: function(res) {
      if (res.statusCode == 200) {
        var data = res.data
        if (data.code == '0') {
          success(data.data)
        } else if (data.code = '1003') {
          wx.navigateTo({
            url: '../login2/login?msg=TOKEN失效,请重新登录',
          })
        } else {
          // fail(data.msg)
          failed(data.msg)
        }
      } else {
        // fail(res.statusCode + '')
        failed(res.statusCode + '')
      }
    },
    fail: function(res) {
      wx.hideLoading()
      // fail('失败')
      failed('网络异常')
    },
    complete: function() {

    }
  })
}

function failed(msg) {
  if (msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  }
}


module.exports = {
  request
}