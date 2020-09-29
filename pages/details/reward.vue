<template>
  <div class='component'>
    <div class="btn" @click="show = !show">赞赏支持</div>

    <transition mode="out-in">
      <div class="imgs" v-show="show">
        <img :src="set.reward.alipay">
        <img :src="set.reward.wx">
        <img :src="set.reward.qq">

        <div class="tip" v-if="!isImg">未设置收款码</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState(['set']),
    // 是否设置了收款图
    isImg () {
      return this.set.reward.alipay || this.set.reward.wx || this.set.reward.qq
    }
  }
}
</script>

<style lang='stylus' scoped>
.component
  .btn
    margin 0 auto
    background-color theme-c
    color theme-contrary
    width 6rem
    padding 10px 0
    font-weight 600
    border-radius 5px
    cursor pointer
    transition all anima-time ease
    &:hover
      background-color theme-c + 50
  .imgs
    img
      width 220px
      margin 10px
</style>
