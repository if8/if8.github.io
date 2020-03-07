export function promiseInvert () {
  var resolve
  var reject
  var promise = new Promise(function (r, j) {
    resolve = r
    reject = j
  })
  return { promise, resolve, reject }
}
