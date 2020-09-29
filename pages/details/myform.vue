<template>
  <div class='form'>
    <input type="text" name="name" v-model="name" placeholder="*昵称">
    <input type="text" name="contact" v-model="contact" placeholder="联系方式">
    <input type="text" name="email" v-model="email" placeholder="邮箱">
    <textarea name="content" v-model="content" placeholder="*内容"></textarea>

    <div class="btn">评论</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      contact: '',
      email: '',
      content: ''
    }
  }
}
</script>

<style lang='stylus' scoped>
.form
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
</style>
