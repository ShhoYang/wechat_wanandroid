const api = require('./http')

const BASE_URL = 'https://gank.io/api/'

const P = "POST"

const G = 'GET'

function getList(type, page) {
  return api(G, `${BASE_URL}data/${type}/10/${page}`)
}

module.exports = {
  getList
}