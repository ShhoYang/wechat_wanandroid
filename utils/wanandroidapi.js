const fetch = require('./fetch')

function getBanner() {
  return fetch('http://www.wanandroid.com/banner/json')
}

function getAuthors() {
  return fetch('http://wanandroid.com/wxarticle/chapters/json')
}

function getWechatArticles(id, page) {
  return fetch(`http://wanandroid.com/wxarticle/list/${id}/${page}/json`)
}

function getTree() {
  return fetch('http://www.wanandroid.com/tree/json')
}

module.exports = {
  getBanner,
  getAuthors,
  getWechatArticles,
  getTree
}