<template>
  <aside id="aside">
    <close class="close" @closeEnd="colse"></close>
  </aside>
</template>

<script>
export default {
  methods: {
    // 关闭按钮 关闭动画结束
    colse () {
      this.$emit('closeEnd')
    }
  }
}
</script>

<style lang="stylus">
#aside
  background-color aside-bgc
  color text-color
  >
    .close
      position absolute
      left 10px
      top 10px
</style>