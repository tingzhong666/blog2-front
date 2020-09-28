<template>
  <div class='page'>
    <el-card class="item" v-for="v in list" :key="v.id">
      <!-- 标题 -->
      <div class="item title">
        <a :href="'/details/' + v.id" v-text="v.title" target="_blank"></a>
      </div>

      <!-- 日期 浏览量 -->
      <div class="item date-and-read">
        <span class="date">
          <span class="iconfont icon-write"></span>
          <span class="text">发表于</span>
          <span class="text" v-text="v.created_time"></span>
        </span>

        <span class="separate">|</span>

        <span class="read">
          <span class="iconfont icon-eye"></span>
          <span class="text">浏览人次</span>
          <span class="text" v-text="v.readed"></span>
        </span>
      </div>

      <!-- 标签 -->
      <div class="item">
        <Tag v-for="e in v.tag" :key="e.id" :id="e.id" :name="e.name"/>
      </div>

      <!-- 简介 -->
      <div class="item intro" v-text="v.intro"></div>

      <!-- 进入 -->
      <div class="item btn">
        <a :href="'/details/' + v.id" target="_blank">阅读全文>>></a>
      </div>

      <!-- 横线 -->
      <div class="item line"></div>
    </el-card>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="option.page"
      :page-size="option.limit"
      layout="total, prev, pager, next, jumper"
      :total="n"
      class='pagination item'
      background>
    </el-pagination>
  </div>
</template>

<script>
import api from '@/http/api'
import Tag from '@/components/tag'

export default {
  components: { Tag },
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
      this.list = res.data.map(v => {
        const date = new Date(v.created_time)
        const y = date.getFullYear()
        const m = date.getMonth() + 1
        const d = date.getDate()
        const h = date.getHours()
        const min = date.getMinutes()
        v.created_time = y + '.' + m + '.' + d + ' ' + h + ':' + min

        return v
      })
      this.n = res.count
    },
    handleCurrentChange (v) {
      this.option.page = v
      this.get()
    }
  },
  async created () {
    this.get()
  }
}
</script>

<style lang='stylus' scoped>
.page
  padding 0 30px
  > .item
    margin 30px auto 0
    max-width 1000px
    text-align center
    position relative
    .item
      margin-bottom 10px
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
        &::selection
          background-color theme-contrary
    .intro
      padding 10px
      color index-intro
    >>> .date-and-read
      color theme-c
      font-size .7rem
      .iconfont
        font-size .7rem
    .line
      width 50%
      height 2px
      position absolute
      bottom 10px
      left 25%
      background-color index-line
    .btn a
      color theme-c
      display inline-block
      font-weight 600
      margin-bottom 20px
      position relative
      transition all anima-time ease
      padding 5px
      &::before
        content ''
        width 110%
        height 2px
        position absolute
        bottom 0
        left -5%
        background-color theme-c
        transition all anima-time ease
      &:hover
        background-color theme-c
        color theme-contrary
        &::before
          width 0
          left 50%
  .pagination
    margin-bottom 20px
</style>
