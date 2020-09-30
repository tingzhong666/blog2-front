/**
 * 时间戳 转 日期 时间
 * @param {Number} v 时间戳
 * @param {1 | 2} mode 模式 1 y.m.d 2 y.m.d h:min
 */
export default function (v, mode = 1) {
  const date = new Date(v)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  const h = date.getHours().toString().padStart(2, '0')
  const min = date.getMinutes().toString().padStart(2, '0')
  switch (mode) {
    case 1:
      v = y + '.' + m + '.' + d
      break
    case 2:
      v = y + '.' + m + '.' + d + ' ' + h + ':' + min
      break
  }

  return v
}