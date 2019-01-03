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

function getProjectArticles(id, page) {
  return fetch(`http://www.wanandroid.com/article/list/${page-1}/json?cid=${id}`)
}

function getTree() {
  return fetch('http://www.wanandroid.com/tree/json')
}

module.exports = {
  getBanner,
  getAuthors,
  getTree,
  getWechatArticles,
  getProjectArticles
}