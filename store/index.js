import api from '@/http/api.js'

export default {
  state () {
    return {
      isLogin: null,
      token: null,
      // 侧边栏 打开函数
      menuOpen: true,
      // 侧边栏状态
      menu: true
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
    }
  },
  modules: {
  }
}