// import { loggerPlugin } from './plugins'
import { global, modules } from './modules.js'

export default function init(Vue, Vuex) {
  Vue.use(Vuex)

  let storeInstance = new Vuex.Store({
    ...global,
    modules,
    strict: false,
    plugins: []
  })

  return storeInstance
}
