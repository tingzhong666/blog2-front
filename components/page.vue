<template>
  <div class='page'>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="limit"
      layout="total, prev, pager, next, jumper"
      :total="n"
      class='pagination'
      background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    n: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.$emit('change', page)
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
