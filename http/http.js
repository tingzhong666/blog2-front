import axios from 'axios'

const http = axios.create({
  baseURL: 'http://www.tingzhong666.top:30003/api',
  timeout: 1000
})

// 响应
http.interceptors.response.use(config => {
  if (config.status !== 200) console.error('状态码不为200--------', config)
  if (config.data.code !== 1) console.error('code不为1', config.config.url, config.data)
  
  return config.data
}, err => Promise.reject(err))

export default http