import Vue from "vue"
import Vuex from 'vuex'
import Router from 'vue-router'
import VueAwesome from 'vue-awesome'
import App from "./main.vue"
import initLayout from "@components/Layout/index.js"
import initRouter from './router/index.js'
import initStore from './store/index.js'
import '@styles/reboot.css'
Vue.component('v-icon', VueAwesome)

initLayout(Vue)
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
