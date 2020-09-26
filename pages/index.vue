<template>
  <div class='component'>
    <el-card class="item" v-for="v in list" :key="v.id">
      <!-- 标题 -->
      <div class="item title">
        <a :href="'/details/' + v.id" v-text="v.title"></a>
      </div>
      <!-- 日期 浏览量 -->
      <div class="item"></div>
      <!-- 标签 -->
      <div class="item"></div>
      <!-- 简介 -->
      <div class="item" v-text="v.intro"></div>
      <!-- 进入 -->
      <div class="item btn">
        <a :href="'/details/' + v.id">阅读全文>>></a>
      </div>
    </el-card>
  </div>
</template>

<script>
import api from '@/http/api'

export default {
  data () {
    return {
      list: [],
      option: {
        page: 1,
        limit: 10
      },
      n: 0
    }
  },
  methods: {
    async get () {
      const res = await api.list(this.option)
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
.component
  padding 0 30px
  > .item
    margin 30px auto 0
    max-width 1000px
    text-align center
  .title
    min-height 200px
    background-color theme-c
    display flex
    align-items center
    justify-content center
    a
      color theme-contrary
      font-size 2rem
      font-weight 600
      position relative
      &::before
        width 0
        height 2px
        content '.'
        overflow hidden
        position absolute
        bottom 0
        background-color theme-contrary
        transition all anima-time ease
        left 50%
      &:hover::before
        width 100%
        left 0
</style>
