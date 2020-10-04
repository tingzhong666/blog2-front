<template>
  <router-link class='component' :to="'/tag/' + id">
    <div class="content">
      <span class="iconfont icon-biaoqian"></span>
      <span class="text" v-text="name"></span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='stylus' scoped>
.component
  display inline-block
  position relative
  padding 0
  line-height 22px
  height 22px
  font-size 12px
  transition opacity anima-time ease
  .content
    line-height 22px
    height 22px
    display inline-block
    background-color theme-c
    color theme-contrary
    padding 0 5px 0 3px
    border-radius 0 3px 3px 0
    .iconfont
      color theme-contrary
      font-size 12px
  &::before
    content ''
    position absolute
    left -22px
    top 0
    overflow hidden
    border 11px solid transparent
    border-right-color theme-c
    width 0
    height 0
  &:hover
    opacity 0.8
</style>
