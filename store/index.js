import api from '@/http/api.js'

export default {
  state () {
    return {
      isLogin: null,
      token: null
    }
  },
  getters: {
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
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