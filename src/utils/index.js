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

const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g

export function escapeStringRegexp(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string')
  }

  return str.replace(matchOperatorsRegex, '\\$&')
}

export function copyTextToClipboard(input) {
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement

  element.value = input

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '')

  element.style.contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt' // Prevent zooming on iOS

  const selection = document.getSelection()
  let originalRange = false
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  document.body.append(element)
  element.select()

  // Explicit selection workaround for iOS
  element.selectionStart = 0
  element.selectionEnd = input.length

  let isSuccess = false
  try {
    isSuccess = document.execCommand('copy')
  } catch (_) {
    isSuccess = false
  }

  element.remove()

  if (originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  // Get the focus back on the previously focused element, if any
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }

  return isSuccess
}
