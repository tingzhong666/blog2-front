<template>
  <div class='component'>
    <div class="container">
      <span class="title">标签</span>

      <div class="content">
        <Tag v-for="v in list" :key="v.id" v-bind="v" class="tag"/>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/tag'
import api from '@/http/api'

export default {
  data () {
    return {
      list: []
    }
  },
  components: { Tag },
  methods: {
    async get () {
      const res = await api.tag()
      this.list = res.data
    }
  },
  async created () {
    this.get()
  }
}
</script>

<style lang='stylus' scoped>
.component
  text-align center
  .title
    font-weight 600
    font-size 1.5rem
  .content
    margin-top 20px
    .tag
      margin-right 22px
</style>
