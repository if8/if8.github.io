import Vue from "vue"
import Vuex from 'vuex'
import Router from 'vue-router'
import App from "./main.vue"

import initRouter from './router/index.js'
import initStore from './store/index.js'


let store = initStore(Vue, Vuex)
let router = initRouter(Vue, Router)
window.$store = router.$store = store
window.$router = store.$router = router

window.App = new Vue({
  el: '#app',
  router,
  store,
  ...App
})
