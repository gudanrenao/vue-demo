//action提交的是mutation
import * as types from './mutation-types'

export const setLogin = function ({commit}, {isLogin, loginName, Authorization}) {
  commit(types.SET_IS_LOGIN, isLogin)
  commit(types.SET_LOGIN_NAME, loginName)
  commit(types.SET_AUTHORIZATION, Authorization)
}