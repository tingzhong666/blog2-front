<template>
  <div class='md' v-html="render">
  </div>
</template>

<script>
import '@/assets/md/md.styl'

export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    // {md | html}
    mode: {
      type: String,
      default: 'md'
    }
  },
  computed: {
    render () {
      if (this.mode === 'md') return this.$marked(this.content)
      if (this.mode === 'html') return this.content
    }
  },
  watch: {
    render () {
      this.outline()
    }
  },
  methods: {
    // html文章 => 大纲
    // level 越大  标签等级 越小
    // exmple: tag h1>h2 level h1<h2
    async outline () {
      const doms = await this.$el.getElementsByClassName('md-title'),
        final = []
      let  hs = []

      // 生成一维数组
      for (let i = 0; i < doms.length; i++) {
        hs.push({
          level: doms[i].tagName.replace(/[hH]/, ''),
          id: doms[i].id,
          text: doms[i].innerText,
          child: [],
          top: doms[i].offsetTop + 100})
      }

      // 一维数组 => 多维数组
      hs.forEach((v, i) => {
        if (!final.length) {
          final.push(v)
          return
        }

        if (v.level <= final[final.length - 1].level) {
          final.push(v)
          return
        }

        if (v.level > final[final.length - 1].level) {
          this.outline3D(v, final[final.length - 1])
          return
        }
      })

      // 添加每个标题的scrolltop范围
      this.endAdd(final, this.$el.offsetTop + 100 + this.$el.offsetHeight)

      this.$store.commit('setOutline', final)
    },
    // 递归
    outline3D (e, target) {
      // 没有子标题 就直接push
      if (!target.child.length) {
        target.child.push(e)
        return
      }

      // 有子标题 就比较最后一位子标题的等级
      if (e.level <= target.child[target.child.length - 1].level) {
        target.child.push(e)
        return
      }

      // 比最后一位子标题大 就自调用 继续比较 最后一位子标题 的最后一位子标题
      if (e.level > target.child[target.child.length - 1].level) this.outline3D(e, target.child[target.child.length - 1])
    },
    // 递归添加每个标题的scrolltop范围
    // parentHeight 为父标题的截止位置
    endAdd (outline, parentHeight) {
      outline.forEach((v, i) => {
        // if 为最后一位 则截止位置为 父标题的 截止位置
        if (i === outline.length - 1) {
          v.end = parentHeight
        // 否则添加下一位标题的 top
        } else {
          v.end = outline[i + 1].top
        }
          // 有子标题 则递归
          if (v.child.length) this.endAdd(v.child, v.end)
      })
    }
  },
  async beforeDestroy () {
    this.$store.commit('setOutline', null)
  }
}
</script>

<style lang='stylus' scoped>
.md
  text-align left
  >>> img
    width 100%
</style>
