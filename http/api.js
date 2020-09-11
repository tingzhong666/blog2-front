import http from './http'

// 博主信息获取
export const intro = async function () {
  let res
  try {
    res = await http.get('/intro')
  } catch(err) {
    console.error(err)
  }
  return res
}