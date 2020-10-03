<template>
  <div class='list'>
    <el-card v-for="v in list" :key="v.id" class="item">
      <div class="title">
        <a :href="'/details/' + v.id" v-text="v.title" target="_blank"></a>
      </div>

      <div class="date-and-read">
        <span class="date">
          <span class="iconfont icon-write"></span>
          <span class="text">发表于</span>
          <span class="text" v-text="v.created_time"></span>
        </span>

        <span class="speparator">|</span>

        <span class="read">
          <span class="iconfont icon-eye"></span>
          <span class="text">浏览次数</span>
          <span class="text" v-text="v.readed"></span>
        </span>
      </div>

      <div class="tags">
        <Tag v-for="e in v.tag" :key="e.id" v-bind="e" class="tag"/>
      </div>

      <div class="intro" v-text="v.intro"></div>
    </el-card>
  </div>
</template>

<script>
import Tag from '@/components/tag'

export default {
  components: { Tag },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang='stylus' scoped>
.list
  .item
    margin-bottom 20px
    .title
      a
        font-weight 600
        color theme-c
        font-size 1.3rem
        &:hover
          text-decoration-line underline
    .date-and-read
      font-size .7rem
      margin-top 10px
      .iconfont
        font-size .7rem
    .tags
      padding-left 10px
      margin-top 10px
      .tag
        margin-right 22px
    .intro
      margin-top 10px
      font-size .9rem
      border-left 2px solid theme-c
      padding 5px 5px 5px 10px
      line-height 1.5rem
</style>
