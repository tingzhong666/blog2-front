<template>
  <div class='component'>
    <div class="container">
      <List :list="list" class="list"/>

      <Page class="page" :n="n" :page.sync="page" :limit="limit" @change="change"/>
    </div>
  </div>
</template>

<script>
import List from '@/components/list'
import Page from '@/components/page'
import api from '@/http/api'

export default {
  components: { List, Page },
  data () {
    return {
      list: [],
      n: 0,
      page: 1,
      limit: 10
    }
  },
  watch: {
    '$route.params.id': function () {
      this.get()
    }
  },
  methods: {
    change (page) {
      this.page = page
      this.get()
    },
    async get () {
      const res = await api.list({
        page: this.page,
        limit: this.limit,
        tag: this.$route.params.id,
        time: this.time
      })
      this.list = res.data
      this.n = res.count
    }
  },
  async created () {
    this.get()
  }
}
</script>

<style lang='stylus' scoped>
</style>
