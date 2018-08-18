<template>
  <div>
    <el-form ref="form" label-width="80px"
             style="width: 30%;text-align: center;padding-top: 100px;padding-left: 30%">
      <el-form-item label="登录名">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-button @click="enter">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapActions, mapGetters} from 'vuex'
  import {baseUrl} from "~/common/constant/constant";
  import {responseHandler} from '~/common/handler/axiosResponseHandler'

  export default {
    name: "login",
    mixins: [responseHandler],
    data() {
      return {
        name: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['loginName'])
    },
    methods: {
      enter: function () {
        axios.get(`${baseUrl}/manageUsers/login`, {
          params: {name: this.name, password: this.password}
        }).then((res) => {
          if (res.data !== 'SUCCESS') {
            this.$notify.error({
              title: '登录失败',
              message: '用户名或密码错误'
            })
          } else {
            console.log(res.headers.authorization)
            this.setLogin({isLogin: true, loginName: this.name, Authorization: res.headers.authorization})
            this.$router.push('/merchant/index')
          }

        }).catch((err) => {
          this.errorHandler(err)
        })
      },
      ...mapActions([
        'setLogin'
      ])
    }
  }
</script>

<style scoped>

</style>