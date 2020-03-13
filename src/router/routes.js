import { promiseInvert } from '@utils/index.js'
import CompError from '@components/CompError.vue'
import CompLoading from '@components/CompLoading.vue'
import NotFound from '@components/NotFound.vue'
import SiteIntro from '@components/business/SiteIntro.vue'
import ShowIcons from '@components/ShowIcons.vue'

export function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: CompLoading,
    error: CompError,
    delay: 400,
    timeout: 8000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      return h(AsyncHandler, data, children)
    },
  })
}

export function lazyLoadComponent({ compFactory, loadingComp, loadingData }) {
  return function() {
    let { promise, resolve, reject } = promiseInvert()

    return {
      component: promise,
      loading: {
        mounted() {
          if (!(`IntersectionObserver` in window)) {
            compFactory()
              .then(resolve)
              .catch(reject)
          } else {
            const observer = new IntersectionObserver(entries => {
              if (entries[0].intersectionRatio > 0) {
                observer.unobserve(this.$el)
                compFactory()
                  .then(resolve)
                  .catch(reject)
              }
            })
            observer.observe(this.$el)
          }
        },
        render(createElement) {
          return createElement(loadingComp, loadingData)
        },
      },
    }
  }
}

export const constantRouterArr = [
  {
    path: '/',
    name: 'home',
    component: SiteIntro,
    meta: {
      layout: 'LayoutC',
    },
    children: [],
  },
  {
    path: '/icons',
    name: 'icons',
    component: ShowIcons,
    meta: {
      layout: 'LayoutEmpty',
    },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      layout: 'LayoutA',
    },
  },
  {
    path: '/c',
    name: 'c',
    component: NotFound,
    meta: {
      layout: 'LayoutC',
    },
  },
  {
    path: '*',
    redirect: '/404',
  },
]

const files = require.context('@pages', true, /router.js$/)

export const asyncRouterArr = files.keys().reduce(function(acc, key) {
  return acc.concat(files(key).default)
}, [])
