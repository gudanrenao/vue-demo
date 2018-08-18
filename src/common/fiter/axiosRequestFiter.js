import axios from 'axios'
import store from '~/store'
import * as types from '~/store/mutation-types'

axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('/manageUsers/refreshToken') === -1) {
    //判断是否登录已过期
    if (!store.state.isLogin && config.url.indexOf('/manageUsers/login') === -1) {
      window.location.href = '/'
    } else {
      // 在发送请求之前记录发送的时间,exclude:
      store.commit(types.LAST_REQUEST_TIME, Date.parse(new Date()))
      //在请求头中添加Authorization
      config.headers.Authorization = store.state.Authorization
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});