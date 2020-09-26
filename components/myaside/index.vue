<template>
  <aside id="aside">
    <!-- 关闭侧边栏按钮 -->
    <close class="close" @closeEnd="colse" ref="close"></close>

    <Plan/>
  </aside>
</template>

<script>
import Plan from './plan'

export default {
  components: { Plan },
  methods: {
    // 关闭按钮 关闭动画结束
    colse () {
      this.$emit('closeEnd')
    },
    // 按钮 打开动画
    open () {
      this.$refs.close.open()
    }
  }
}
</script>

<style lang="stylus">
#aside
  background-color aside-bgc
  color text-color
  padding padd-row
  >
    .close
      position absolute
      left 10px
      top 10px
</style>