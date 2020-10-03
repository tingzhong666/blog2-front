<template>
  <div class='render'>
    <a class="text" v-text="item.text" @click="click" :class="{ active }"></a>

    <transition mode="out-in">
      <div class="child" v-show="active">
        <render
          v-for="v in item.child"
          :key="v.id"
          :item="v"/>
      </div>
    </transition>
  </div>
</template>

<script>
import scroll from '@/mixins/scroll'

export default {
  computed: {
    active () {
      return this.$store.state.scrollTop >= this.item.top - 1 && this.$store.state.scrollTop < this.item.end - 1
    }
  },
  name: 'render',
  mixins: [scroll],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    click () {
      this.mixinScrollCome(this.item.top)
    }
  }
}
</script>

<style lang='stylus' scoped>
.render
  >
    .text
      cursor pointer
      transition color anima-time ease
      color text-color
      &:hover
      &.active
        color theme-contrary
    .child
      padding-left .5rem
</style>
