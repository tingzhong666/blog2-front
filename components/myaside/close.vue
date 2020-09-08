<template>
  <section class="component" @click="start">
    <div class="big" :class="{ 'big-close': bigClose, closed }" @animationend="shut"></div>

    <div class="small" :class="{ 'small-close': smallClose, closed }" @animationend="shut"></div>

    <div class="dot"></div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      bigClose: false,
      smallClose: false,
      closed: false
    }
  },
  methods: {
    start () {
      this.bigClose = true
      this.smallClose = true
      this.closed = false
    },
    shut () {
      this.bigClose = false
      this.smallClose = false
      this.closed = true
    }
  }
}
</script>

<style lang="stylus" scoped>
line-width = 4px
close-width = 15px
close-height = 25px

@keyframes big-close
  0%
    border-left-width close-width
    height 3px
  100%
    border-width 0
    border-left-width line-width
    height close-height
    border-radius 0
@keyframes small-close
  0%
    border-left-width (close-width - line-width + 1px)
  100%
    border-left-width 0px

.big-close
  animation big-close .5s ease
.small-close
  animation small-close .5s ease

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
    &.closed
      display none
</style>>