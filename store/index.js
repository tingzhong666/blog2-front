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
      }
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
    }
  },
  actions: {
    async auth (store) {
      const token = await localStorage.getItem('token')
      // 没有 token
      if (token === null) {
        store.commit('setToken', null)
        store.commit('setIsLogin', false)
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
    }
  },
  modules: {
  }
}