export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function yyyyMmDd(x) {
  const date = new Date(x)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()

  return year + '.' + toTwo(mon) + '.' + toTwo(day)
}

export function yyyyMmDdHhMmSs(x) {
  const date = new Date(x)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return year + '.' + toTwo(mon) + '.' + toTwo(day) + ' ' + toTwo(hour) + ':' + toTwo(minute) + ':' + toTwo(second)
}

export function hhMmSs(x) {
  const date = new Date(x)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return toTwo(hour) + ':' + toTwo(minute) + ':' + toTwo(second)
}

function toTwo(val) {
  if (val < 10) {
    return '0' + val
  }
  return val
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export const date_time_format_1 = 'yyyy-MM-dd hh:mm:ss'
export const date_time_format_2 = 'yyyy/MM/dd hh:mm:ss'

