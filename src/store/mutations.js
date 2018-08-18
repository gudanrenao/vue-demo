import * as types from './mutation-types'

const mutations = {
  [types.SET_IS_LOGIN](state, flag) {
    state.isLogin = flag
  },
  [types.SET_LOGIN_NAME](state, name) {
    state.loginName = name
  },
  [types.SET_AUTHORIZATION](state, authorization) {
    state.Authorization = authorization
  },
  [types.LAST_REQUEST_TIME](state, lastTime) {
    state.lastRequestTime = lastTime
  }
}
export default mutations