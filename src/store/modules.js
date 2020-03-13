const state = {
  isShow: false,
}

const getters = {}

const mutations = {
  setShowAlert(state, data) {
    state.isShow = data
  },
}

const actions = {
  fetchShowAlert(context, v) {
    context.commit('setShowAlert', v)
  },
}

export const global = {
  state,
  getters,
  mutations,
  actions,
}

const files = require.context('@pages', true, /store.js$/)

export const modules = files.keys().reduce(function(acc, key) {
  var dirs = key.split('/')
  const moduleName = dirs[dirs.length - 2]
  acc[moduleName] = files(key).default
  return acc
}, {})
