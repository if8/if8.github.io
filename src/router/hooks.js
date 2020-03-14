import loadjs from '@libs/loadjs.js'

export function loadDynamic({ to, next }) {
  if (to.meta.isDynamic) {
    console.log('loadjs')
    loadjs(
      `${
        Math.random() > 0.3
          ? 'https://unpkg.com/jquery@3.4.1/dist/jquery'
          : to.path
      }.js`,
    )
      .then(r => {
        to.meta.layout = 'Layout-A'
        next()
      })
      .catch(_ => {
        next({ name: '404' })
      })
  } else {
    next()
  }
}

export function recordChannel({ to, next }) {
  var regResult = location.search.match(/channel=([0-9]+)/)
  if (!regResult) {
    regResult = String(to.query.channel).match(/^[0-9]+$/)
  }
  if (regResult) {
    localStorage.channel = regResult[1]
  }
  return next()
}
