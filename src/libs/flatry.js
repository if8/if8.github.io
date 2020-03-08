export function isPromise (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

function flatrySync (fn) {
  try {
    return [null, fn()]
  } catch (err) {
    return [err]
  }
}

export default function flatry (fn) {
  if (typeof fn !== 'function' && !isPromise(fn)) {
    throw new Error('Argument must be a function or Promise')
  }

  var successFn = function (value) {
    return [null, value]
  }
  var errorFn = function (err) {
    return [err]
  }

  return isPromise(fn) ? fn.then(successFn, errorFn) : flatrySync(fn)
}
