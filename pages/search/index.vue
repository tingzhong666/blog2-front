<template>
  <div class='component'>
    <div class="container">
      <!-- 搜索 -->
      <MyForm/>

      <!-- 列表 -->
      <List :list="list" class="list"/>

      <!-- 分页 -->
      <Page class="page" :n="n" :page.sync="page" :limit="limit" @change="change"/>
    </div>
  </div>
</template>

<script>
import MyForm from './myform'
import List from './list'
import Page from './page'
import api from '@/http/api'
import time from '@/utils/time'

export default {
  data () {
    return {
      n: 0,
      list: [],
      page: 1,
      limit: 1
    }
  },
  computed: {
    q () {
      return this.$route.query.q || ''
    },
    time () {
      return this.$route.query.time ? this.$route.query.time * 1 : -1
    }
  },
  watch: {
    q () {
      this.page = 1
      this.get()
    },
    time () {
      this.page = 1
      this.get()
    }
  },
  components: { MyForm, List, Page },
  methods: {
    async get () {
      if (!this.q) return

      const res = await api.list({
        page: this.page,
        limit: this.limit,
        q: this.q,
        time: this.time
      })

      res.data = res.data.map(v => {
        v.created_time = time(v.created_time, 2)
        return v
      })

      this.list = res.data
      this.n = res.count
    },
    // 
    change (page) {
      this.page = page
      this.get()
    }
  },
  async created () {
    this.get()
  }
}
</script>

<style lang='stylus' scoped>
.component
  .list
    margin-top 20px
</style>
