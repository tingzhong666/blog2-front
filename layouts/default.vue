<template>
  <section id="layout">

    <!-- 左边主体 -->
    <main class="main">
      <!-- 头部栏 -->
      <myheader class="header"></myheader>

      <!-- 页面 -->
      <section class="content">
        <Nuxt />
      </section>

      <!-- 底部栏 -->
      <myfooter class="footer"></myfooter>
    </main>

    <!-- 右边 侧边栏 -->
    <myaside class="aside">
    </myaside>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
header-h = 60px
footer-h = 60px

// 容器
.container
  max-width container-width
  margin 0 auto
  @media screen and (max-width container-width + 100px) {
    padding 0 3vw
  }

#layout >
  .aside
    position fixed
    right 0
    top 0
    width 300px
    height 100vh
  .main >
    .header
      height header-h
    .content
      background-color bgc
      --header-h header-h
      --footer-h footer-h
      min-height calc(100vh - var(--header-h) - var(--footer-h))
    .footer
      height footer-h
</style>>
