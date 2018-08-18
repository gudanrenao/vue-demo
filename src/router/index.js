import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/common/login'
import HelloWorld from '~/components/HelloWorld'

Vue.use(Router)
const index = (resolve) => {
  import('../page/common/index').then((content) => {
    resolve(content)
  })
}
const topIndex = (resolve) => {
  import('../page/common/top').then((content) => {
    resolve(content)
  })
}
const merchantIndex = (resolve) => {
  import('../page/merchant/index').then((content) => {
    resolve(content)
  })
}
const scanCodeOrderList = (resolve) => {
  import('~/page/order/scanCodeOrderList').then((content) => {
    resolve(content)
  })
}
export default new Router({
  routes: [
    {
      path: '/index',
      redirect: '/merchant/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/merchant/index',
          component: merchantIndex
        },
        {
          path: '/order/scanCodeOrderList',
          component: scanCodeOrderList
        }
      ]
    }, {
      path: '/topIndex',
      name: 'topIndex',
      component: topIndex
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
