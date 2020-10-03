<template>
  <div class='form'>
    <!-- 时间范围 -->
    <el-radio class="radio" v-model="radio" :label="-1">全部</el-radio>
    <el-radio class="radio" v-model="radio" :label="-2">今天</el-radio>
    <el-radio class="radio" v-model="radio" :label="-3">本周</el-radio>
    <el-radio class="radio" v-model="radio" :label="-4">本月</el-radio>
    <el-radio class="radio" v-model="radio" :label="-5">半年内</el-radio>
    <el-radio class="radio" v-model="radio" :label="-6">本年</el-radio>
    <el-radio class="radio" v-model="radio" :label="0">
      某天内
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        :disabled="radio !== 0">
      </el-date-picker>
    </el-radio>

    <!-- 关键词 -->
    <div class="q">
      <input type="text" v-model="q" placeholder="关键词" class="q" @keyup.enter="search">
      <div class="el-icon-search" @click="search"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      q: this.$route.query.q,
      radio: -1,
      date: null
    }
  },
  methods: {
    search () {
      if (!this.q) return
      let time = this.radio !== 0 ? this.radio : (new Date(this.date)).getTime()
      if (time === 0) time = Date.now()

      this.$router.push('/search?q=' + this.q + '&time=' + time)
    }
  },
  async created () {
    if ([-1, -2, -3, -4, -5, -6].includes(this.$route.query.time * 1)) this.radio = this.$route.query.time * 1
    else {
      this.radio = 0
      this.date = this.$route.query.time * 1
    }
  }
}
</script>

<style lang='stylus' scoped>
.form
  .q
    position relative
    input
    .el-icon-search
      line-height 2.3rem
      min-height 30px
    input
      width 100%
      border 1px solid value-color
      border-radius 5px
      font-size 1rem
      padding 0 35px 0 10px
    .el-icon-search
      position absolute
      right 0
      top 0
      cursor pointer
      width 40px
      text-align center
      font-weight 600
      font-size 1.3rem
      display flex
      align-items center
      justify-content center
  .radio
    margin-bottom 10px
</style>