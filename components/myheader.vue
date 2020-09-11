<template>
  <header id="header">
    <div class="container">
      <div class="menu" @click="open" :class="{ show }" @transitionend="openend">
        <span class="icon-caidan iconfont"></span>
      </div>
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
      // 若按钮消失 则打开侧边栏
      if (e.propertyName == 'opacity' && this.show === false) {
        this.$emit('open')
      }
    },
    // 关闭菜单
    shut () {
      this.show = true
    }
  }
}
</script>

<style lang="stylus">
change-size = 3px

#header
  background-color header-bgc
  > .container
    height header-h
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
</style>