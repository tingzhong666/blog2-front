<template>
  <div id="layout">

    <!-- 左边主体 -->
    <div class="main">
      <!-- 头部栏 -->
      <div class="header"></div>

      <!-- 页面 -->
      <Nuxt />

      <!-- 底部栏 -->
      <div class="footer"></div>
    </div>

    <!-- 右边 侧边栏 -->
    <div class="side">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
#layout
  .side
    position fixed
    right 0
    background-color side-bgc
</style>>
