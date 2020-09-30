import http from './http'

export default {
  // 博主信息获取
  async intro () {
    let res
    try {
      res = await http.get('/intro')
    } catch(err) {
      console.error(err)
    }
    return res
  },
  // 验证
  async auth (token) {
    return await http.post('/auth', { token })
  },
  // 列表
  async list ({
    limit = 10,
    page = 1,
    tag = 0,
    q,
    time = -1,
    power = 0,
    sort = 1
  }) {
    const params = { limit, page, time, power, sort }
    if (q) params.q = q
    else params.tag = tag
    return await http.get('/list', { params })
  },
  // 文章详情
  async details (id) {
    return await http.get('/artical_details', { params: { id } })
  },
  // 基本设置获取
  async set () {
    return await http.get('/set')
  },
  // 评论
  comment: {
    async add ({
      name,
      contact = '',
      email = '',
      content,
      comment_id = null,
      reply_id = null,
      id
    }) {
      return await http.post('/comment_add', {
        name,
        contact,
        email,
        content,
        comment_id,
        reply_id,
        id
      })
    },
    async get ({ id, page = 1, limit = 10 }) {
      return await http.get('/comment', { params: { id, page, limit } })
    }
  }
}