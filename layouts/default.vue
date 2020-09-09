<template>
  <section id="layout">

    <!-- 左边主体 -->
    <main class="main" :class="{ close }">
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
    <myaside class="aside" :class="{ close }" @closeEnd="close = true">
    </myaside>
  </section>
</template>

<script>
export default {
  data () {
    return {
      close: false
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
header-h = 60px
footer-h = 60px
aside-w = 300px

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
    width aside-w
    height 100vh
    transition width 0.3s ease
    &.close
      width 0
  .main
    --aside-w aside-w
    width calc(100vw - --aside-w)
    transition width 0.3s ease
    &.close
      width 100vw
    >
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
