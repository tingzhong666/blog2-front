// 命名长是为了避免与组件属性方法冲突
export default {
  data () {
    return {
      // 定时器id
      mixinScrollComeTopId: null,
      // 目标位置
      mixinScrollTarget: null,
    }
  },
  computed: {
    // 当前位置到目标位置的距离
    mixinScrollDistance () {
      return this.mixinScrollTarget ? Math.abs(document.documentElement.scrollTop - this.mixinScrollTarget) : 0
    }
  },
  methods: {
    mixinScrollCome (target) {
      this.mixinScrollTarget = target

      if (this.$store.state.scrolling) return

      this.mixinScrollComeTopId = window.setInterval(() => {
        this.$store.commit('setScrolling', true)
        const top = document.documentElement.scrollTop
        const distance = Math.abs(top - target)
  
        if (distance < 10) {
          document.documentElement.scrollTop = target
          return
        }

        // 方向
        if (top - target > 0) document.documentElement.scrollTop = top - distance * 0.2
        else document.documentElement.scrollTop = top + distance * 0.2
      }, 10)
    },
    mixinScrollListen () {
      window.addEventListener('scroll', () => {
        const top = document.documentElement.scrollTop
        const distance = Math.abs(top - this.mixinScrollTarget)

        // 定时器清除
        if (this.mixinScrollComeTopId && distance < 1) {
          window.clearInterval(this.mixinScrollComeTopId)
          this.mixinScrollComeTopId = null
          this.$store.commit('setScrolling', false)
      }
      }, false)
    }
  },
  async created () {
    if (!process.client) return
    this.mixinScrollListen()
  }
}