<template>
  <el-container class="main-wrapper">
    <el-header class="main-header" style="height: 60px;left: 0;top: 0">
      <top></top>
    </el-header>
    <el-container class="main-container">
      <el-aside class="main-menu" ref="menu" style="width: 200px;height: 100%;background-color: #293541">
        <!--<left-menu ref="menuWrapper"></left-menu>-->
        <left-menu></left-menu>
      </el-aside>
      <el-main class="main-content flex-item">
        <keep-alive exclude="noKeepAlive">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import leftMenu from './leftMenu'
  import top from './top'

  export default {
    components: {leftMenu, top},
    name: "index"
  }
</script>

<style scoped>
  .main-wrapper {
    width: 100%;
    height: 100%;
  }

  .main-header {
    padding: 0;
  }

  .main-container {
    height: 100%;
  }

  .main-content {
    padding: 0 0 40px 0;
    background-color: #f2f3f8;
    border-top: 1px solid #e1e1e1;
  }
</style>