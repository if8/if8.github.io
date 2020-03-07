import Vue from "vue"
import Vuex from 'vuex'
import Router from 'vue-router'
import VueAwesome from 'vue-awesome'
import App from "./main.vue"
import Meta from 'vue-meta'
import initLayout from "@components/Layout/index.js"
import initRouter from './router/index.js'
import initStore from './store/index.js'
import '@styles/reboot.css'
import '@styles/common.scss'

initLayout(Vue)
let store = initStore(Vue, Vuex)
let router = initRouter(Vue, Router)
window.$store = router.$store = store
window.$router = store.$router = router
Vue.component('v-icon', VueAwesome)
Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

window.App = new Vue({
  el: '#app',
  router,
  store,
  ...App
})
