export function debounce(fn, delay) {
  let timer = null
  let immediateFlag = true
  console.log('immediateFlag', immediateFlag)
  return (...args) => {
    clearTimeout(timer)

    if (immediateFlag) {
      fn.apply(this, args)
      immediateFlag = false
    }

    timer = setTimeout(() => {
      immediateFlag = true
    }, delay)
  }
}


export function throttle(fn, delay) {
  let lastTime = 0
  
  return function () {
    let nowTime = new Date().getTime()
    if (nowTime - lastTime > delay) {
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}