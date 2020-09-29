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

    <!-- 返回顶部 -->
    <div class="fixed" :class="{ show: topShow }">
      <div class="top" @click="comeTop">
        <span class="icon-top-filling iconfont"></span>
      </div>

      <div class="menu" @click="menuOpen" :style="{ opacity: !$store.state.menu ? 1 : 0 }">
        <span class="iconfont icon-caidan"></span>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/http/api.js'
import '@/assets/global.styl'

export default {
  data () {
    return {
      close: false,
      menuShowInit: false,
      topShow: false,
      comeTopId: null
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
    },
    comeTop () {
      if (this.comeTopId !== null) return
      this. comeTopId = window.setInterval(() => {
        document.documentElement.scrollTop = document.documentElement.scrollTop * 0.9
        if (document.documentElement.scrollTop < 10) document.documentElement.scrollTop = 0
      }, 10)
    },
    menuOpen () {
      this.$store.state.menuOpen()
    },
    // 滚动监听 显隐按钮 返回顶部定时器移除
    scrollListen () {
        window.addEventListener('scroll', e => {
        if (this.comeTopId !== null && document.documentElement.scrollTop === 0) {
          window.clearInterval(this.comeTopId)
          this.comeTopId = null
        }

        if (document.documentElement.scrollTop > 300) this.topShow = true
        else this.topShow = false
      }, false)
    }
  },
  async created () {
    if (!process.client) return
    this.scrollListen()
    this.$store.dispatch('setGet')
  }
}
</script>

<style lang="stylus">
#layout
  >
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
        width calc(100vw - 15px)
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
    .fixed
      position fixed
      bottom 10vh
      right 3vw
      width 50px
      transition all anima-time ease
      opacity 0
      &.show
        opacity 1
      .top
      .menu
        display flex
        align-items center
        justify-content center
        height 50px
        box-shadow 0 0 10px 0 rgba(0, 0, 0, .3)
        border-radius 50%
        background-color theme-contrary
        transition all anima-time ease
        cursor pointer
        &:hover
          box-shadow 0 0 20px 0 #cccccc
        &:active
          transform scale(.9)
      .top
        .iconfont
          font-size 1.5rem
      .menu
        margin-top 10px
        .iconfont
          font-size 1rem
</style>>
