<template>
  <div class='page'>
    <div class="container">
      <!-- 标题 -->
      <div class="item title">
        <span v-text="title"></span>
      </div>

      <!-- 日期 浏览量 -->
      <div class="item date-and-read">
        <span class="date">
          <span class="iconfont icon-write"></span>
          <span class="text">发表于</span>
          <span class="text" v-text="created_time"></span>
        </span>

        <span class="separate">|</span>

        <span class="read">
          <span class="iconfont icon-eye"></span>
          <span class="text">浏览人次</span>
          <span class="text" v-text="readed"></span>
        </span>
      </div>

      <!-- 标签 -->
      <div class="item">
        <Tag v-for="e in tag" :key="e.id" :id="e.id" :name="e.name"/>
      </div>

      <!-- 简介 -->
      <div class="item intro" v-text="intro"></div>

      <!-- 内容 -->
      <Md class="item md" :content="content" mode="md"/>

      <!-- 赞赏 -->
      <Reward v-if="$store.state.set.is_reward && is_reward"/>

      <!-- 评论 -->
      <Comment class="comment"/>
    </div>
  </div>
</template>

<script>
import api from '@/http/api'
import Reward from '@/pages/details/reward'
import Comment from '@/pages/details/comment'
import Md from '@/components/md'
import time from '@/utils/time'

export default {
  head () {
    return {
      title: this.title + '- TZ2博客'
    }
  },
  components: { Reward, Comment, Md },
  data () {
    return {
      id: '',
      title: '',
      created_time: 0,
      modify_time: 0,
      readed: 0,
      tag: [],
      intro: '',
      content: '',
      // 此文章赞赏开关
      is_reward: false
    }
  },
  methods: {
    // 文章详情
    async getDetails () {
      const res = await api.details(this.$route.params.id)
      this.content = res.data.content
      this.id = res.data.id
      this.title = res.data.title
      this.created_time = time(res.data.created_time, 2)
      this.modify_time = time(res.data.modify_time, 2)
      this.readed = res.data.readed
      this.tag = res.data.tag
      this.intro = res.data.intro
      this.is_reward = res.data.is_reward
    }
  },
  async created () {
    this.getDetails()
  }
}
</script>

<style lang='stylus' scoped>
.page
  padding 40px 0
  .container
    box-shadow 0 0 10px 0 rgba(0, 0, 0, .3)
    padding 20px
    text-align center
    .item
      margin-bottom 10px
    .title
      min-height 200px
      background-color theme-c
      display flex
      align-items center
      justify-content center
      span
        color theme-contrary
        font-size 2rem
        font-weight 600
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
    .comment
      border-top 1px solid br
      margin-top 20px
</style>
