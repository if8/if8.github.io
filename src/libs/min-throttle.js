export function throttle(
  callback,
  wait = 0,
  { start = true, middle = true, once = false } = {}
) {
  let last = 0
  let timer
  let cancelled = false

  const fn = function(...args) {
    if (cancelled) {
      return
    }

    const delta = Date.now() - last

    if (start) {
      start = false
      run(...args)
    } else if (!middle || delta < wait) {
      clearTimeout(timer)
      timer = setTimeout(run, !middle ? wait : wait - delta, ...args)
    }
  }

  fn.cancel = function() {
    clearTimeout(timer)
    cancelled = true
  }

  function run(...args) {
    last = Date.now()
    callback(...args)
    if (once) {
      fn.cancel()
    }
  }

  return fn
}

export function debounce(callback, wait = 0) {
  return throttle(callback, wait, { start: false, middle: false, once: false })
}
