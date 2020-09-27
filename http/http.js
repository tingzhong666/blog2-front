import axios from 'axios'

const http = axios.create({
  baseURL: 'http://www.tingzhong666.top:30003/api',
  timeout: 1000
})

http.interceptors.response.use(config => {
  if (config.status === 200) return config.data
  
  console.error('状态码不为200--------', config)
}, err => Promise.reject(err))

export default http