import api from '@/http/api.js'

export default {
  state () {
    return {
      isLogin: null,
      token: null,
      // 侧边栏 打开函数
      menuOpen: true,
      // 侧边栏状态
      menu: true,
      // 基本设置
      set: {
        foot: '',
        is_reward: false,
        reward: {
          alipay: '',
          wx: '',
          qq: ''
        }
      },
      // 文章大纲
      outline: null,
      // 博主信息
      infor: {
        img: '',
        name: '',
        intro: '',
        github: ''
      },
      // 是否正在滚动中
      scrolling: false,
      // 当前 scrolltop
      scrollTop: null
    }
  },
  getters: {
  },
  mutations: {
    setToken (state, v) {
      state.token = v
    },
    setIsLogin (state, v) {
      state.isLogin = v
    },
    setMenuOpen (state, v) {
      state.menuOpen = v
    },
    setMenu (state, v) {
      state.menu = v
    },
    // 基本设置
    setSetFoot (state, v) {
      state.set.foot = v
    },
    setSetIsReward (state, v) {
      state.set.is_reward = v
    },
    setSetRewardAlipay (state, v) {
      state.set.reward.alipay = v
    },
    setSetRewardWx (state, v) {
      state.set.reward.wx = v
    },
    setSetRewardQq (state, v) {
      state.set.reward.qq = v
    },
    // 文章大纲
    setOutline (state, v) {
      state.outline = v
    },
    // 博主信息
    setInforName (state, v) {
      state.infor.name = v
    },
    setInforImg (state, v) {
      state.infor.img = v
    },
    setInforIntro (state, v) {
      state.infor.intro = v
    },
    setInforGithub (state, v) {
      state.infor.github = v
    },
    // 正在滚动
    setScrolling (state, v) {
      state.scrolling = v
    },
    // 当前 scrolltop
    setScrollTop (state, v) {
      state.scrollTop = v
    }
  },
  actions: {
    async init (store) {
      await Promise.allSettled([
        store.dispatch('auth'),
        store.dispatch('setGet'),
        store.dispatch('inforGet')
      ])
    },
    // 管理员验证
    async auth (store) {
      const token = await localStorage.getItem('token')
      // 没有 token
      if (!token) {
        store.commit('setToken', null)
        store.commit('setIsLogin', false)
        return
      }

      // 验证
      const res = await api.auth(token)
      // token 错误或过期失效
      if (res.code === -2) {
        store.commit('setToken', null)
        store.commit('setIsLogin', false)
      }
      // 有效
      if (res.code === 1) {
        store.commit('setToken', token)
        store.commit('setIsLogin', true)
      }
    },
    // 基本设置获取
    async setGet (store) {
      const res = await api.set()
      store.commit('setSetFoot', res.data.foot)
      store.commit('setSetIsReward', res.data.is_reward)
      store.commit('setSetRewardAlipay', res.data.reward.alipay)
      store.commit('setSetRewardWx', res.data.reward.wx)
      store.commit('setSetRewardQq', res.data.reward.qq)
    },
    // 博主信息获取
    async inforGet (store) {
      const res = await api.intro()
      store.commit('setInforName', res.data.name)
      store.commit('setInforImg', res.data.img)
      store.commit('setInforIntro', res.data.intro)
      store.commit('setInforGithub', res.data.github)
    }
  },
  modules: {
  }
}