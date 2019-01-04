const fetch = require('./http')

function getList(type, page) {
  const url = `https://gank.io/api/data/${type}/10/${page}`
  return fetch(url)
}

module.exports = {
  getList
}