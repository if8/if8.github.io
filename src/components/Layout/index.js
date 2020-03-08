const files = require.context("@components/Layout", false, /\.vue$/)

export default function (Vue) {
  files.keys().forEach(function (path) {
    Vue.component(files(path).default.name, files(path).default)
  })
}
