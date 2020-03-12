import { asyncRouterArr, constantRouterArr } from './routes'
import { recordChannel } from './hooks'

function nextFactory(context, middlewareArr, index) {
  const subsequentMiddleware = middlewareArr[index]

  if (!subsequentMiddleware) {
    return context.next
  }

  return param => {
    if (param !== undefined) {
      return context.next(param)
    }
    const nextMiddleware = nextFactory(context, middlewareArr, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

export default function(Vue, Router) {
  Vue.use(Router)

  const routerInstance = new Router({
    mode: 'hash',
    /*
      @desc: base,应用的基路径;如整个单页应用服务在 /app/ 下，base 就应该设为 "/app/";
      @reference: https://router.vuejs.org/zh-cn/api/options.html#base
    */
    base: '/',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: asyncRouterArr.concat(constantRouterArr)
  })

  routerInstance.beforeEach((to, from, next) => {
    // 不是初始化页面

    let middlewareArr = [recordChannel]

    to.matched.reduce(function(accumulator, item) {
      if (Array.isArray(item.meta.middleware)) {
        accumulator.push.apply(accumulator, item.meta.middleware)
      } else if (item.meta.middleware) {
        accumulator.push(item.meta.middleware)
      }
      return accumulator
    }, middlewareArr)

    const context = { to, from, next, router: routerInstance }
    const nextMiddleware = nextFactory(context, middlewareArr, 1)

    return middlewareArr[0]({ ...context, next: nextMiddleware })
  })

  // routerInstance.afterEach((to, from) => {
  // })

  return routerInstance
}
