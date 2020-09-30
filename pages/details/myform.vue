<template>
  <div class='form'>
    <input type="text" name="name" v-model="name" placeholder="*昵称" ref="name">
    <input type="text" name="contact" v-model="contact" placeholder="联系方式">
    <input type="text" name="email" v-model="email" placeholder="邮箱">
    <textarea name="content" v-model="content" placeholder="*内容"></textarea>

    <div class="submit">
      <div class="btn" @click="submit">评论</div>
    </div>

    <transition mode="out-in">
      <div class="msg" v-text="msg" v-show="msg"></div>
    </transition>
  </div>
</template>

<script>
import api from '@/http/api'

export default {
  data () {
    return {
      name: '',
      contact: '',
      email: '',
      content: '',
      msg: ''
    }
  },
  props: {
    // 回复某个评论的id 不是则传 null
    comment_id: {
      type: String,
      default: null
    },
    // 回复某个二维回复的id 不是则传 null
    reply_id: {
      type: String,
      default: null
    }
  },
  computed: {
    // 文章id
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    async submit () {
      if (!this.name || !this.content) {
        this.msg = '昵称或内容为空！'
        return
      }

      this.msg = ''
      const res = await api.comment.add({
        name: this.name,
        contact: this.contact,
        email: this.email,
        content: this.content,
        comment_id: this.comment_id,
        reply_id: this.reply_id,
        id: this.id
      })

      this.$emit('refresh')
    }
  }
}
</script>

<style lang='stylus' scoped>
.form
  overflow hidden
  input
  textarea
    width 100%
    border 1px solid br
    font-size 1rem
    border-radius 5px
    padding .5rem
    font-family Consolas
    color value-color - 80
    &::placeholder
      color value-color
  input
    margin-bottom 10px
    height 2.5rem
  textarea
    height 6rem
  .submit
    overflow hidden
    .btn
      background-color theme-c
      color theme-contrary
      display inline-block
      float right
      margin-top 10px
      padding 5px 15px
      border-radius 5px
      cursor pointer
      transition anima-time ease
      transition-property background-color, transform
      &:hover
        background-color theme-c + 50
      &:active
        transform scale(.9)
  .msg
    color red
    text-align center
</style>
