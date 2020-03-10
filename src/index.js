import Vue from "vue"
import Vuex from "vuex"
import Router from "vue-router"
import App from "./main.vue"
import Meta from "vue-meta"
import initLayout from "@components/Layout/index.js"
import initRouter from "./router/index.js"
import initStore from "./store/index.js"
import VueCompositionApi from "@vue/composition-api"
import VTooltip from "v-tooltip"
import Buefy from "buefy"
import "buefy/dist/buefy.css"
import "@styles/common.scss"

initLayout(Vue)
let store = initStore(Vue, Vuex)
let router = initRouter(Vue, Router)
window.$store = router.$store = store
window.$router = store.$router = router

Vue.use(VueCompositionApi)
Vue.use(Meta, {
  keyName: "metaInfo", // the component option name that vue-meta looks for meta info on.
  attribute: "data-vue-meta", // the attribute name vue-meta adds to the tags it observes
  tagIDKeyName: "vmid" // the property name that vue-meta uses to determine whether to overwrite or append a tag
})
Vue.use(VTooltip)
Vue.use(Buefy)

window.App = new Vue({
  el: "#app",
  router,
  store,
  ...App
})
