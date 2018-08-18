<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import index from './page/common/index'
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import {baseUrl, maxRequestInterval, tokenPrefix} from '~/common/constant/constant'
  import {SET_AUTHORIZATION, SET_IS_LOGIN} from '~/store/mutation-types'

  export default {
    computed: {
      ...mapGetters(['isLogin', 'Authorization', 'lastRequestTime'])
    },
    components: {index},
    created: function () {
      //启动定时刷新token任务
      this.refreshToken()
      this.$router.push('/login')
    },
    methods: {
      refreshToken: function () {
        //刷新间隔15分钟
        setInterval(() => {
          //判断最后一次请求时间是否超过断线最大时间差
          console.log('请求间隔差=' + (Date.parse(new Date()) - this.lastRequestTime))
          if ((Date.parse(new Date()) - this.lastRequestTime) > `${maxRequestInterval}`) {
            //设置为掉线
            this.$store.commit(`${SET_IS_LOGIN}`, false)
          }
          if (this.isLogin) {
            axios.get(`${baseUrl}/manageUsers/refreshToken`, {
              params: {token: this.Authorization}
            }).then((res) => {
              var newToken = res.data
              if (newToken !== null && newToken.startsWith(`${tokenPrefix}`)) {
                console.log('refreshToken==>SUCCESS-time：' + new Date().toLocaleString())
                //更新token
                this.$store.commit(`${SET_AUTHORIZATION}`, newToken)
              } else {
                console.log('refreshToken==>' + newToken + '-time：' + new Date().toLocaleString())
              }
            }).catch((err) => {
              console.log('refreshToken==>error-time：' + new Date().toLocaleString())
              console.log(err.message)
            })
          } else {
            console.log('refreshToken==>操作已超时不再刷新token：' + new Date().toLocaleString())
          }
        }, 15 * 30 * 1000);
      }
    }
  }
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    /*text-align: center;*/
    height: 100%;
  }

  body, html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
</style>
