import Vue from 'vue'
import _ from 'lodash'
/**
 * 自定义数据响应克隆方法
 * @param {*} original
 */
export function vueClonedeep (original) {
  if (original === null || original === undefined) {
    return original
  }
  const newObj = {}
  const keys = Object.keys(original)
  if (_.isArray(original) || _.isObject(original)) {
    keys.forEach(key => {
      // newObj[key] = vueClonedeep(original[key])
      const v = vueClonedeep(original[key])
      Vue.set(newObj, key, v)
    })
    // 是否是数组
    if (_.isArray(original)) {
      const newArr = []
      keys.forEach(key => {
        newArr.push(newObj[key])
      })
      return newArr
    }
    return newObj
  } else {
    // 非字符串和数组
    return original
  }
}

/**
 * 生产key
 */
export const getKey = () => {
  return (Math.random() * 10 ** 5).toFixed(0)
}

// 获取嵌套对象下某个字段的值 propertyName
export const getPropertyDataFromNestObj = (obj, propertyName) => {
  let curObj = obj
  const splitedKeys = propertyName.split('.')
  // 最后一个key值
  let lastKey = ''
  // console.log('getPropertyDataFromNestObj 开始')
  splitedKeys.forEach((key, index) => {
    if (index === splitedKeys.length - 1) {
      lastKey = key
    } else {
      if (!curObj) return
      curObj = curObj[key]
    }
  })
  // console.log('getPropertyDataFromNestObj 结束')
  return curObj ? curObj[lastKey] : null
}

/**
 * 设值
 * options: { title: { color: '#fff' } }
 * filedName option.title.color: '#000'
 * 函数会以.分割fieldName 逐层向下设值给 color
 * @param {*} chartOptions
 * @param {*} fieldName
 * @param {*} value
 */
export function setValue (chartOptions, fieldName, value) {
  let curChartOptions = chartOptions
  const splitedKeys = fieldName.split('.')
  // 最后一个key值
  let lastKey = ''
  splitedKeys.forEach((key, index) => {
    if (index === splitedKeys.length - 1) {
      lastKey = key
    } else {
      curChartOptions = curChartOptions[key]
    }
  })
  // curChartOptions[lastKey] = value
  Vue.set(curChartOptions, lastKey, value)
}

/**
 * 日期格式化函数
 * @param {*} date 
 * @param {*} param1 
 */
export function formatDateByDateObj (date, { format }) {
  if (typeof date === 'string') return date
  if (!date) return null
  const fmt = format
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  let rs = null
  if (/(y+)/.test(fmt)) {
    rs = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(rs)) {
      rs = rs.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return rs
}
