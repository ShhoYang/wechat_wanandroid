const ganhuo = require('./utils/ganhuoapi.js')

const wanandroid = require('./utils/wanandroidapi.js')

App({
  isLogin:false,
  username:'未登錄',
  ganhuo : ganhuo,
  wanandroid : wanandroid
})