/**
 *  防抖
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 */
let timeout
export function debounce(func, wait = 1500, immediate = true) {
  //  移除定时器
  if (timeout !== null) {
    clearTimeout(timeout)
  }
  //  是否立即执行
  if (immediate) {
    //  立即执行
    const callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, wait)
    if (callNow) typeof func === 'function' && func()
  } else {
    //  设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === 'function' && func()
    }, wait)
  }
}
/**
 * 节流
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 */
// eslint-disable-next-line no-unused-vars
let timer, flag
export function throttle(func, wait = 3000, immediate = true) {
  //  是否立即执行
  if (immediate) {
    //  立即执行
    if (!flag) {
      flag = true
      typeof func === 'function' && func()
      timer = setTimeout(() => {
        flag = false
      }, wait)
    }
  } else {
    if (!flag) {
      flag = true
      timer = setTimeout(() => {
        flag = false
        typeof func === 'function' && func()
      }, wait)
    }
  }
}
