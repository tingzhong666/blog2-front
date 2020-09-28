<template>
  <header id="header">
    <div class="container">
      <div class="menu" @click="open" :class="{ show }" @transitionend="openend">
        <span class="icon-caidan iconfont"></span>
      </div>

      <!-- logo -->
      <router-link class="logo" to="/">TingZhong666</router-link>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showInit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: this.showInit
    }
  },
  methods: {
    // 打开菜单
    open () {
      this.show = false
    },
    // 按钮显示隐藏动画结束
    openend (e) {
      // 若按钮消失 则准备侧边栏
      if (e.propertyName == 'opacity' && this.show === false) {
        this.$emit('open')
        return
      }

      // 按钮显示 表示已经关闭侧边栏
      this.$store.commit('setMenu', false)
    },
    // 关闭菜单
    shut () {
      this.show = true
    }
  },
  async mounted () {
    this.$store.commit('setMenuOpen', this.open)
  }
}
</script>

<style lang="stylus">
change-size = 3px

#header
  background-color header-bgc
  > .container
    height header-h
    display flex
    align-items center
    >
      .menu
        position absolute
        right padd-row 
        top 0
        cursor pointer
        height 33px
        line-height 33px
        width 33px
        text-align center
        border-radius 3px
        margin-top ((header-h - @height) / 2)
        transition-property transform, background-color, opacity
        transition-duration anima-time
        transition-timing-function ease
        opacity 0
        .iconfont
          transition color anima-time ease
        &:hover
          background-color theme-c
          .iconfont
            color theme-contrary
        &:active
          transform scale(0.8)
        &.show
          opacity 1
    .logo
      display inline-block
      font-weight 600
      color theme-c
      font-size 1.5rem
      position relative
      &::before
        content ''
        width 0
        height 3px
        background-color theme-c
        position absolute
        left 50%
        bottom 0
        transition all anima-time ease        
      &:hover::before
        width 110%
        left -5%
</style>