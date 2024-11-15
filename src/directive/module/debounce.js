const debounce = {
  inserted: function(el, binding) {
    let timer
    const wait = 1500
    const immediate = true
    el.addEventListener('click', () => {
      //  移除定时器
      if (timer !== null) {
        clearTimeout(timer)
      }
      if (immediate) {
        //  立即执行
        const callNow = !timer
        timer = setTimeout(() => {
          timer = null
        }, wait)
        if (callNow) typeof binding.value() === 'function' && binding.value()
      } else {
        timer = setTimeout(() => {
          typeof binding.value() === 'function' && binding.value()
        }, wait)
      }
      // timer = setTimeout(() => {
      //   binding.value()
      // }, 1000)
    })
  }
}
export default debounce
