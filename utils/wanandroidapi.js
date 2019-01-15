const api = require('./http')

const BASE_URL = 'https://haoshi.co:8080/'

const P = "POST"

const G = 'GET'

function login(username, password) {
  return api(P, `${BASE_URL}user/login`, {
    username: username,
    password: password
  })
}

function getFav(page) {
  return api(G, `${BASE_URL}lg/collect/list/${page-1}/json`)
}

function getBanner() {
  return api(G, `${BASE_URL}banner/json`)
}

function getHot(page) {
  return api(G, `${BASE_URL}article/listproject/${page-1}/json`)
}

function getAuthors() {
  return api(G, `${BASE_URL}wxarticle/chapters/json`)
}

function getWechatArticles(id, page) {
  return api(G, `${BASE_URL}wxarticle/list/${id}/${page}/json`)
}

function getTree() {
  return api(G, `${BASE_URL}tree/json`)
}

function getProjectArticles(id, page) {
  return api(G, `${BASE_URL}article/list/${page - 1}/json?cid=${id}`)
}

module.exports = {
  login,
  getFav,
  getBanner,
  getHot,
  getAuthors,
  getWechatArticles,
  getTree,
  getProjectArticles
}