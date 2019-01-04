const fetch = require('./http')

const BASE_URL = 'http://www.wanandroid.com/'

function getBanner() {
  return fetch(`${BASE_URL}banner/json`)
}

function getHot(page) {
  return fetch(`${ BASE_URL }article/listproject/${page-1}/json`)
}

function getAuthors() {
  return fetch(`${BASE_URL}wxarticle/chapters/json`)
}

function getWechatArticles(id, page) {
  return fetch(`${BASE_URL}wxarticle/list/${id}/${page}/json`)
}

function getProjectArticles(id, page) {
  return fetch(`${BASE_URL}article/list/${page-1}/json?cid=${id}`)
}

function getTree() {
  return fetch(`${BASE_URL}tree/json`)
}

module.exports = {
  getBanner,
  getHot,
  getAuthors,
  getTree,
  getWechatArticles,
  getProjectArticles
}