<template>
  <section class="component" @click="closed = true">
    <div class="big" :class="{ closed }"></div>

    <div class="small" :class="{ closed }" @transitionend="closeEnd"></div>
    <div class="dot"></div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      closed: false
    }
  },
  methods: {
    // 动画结束
    closeEnd (e) {
      // 此时 关闭 侧边栏 按钮 动画结束.   侧边栏关闭中。  按钮 变为一条竖线线
      if (this.closed === true) {
        this.$emit('closeEnd')
        return
      }
      // 竖线变为 > 表示侧边栏已经打开
      this.$store.commit('setMenu', true)

    },
    // 打开按钮
    open () {
      this.closed = false
    }
  }
}
</script>

<style lang="stylus" scoped>
line-width = 4px
close-width = 15px
close-height = 25px

.component
  width close-width
  height close-height
  cursor pointer
  overflow hidden
  .big,
  .small
    position absolute
    left 0
    box-sizing content-box
  .big
    border-radius 17%
    width 3px
    height 3px
    top 0
    border (close-height / 2 - 1.5px) solid aside-bgc
    border-left close-width solid theme-contrary
    transition border .3s ease,height .3s ease
    &.closed
      border-width 0
      border-left-width line-width
      height close-height
      border-radius 0
  .small
    width 0
    height 0
    top line-width
    border (close-height / 2 - line-width) solid transparent
    border-left (close-width - line-width + 1px) solid aside-bgc
    transition border .3s ease
    &.closed
      border-left-width 0px
</style>>