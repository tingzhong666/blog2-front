<template>
  <aside id="aside">
    <!-- 关闭侧边栏按钮 -->
    <close class="close" @closeEnd="colse" ref="close"></close>

    <!-- switch plan/outlone -->
    <transition mode="out-in">
      <div class="switch" v-if="$store.state.outline">
        <div class="item" :class="{ active: show === 'outline' }" @click="show = 'outline'">文章大纲</div>
        <div class="item infor" :class="{ active: show === 'plan' }" @click="show = 'plan'">博主信息</div>
      </div>
    </transition>

    <transition mode="out-in">
      <component :is="side"/>
    </transition>
  </aside>
</template>

<script>
import Plan from './plan'
import Outline from './outline/index'

export default {
  data () {
    return {
      // {plan | outline}
      show: 'plan'
    }
  },
  watch: {
    '$store.state.outline' (newV, oldV) {
      if (newV) this.show = 'outline'
      else this.show = 'plan'
    }
  },
  components: { Plan, Outline },
  computed: {
    side () {
      switch (this.show) {
        case 'plan': return 'Plan'
        case 'outline': return 'Outline'
      }
    }
  },
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
  font-weight 600
  >
    .close
      position absolute
      left 10px
      top 10px
    .switch
      display flex
      justify-content center
      margin-bottom 20px
      >
        .item
          cursor pointer
          transition color anima-time ease
          &:hover
          &.active
            color theme-contrary
        .infor
          margin-left 10px
</style>