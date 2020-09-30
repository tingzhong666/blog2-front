<template>
  <div class='row' :id="id">
    <div class="left">
      <div class="toux" v-text="name[0]"></div>
    </div>

    <div class="right">
      <div class="name">
        <span v-text="name"></span>
        <span class="admin" v-if="level === 1">管理员</span>
      </div>

      <div class="time" v-text="created_time"></div>

      <div class="content">
        <a v-if="reply_id" class="be-answered" :href="$route.path + '#' + reply_id">@{{reply_name}}</a>
        <span v-text="content"></span>
      </div>

      <div class="reply">
        <span class="btn" @click="formShow = !formShow">回复</span>
      </div>

      <div class="slot">
        <!-- 表单 -->
        <transition mode="out-in">
          <MyForm
            v-show="formShow"
            @refresh="refresh"
            v-bind="formOption"/>
        </transition>

        <!-- 插槽 镶嵌次级列表 -->
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import MyForm from '@/pages/details/myform'

export default {
  data () {
    return {
      formShow: false
    }
  },
  components: { MyForm },
  computed: {
    formOption () {
      let comment_id, reply_id = ''
      if (this.dimension === 1) comment_id = this.id
      if (this.dimension === 2) {
        comment_id = this.parentId
        reply_id = this.id
      }
      return {
        comment_id,
        reply_id
      }
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    contact: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    created_time: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 10
    },
    // 二维传入 父级id
    parentId: {
      type: String,
      default: ''
    },
    // 二维时回复别人传入
    reply_id: {
      type: String,
      default: ''
    },
    reply_name: {
      type: String,
      default: ''
    },
    // 第几级评论 总共就2维
    dimension: {
      type: Number
    }
  },
  methods: {
    async refresh () {
      this.formShow = false
      this.$emit('refresh')
    }
  }
}
</script>

<style lang='stylus' scoped>
.row
  display flex
  .left
    width 4.5rem
    position relative
    .toux
      background-color theme-c
      color theme-contrary
      width 3rem
      height 3rem
      text-align center
      line-height 3rem
      border-radius 50%
      position absolute
      top 0
      left 50%
      margin-left -1.5rem
      font-weight 600
  .right
    text-align left
    width calc(100% - 4.5rem)
    overflow hidden
    .name
      margin-bottom 3px
      .admin
        font-size .5rem
        background-color theme-c
        color theme-contrary
        display inline-block
        border-radius 3px
        padding 0 3px
    .time
      font-size .7rem
      margin-bottom 10px
    .content
      font-family cursive
      .be-answered
        color blue
    .reply
      text-align right
      margin-bottom 10px
      .btn
        cursor pointer
        font-size .9rem
        &:hover
          color theme-c + 100
</style>
