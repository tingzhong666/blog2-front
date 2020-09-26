<template>
  <div class='component'>
    <!-- 个人信息 -->
    <div class="infor">
      <!-- 头像 -->
      <img class="img item" :src="img"/>

      <!-- 昵称 -->
      <div class="name item" v-text="name"></div>

      <!-- 简介 -->
      <div class="intro item" v-text="intro"></div>

      <!-- github -->
      <div class="github item">
        <a class="btn" :href="github" target="_blank">
          <span class="icon-github iconfont"></span>
          github
        </a>
      </div>
    </div>

    <!-- 导航 -->
    <div class="nav">
      <div class="item">
        <span class="iconfont icon-shouye"></span>
        <router-link to="/">首页</router-link>
      </div>
      <div class="item">
        <span class="iconfont icon-tucao"></span>
        <router-link to="/complain">吐槽</router-link>
      </div>
      <div class="item">
        <span class="iconfont icon-biaoqian"></span>
        <router-link to="/tag">标签</router-link>
      </div>
      <div class="item">
        <span class="iconfont icon-sousuo"></span>
        <router-link to="/search">搜索</router-link>
      </div>
      <div class="item">
        <span class="iconfont icon-liuyanban"></span>
        <router-link to="/msg">留言板</router-link>
      </div>
      <div class="item">
        <span class="iconfont icon-guanyu"></span>
        <router-link to="/about">关于</router-link>
      </div>
      <div class="item" v-if="$store.state.isLogin">
        <span class="iconfont icon-houtai8"></span>
        <a href="/admin" target="_blank">后台</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/http/api'
export default {
  data () {
    return {
      img: '',
      name: '',
      intro: '',
      github: ''
    }
  },
  methods: {
    async get () {
      const res = await api.intro()
      this.img = res.data.img
      this.name = res.data.name
      this.intro = res.data.intro
      this.github = res.data.github
    }
  },
  async created () {
    this.get()
  }
}
</script>

<style lang='stylus' scoped>
.component
  .infor
    text-align center
    font-weight 600
    .item
      margin-bottom 10px
    .img
      width 100px
      border-radius 50%
      border 3px solid white
    .name
      color #fff
      font-size 1.3rem
    .intro
      font-size .9rem
    .github
      .btn
        color github
        border 1px solid github
        display inline-block
        font-weight 400
        line-height 1rem
        padding 5px
        border-radius 3px
        cursor pointer
        transition all .3s ease
        &:hover
          color #fff
          background-color github
          .iconfont
            color #fff
        &:active
          transform scale(.9)
        .iconfont
          transition all .3s ease
          color github
  .nav
    .item
      margin-bottom 5px
      cursor pointer
      .iconfont
      a
        color text-color
        font-weight 600
        transition color .3s ease
      &:hover
        .iconfont
        a
          color #fff
</style>
