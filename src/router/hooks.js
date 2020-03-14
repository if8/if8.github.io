import loadjs from '@libs/loadjs.js'
import { filterRoutes } from '@libs/smart-route.js'
import testRouter from './test/router.js'

export function loadDynamic({ router, to, next }) {
  if (to.meta.isDynamic) {
    let toPathList = to.path.split('/')
    loadjs(`/checkProduct.js?rootPath=${toPathList[1]}`)
      .catch(r => {
        // todo 从指定池子中加载
        let productRoutes = testRouter(toPathList[1])
        router.addRoutes(productRoutes)

        let matchedList = filterRoutes(
          productRoutes,
          route => to.path === route.path,
        )
        next({ path: matchedList.length ? to.path : '/404' })
      })
      .catch(_ => {
        next({ path: '/404' })
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
