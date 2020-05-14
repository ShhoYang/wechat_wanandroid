const BASE_URL = 'https://www.wanandroid.com/'

const P = 'POST'

const G = 'GET'

/**
 * 公用方法
 */
function service(method, url, params, success, fail, processCookie) {
  wx.request({
    method: method,
    url: url,
    data: params,
    header: {
      // 'content-type': 'application/json;charset=UTF-8'
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': getApp().globalData.cookie
    },
    success: function(res) {
      if (res.statusCode == 200) {
        var data = res.data
        if (data.errorCode == 0) {
          success(data.data)
        } else {
          fail(data.errorMsg + '')
        }
      } else {
        fail(res.statusCode + '')
      }
    },
    fail: function(res) {
      fail(res)
    }
  })
}

/**
 * 登录
 */
function login(username, password, success, fail) {
  wx.request({
    method: P,
    url: `${BASE_URL}user/login`,
    data: {
      username: username,
      password: password
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    success: function(res) {
      if (res.statusCode == 200) {
        var data = res.data
        if (data.errorCode == 0) {
          data.data.cookie = res.header['Set-Cookie']
          success(data.data)
        } else {
          fail(data.errorMsg + '')
        }
      } else {
        fail(res.statusCode + '')
      }
    },
    fail: function(res) {
      fail(res)
    }
  })
}

/**
 * 注册
 */
function register(username, password, success, fail) {
  service(P, `${BASE_URL}user/register`, {
    username: username,
    password: password,
    repassword: password
  }, success, fail)
}

/**
 * 退出
 */
function logout(success, fail) {
  service(G, `${BASE_URL}user/logout/json`, {}, success, fail)
}

/**
 * 收藏列表
 */
function getFav(page, success, fail) {
  service(G, `${BASE_URL}lg/collect/list/${page - 1}/json`, {}, success, fail)
}

/**
 * 添加收藏
 */
function addFav(id, success, fail) {
  service(P, `${BASE_URL}lg/collect/${id}/json`, {}, success, fail)
}

/**
 * 取消收藏
 */
function cancelFav(id, success, fail) {
  service(P, `${BASE_URL}lg/uncollect_originId/${id}/json`, {}, success, fail)
}

/**
 * 取消收藏
 */
function cancelFavFromMyFav(id, originId, success, fail) {
  service(P, `${BASE_URL}lg/uncollect/${id}/json`, {
    originId: originId
  }, success, fail)
}

/**
 * 轮播图
 */
function getBanner(success, fail) {
  service(G, `${BASE_URL}banner/json`, {}, success, fail)
}

/**
 * 热门
 */
function getHot(page, success, fail) {
  service(G, `${BASE_URL}article/listproject/${page - 1}/json`, {}, success, fail)
}

/**
 * 公众号列表
 */
function getAuthors(success, fail) {
  service(G, `${BASE_URL}wxarticle/chapters/json`, {}, success, fail)
}

/**
 * 公众号文章
 */
function getWechatArticles(id, page, success, fail) {
  service(G, `${BASE_URL}wxarticle/list/${id}/${page}/json`, {}, success, fail)
}

/**
 * 知识体系树
 */
function getTree(success, fail) {
  service(G, `${BASE_URL}tree/json`, {}, success, fail)
}

/**
 * 知识体系文章
 */
function getProjectArticles(id, page, success, fail) {
  service(G, `${BASE_URL}article/list/${page - 1}/json?cid=${id}`, {}, success, fail)
}

/**
 * 搜索热词
 */
function getHotKey(success, fail) {
  service(G, `${BASE_URL}hotkey/json`, {}, success, fail)
}

/**
 * 搜索
 */
function search(key, page, success, fail) {
  service(P, `${BASE_URL}article/query/${page - 1}/json`, {
    k: key
  }, success, fail)
}

module.exports = {
  register,
  login,
  logout,
  getFav,
  getBanner,
  getHot,
  getAuthors,
  getWechatArticles,
  getTree,
  getProjectArticles,
  addFav,
  cancelFav,
  cancelFavFromMyFav,
  getHotKey,
  search
}