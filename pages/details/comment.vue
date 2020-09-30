<template>
  <div class='component'>
    <MyForm @refresh="get"/>

    <!-- 评论列表 -->
    <MyRow v-for="v in list" :key="v.id" v-bind="v" class="item" @refresh="get(1, list.length)" :dimension="1">
      <div class="space"></div>
      <MyRow v-for="e in v.reply" :key="e.id" v-bind="e" class="item" @refresh="get(1, list.length)" :parentId="v.id" :dimension="2">
      </MyRow>
    </MyRow>
  </div>
</template>

<script>
import MyForm from '@/pages/details/myform'
import MyRow from '@/pages/details/row'
import api from '@/http/api'
import time from '@/utils/time'

export default {
  data () {
    return {
      list: [],
      page: 1,
      limit: 10,
      n: 0,
      // 数据请求中
      loading: false
    }
  },
  computed: {
    pageMax () {
      return Math.ceil(this.n / this.limit)
    }
  },
  components: { MyForm, MyRow },
  methods: {
    // mode 1覆盖 2追加
    // end 获取多少条
    async get (mode = 1, limit = this.limit) {
      this.loading = true
      const res = await api.comment.get({
        page: mode === 1 ? 1 : this.page,
        limit,
        id: this.$route.params.id
      })

      res.data = res.data.map(v => {
        v.created_time = time(v.created_time, 2)
        v.reply = v.reply.map(e => {
          e.created_time = time(e.created_time, 2)
          return e
        })
        return v
      })

      if (mode === 1) {
        this.list = res.data
        this.page = Math.ceil(limit / this.limit)
      }
      if (mode === 2) this.list = this.list.concat(res.data)
      this.n = res.n

      this.loading = false
    },
    // 获取更多
    scrollListen () {
      window.addEventListener('scroll', e => {
        const bottom = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight
        if (bottom <= 300 && !this.loading && this.page < this.pageMax) {
          this.page ++
          this.get(2)
        }
      }, false)
    }
  },
  async created () {
    this.get()
  },
  async mounted () {
    this.scrollListen()
  }
}
</script>

<style lang='stylus' scoped>
.component
  padding-top 20px
  .item
    margin-bottom 20px
    .space
      margin-top 20px
</style>
