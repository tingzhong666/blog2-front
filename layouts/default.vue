<template>
  <section id="layout">

    <!-- 左边主体 -->
    <main class="main" :class="{ close }" @transitionend="shutEnd">
      <!-- 头部栏 -->
      <myheader class="header" ref="header" :show-init="menuShowInit" @open="open"></myheader>

      <!-- 页面 -->
      <section class="content">
        <Nuxt />
      </section>

      <!-- 底部栏 -->
      <myfooter class="footer"></myfooter>
    </main>

    <!-- 右边 侧边栏 -->
    <myaside class="aside" :class="{ close }" @closeEnd="shut" ref="aside">
    </myaside>
  </section>
</template>

<script>
import api from '@/http/api.js'

export default {
  data () {
    return {
      close: false,
      menuShowInit: false
    }
  },
  methods: {
    // 关闭菜单
    shut () {
      this.close = true
    },
    // 动画结束
    shutEnd (e) {
      // 此时关闭侧边栏结束
      if (e.propertyName == 'width' && this.close === true) {
        // 显示按钮
        this.$refs.header.shut()
      }

      // 此时打开侧边栏动画结束
      if (e.propertyName == 'width' && this.close === false) {
        // 显示按钮
        this.$refs.aside.open()
      }
    },
    // 打开菜单
    open () {
      this.close = false
    }
  },
  async created () {
    if (!process.client) return
  }
}
</script>

<style lang="stylus">
// 容器
.container
  max-width container-width
  margin 0 auto
  padding padd-col 0
  position relative
  @media screen and (max-width 1400px) {
    max-width 1400px - aside-w - 200px
  }
  @media screen and (max-width 1300px) {
    max-width 1400px - aside-w - 300px
  }
  @media screen and (max-width 1200px) {
    max-width 1400px - aside-w - 400px
  }
  @media screen and (max-width 1100px) {
    max-width 1400px - aside-w - 450px
  }
  @media screen and (max-width 960px) {
    padding padd-col padd-row
  }

.iconfont
  color theme-c
  font-size icon-size

#layout >
  .aside
    position fixed
    right 0
    top 0
    width aside-w
    height 100vh
    transition anima-time ease
    transition-property width, padding
    overflow auto
    &.close
      width 0
      padding 0
  .main
    --aside-w aside-w
    width calc(100vw - var(--aside-w))
    transition width anima-time ease
    &.close
      width 100vw
    >
      .header
        height header-h
        line-height header-h
      .content
        background-color bgc
        --header-h header-h
        --footer-h footer-h
        min-height calc(100vh - var(--header-h) - var(--footer-h))
      .footer
        height footer-h
</style>>
