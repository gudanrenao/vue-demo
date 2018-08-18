<template>
  <el-header style="font-size: 14px">
  <span class="leftHeader">
    <img src="../../assets/common/img/logo.gif" alt="">
  </span>
    <span style="padding-left: 20px;height:60px;line-height:60px;font-size: x-large;letter-spacing: 10px">营销服务平台</span>
    <span class="rightHeader">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px;font-size: large"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
      <span>{{loginName}}</span>
  </span>

  </el-header>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        merchantName: '张文'
      }
    },
    computed: {
      ...mapGetters(['loginName'])
    },
    methods: {
      logout: function () {
        window.location.href = 'http://' + window.location.host
      }
    }
  }
</script>

<!--<style scoped lang="stylus" rel="stylesheet/stylus">-->
<style scoped>
  .el-header {
    background-color: rgb(41, 53, 65);
    padding: 0;
    color: white;
    line-height: 60px;
    width: 100%;
    height: 60px !important;
  }

  img {
    width: 200px;
    height: 60px;
  }

  .leftHeader {
    display: inline-block;
    float: left;
    height: 60px;
  }

  .rightHeader {
    float: right;
    padding-right: 20px;
  }
</style>
