class Dep {
  constructor() {
    this.subs = []
  }
}
Dep.target = null

function observer(vm, key, val) {
  let dep = new Dep()
  Object.defineProperty(vm, key, {
    get() {
      if (Dep.target) {
        dep.subs.push(Dep.target)
      }
      return val
    },
    set(newVal) {
      val = newVal
      for (let cb of dep.subs) {
        cb.call(vm)
      }
    },
  })
}

class Watcher {
  constructor(vm, render) {
    Dep.target = render
    render.call(vm)
    Dep.target = null
  }
}

class Vue {
  constructor(option) {
    let data = option.data()
    let depMethods = option.depMethods

    Object.keys(data).forEach(key => {
      observer(this, key, data[key])
    })
    Object.keys(depMethods).forEach(key => {
      new Watcher(this, depMethods[key])
    })
  }
}

/// <p class="text"></p>

let vm = new Vue({
  data() {
    return { msg: 1 }
  },
  depMethods: {
    computedA() {
      return this.msg + 1
    },
    render() {
      document.querySelector('.text').innerText = this.msg
    },
  },
})

vm.msg = 333
