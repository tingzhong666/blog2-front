<template>
  <div class='component'>
    <Render
      v-for="v in outline"
      :key="v.id"
      :item="v"
      class="item"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Render from './render'

export default {
  components: { Render },
  computed: {
    ...mapState(['outline'])
  }
}
</script>

<style lang='stylus' scoped>
.component
  font-size .9rem
</style>
