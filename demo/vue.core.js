class Deb {
  constructor () {
    this.subs = []
  }
}
Deb.target = null


function observer (vm, key, val) {
  let dep = new dep()
  Object.defineProperty(vm, key, {
    get () {
      if (Dep.target) {
        dep.subs.push(Dep.target)
      }
      return val
    },
    set (newVal) {
      val = newVal
      for (let cb of dep.subs) {
        cb.call(vm)
      }
    }
  })
}

class Watcher {
  constructor (vm, render) {
    Dep.target = render
    render.call(vm)
    Dep.target = null
  }
}

class Vue {
  constructor (option) {
    let data = option.data()
    let renderFun = option.render
    Object.keys(data).forEach(key => {
      observer(this, key, data[key])
    })
    new Watcher(this, renderFun)
  }
}
