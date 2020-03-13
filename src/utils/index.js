export function promiseInvert() {
  var resolve
  var reject
  var promise = new Promise(function(r, j) {
    resolve = r
    reject = j
  })
  return { promise, resolve, reject }
}

export function getIEVersion() {
  const ua = window.navigator.userAgent

  const msie = ua.indexOf('MSIE ')
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
  }

  const trident = ua.indexOf('Trident/')
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:')
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
  }

  const edge = ua.indexOf('Edge/')
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
  }

  // other browser
  return -1
}

export function funcLimitTime(fn, timeSpan) {
  let pending = false
  return (...args) => {
    if (!pending) {
      pending = true
      fn(...args)
      setTimeout(() => {
        pending = false
      }, timeSpan)
    }
  }
}

export function isDocumentVisible() {
  if (
    typeof document !== 'undefined' &&
    typeof document.visibilityState !== 'undefined'
  ) {
    return document.visibilityState !== 'hidden'
  }
  return true
}

export function isOnline() {
  if (typeof navigator.onLine !== 'undefined') {
    return navigator.onLine
  }
  return true
}

export let subscribeFocus = (function() {
  let listeners = []
  let eventBound = false

  if (!eventBound) {
    const revalidate = function() {
      if (!isDocumentVisible() || !isOnline()) {
        return
      }

      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i]
        listener()
      }
    }
    window.addEventListener('visibilitychange', revalidate, false)
    window.addEventListener('focus', revalidate, false)
    eventBound = true
  }

  return function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
})()

export let subscribeVisible = (function() {
  let listeners = []
  let eventBound = false

  if (!eventBound) {
    const revalidate = function() {
      if (!isDocumentVisible()) {
        return
      }

      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i]
        listener()
      }
    }
    window.addEventListener('visibilitychange', revalidate, false)
    eventBound = true
  }

  return function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
})()

const cache = {}
export function setCache(key, data) {
  if (cache[key]) {
    clearTimeout(cache[key].timer)
  }
  // 数据在不活跃 5min 后，删除掉
  const timer = setTimeout(() => {
    delete cache[key]
  }, 5 * 60 * 1000)

  cache[key] = {
    data,
    timer,
  }
}
export function getCache(key) {
  var item = cache[key]
  return item == void 0 ? void 0 : item.data
}
