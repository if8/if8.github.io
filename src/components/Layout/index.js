const files = require.context("@components/Layout", true, /\.vue$/)

export default function (Vue) {
  files.keys().forEach(function (path) {
    Vue.component(files(path).default.name, files(path).default)
  })
}
