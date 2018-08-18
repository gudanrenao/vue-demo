<template>

  <el-menu
    default-active="currPath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="rgb(41, 53, 65)"
    text-color="#fff"
    :router="true"
    active-text-color="#fb991a">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>信息中心</span>
      </template>
      <el-menu-item index="/merchant/index">商家信息</el-menu-item>
      <el-menu-item index="1-2">会员信息</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单中心</span>
      </template>
      <el-menu-item index="/order/scanCodeOrderList">扫码订单</el-menu-item>
      <el-menu-item index="2-2">团购订单</el-menu-item>
    </el-submenu>
  </el-menu>

</template>

<script>
  export default {
    data() {
      return {
        currPath: '/merchant/index'
      }
    },
    created() {
      this.currPath = this.$router.currentRoute.fullPath
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

  .el-menu-item {
    padding-left: 66px !important;
  }


</style>
