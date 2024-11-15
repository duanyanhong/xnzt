import { Message } from 'element-ui'
import store from '../store'
const calculateTimeRange = (originFlag, originTime) => {
  // 设置缺省值
  const flagYs = originFlag || 'thisDay'
  const flag = flagYs.toString()
  let timeObj = null
  if (originTime === 0) { // 由于0是false，故额外判断一次
    timeObj = new Date(0)
  } else if (new Date(originTime).getTime()) {
    timeObj = new Date(originTime)
  } else {
    timeObj = new Date()
  }
  // 为啥不用switch case，因为case里面不允许const/let
  if (flag === 'thisYear') {
    // 本年
    const [year, month, date] = getYmdhmsByTime(timeObj)
    return [`${year}-01-01 00:00:00`, `${year}-${month}-${date} 23:59:59`]
  } else if (flag === 'thisMonth') {
    // 本月
    const [year, month, date] = getYmdhmsByTime(timeObj)
    return [`${year}-${month}-01 00:00:00`, `${year}-${month}-${date} 23:59:59`]
  } else if (flag === 'thisWeek') {
    // 本周
    var day = timeObj.getDay()
    if (!day) {
      day = 7
    }
    const [yearNow, monthNow, dateNow] = getYmdhmsByTime(timeObj)
    const [year, month, date] = getYmdhmsByTime(timeObj.getTime() - (day - 1) * 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} 23:59:59`]
  } else if (flag === 'thisDay') {
    // 本日
    const [year, month, date] = getYmdhmsByTime(timeObj)
    return [`${year}-${month}-${date} 00:00:00`, `${year}-${month}-${date} 23:59:59`]
  } else if (flag === 'yesterday') {
    // 昨日0点至今
    const [yearNow, monthNow, dateNow, hourNow, minuteNow, secondNow] = getYmdhmsByTime(timeObj)
    const [year, month, date] = getYmdhmsByTime(timeObj.getTime() - 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} ${hourNow}:${minuteNow}:${secondNow}`]
  } else if (flag === 'lastYear') {
    // 去年
    const [year] = getYmdhmsByTime(timeObj)
    return [`${year - 1}-01-01 00:00:00`, `${year - 1}-12-31 23:59:59`]
  } else if (flag === 'lastMonth') {
    // 上月
    const [yearNow, monthNow] = getYmdhmsByTime(timeObj)
    const timeStamp = new Date(`${yearNow}-${monthNow}-01 00:00:00`).getTime() - 1
    const [year, month, date] = getYmdhmsByTime(timeStamp)
    return [`${year}-${month}-01 00:00:00`, `${year}-${month}-${date} 23:59:59`]
  } else if (flag === 'lastWeek') {
    // 上周
    const day = timeObj.getDay()
    const [yearFirst, monthFirst, dateFirst] = getYmdhmsByTime(timeObj.getTime() - (day + 6) * 24 * 60 * 60 * 1000)
    const [yearLast, monthLast, dateLast] = getYmdhmsByTime(timeObj.getTime() - day * 24 * 60 * 60 * 1000)
    return [`${yearFirst}-${monthFirst}-${dateFirst} 00:00:00`, `${yearLast}-${monthLast}-${dateLast} 23:59:59`]
  } else if (flag === 'lastDay') {
    // 昨日
    const [year, month, date] = getYmdhmsByTime(timeObj.getTime() - 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${year}-${month}-${date} 23:59:59`]
  } else if (flag === 'pastYear') {
    // 近1年
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, hour, minute, second] = getYmdhmsByTime(timeObj)
    return [`${year - 1}-${month}-${date} 00:00:00`, `${year}-${month}-${date} 23:59:59`]
  } else if (flag === 'pastMonth') {
    // 近30日
    // eslint-disable-next-line no-unused-vars
    const [yearNow, monthNow, dateNow, hourNow, minuteNow, secondNow] = getYmdhmsByTime(timeObj)
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, hour, minute, second] = getYmdhmsByTime(timeObj.getTime() - 30 * 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} 23:59:59`]
  } else if (flag === 'pastTwoWeeks') {
    // 近2周
    // eslint-disable-next-line no-unused-vars
    const [yearNow, monthNow, dateNow, hourNow, minuteNow, secondNow] = getYmdhmsByTime(timeObj)
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, hour, minute, second] = getYmdhmsByTime(timeObj.getTime() - 14 * 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} 23:59:59`]
  } else if (flag === 'pastWeek') {
    // 近1周
    // eslint-disable-next-line no-unused-vars
    const [yearNow, monthNow, dateNow, hourNow, minuteNow, secondNow] = getYmdhmsByTime(timeObj)
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, hour, minute, second] = getYmdhmsByTime(timeObj.getTime() - 7 * 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} 23:59:59`]
  } else if (flag === 'pastThreeDays') {
    // 近3日
    // eslint-disable-next-line no-unused-vars
    const [yearNow, monthNow, dateNow, hourNow, minuteNow, secondNow] = getYmdhmsByTime(timeObj)
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, hour, minute, second] = getYmdhmsByTime(timeObj.getTime() - 3 * 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} 23:59:59`]
  } else if (flag === 'pastDay') {
    // 近1日
    // eslint-disable-next-line no-unused-vars
    const [yearNow, monthNow, dateNow, hourNow, minuteNow, secondNow] = getYmdhmsByTime(timeObj)
    // eslint-disable-next-line no-unused-vars
    const [year, month, date, hour, minute, second] = getYmdhmsByTime(timeObj.getTime() - 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} 23:59:59`]
  } else if (flag.slice(0, 4) === 'days') {
    // n日前0点至今，入参为形如‘days1’的字符串
    let n = 1
    const num = flag.slice(4)
    if (num && num * 1 && num * 1 >= 0 && num % 1 === 0) {
      n = num * 1
    }
    const [yearNow, monthNow, dateNow, hourNow, minuteNow, secondNow] = getYmdhmsByTime(timeObj)
    const [year, month, date] = getYmdhmsByTime(timeObj.getTime() - n * 24 * 60 * 60 * 1000)
    return [`${year}-${month}-${date} 00:00:00`, `${yearNow}-${monthNow}-${dateNow} ${hourNow}:${minuteNow}:${secondNow}`]
  } else {
    // 关键词错误时，默认返回本日
    const [year, month, date, hour, minute, second] = getYmdhmsByTime(timeObj)
    return [`${year}-${month}-${date} 00:00:00`, `${year}-${month}-${date} ${hour}:${minute}:${second}`]
  }
}
/**
 * 补0方法
 * @param num 需要补0的数字，根据是否小于10来判断是否补0
 * @returns {*|string} 补好0的字符串，注意，是字符串
 */
const addZero = num => {
  return num >= 10 ? '' + num : '0' + num
}
/**
 * 根据时间获取该时间的年月日时分秒
 * @param time 传入的时间，支持任意时间格式，不传默认现在
 * @returns {(number|*)[]}年月日时分秒的arr，建议解构取值
 */
const getYmdhmsByTime = (time) => {
  const timeObj = new Date(time).getTime() ? new Date(time) : new Date()
  const year = timeObj.getFullYear()
  const month = addZero(timeObj.getMonth() + 1)
  const date = addZero(timeObj.getDate())
  const hour = addZero(timeObj.getHours())
  const minute = addZero(timeObj.getMinutes())
  const second = addZero(timeObj.getSeconds())
  return [year, month, date, hour, minute, second]
}

const requestReturn = function(data, dispayMsg = true) {
  if (data.errCode === 0) {
    if (dispayMsg) {
      Message({
        title: '成功',
        message: data.errMsg,
        duration: 3000,
        type: 'success'
      })
    }
    return data.msgData
  } else if (data.errCode === 2) {
    Message({
      title: '错误',
      message: data.errMsg,
      duration: 5000,
      type: 'error'
    })
    store.dispatch('LogOut').then(() => {
      location.reload()
    })
  } else {
    Message({
      title: '错误',
      message: data.errMsg,
      duration: 5000,
      type: 'error'
    })
  }
}

export default { calculateTimeRange, requestReturn }
