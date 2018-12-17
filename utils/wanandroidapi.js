const fetch = require('./fetch')

function getBanner() {
  return fetch('http://www.wanandroid.com/banner/json')
}

module.exports = {
  getBanner
}