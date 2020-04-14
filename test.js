function addHook(state, kind, name, orig) {
  if (!state.registry[name]) {
    state.registry[name] = []
  }

  let hook = {
    before: function(method, options) {
      return Promise.resolve()
        .then(orig.bind(null, options))
        .then(method.bind(null, options))
    },
    after: function(method, options) {
      let result
      return Promise.resolve()
        .then(method.bind(null, options))
        .then(result_ => {
          result = result_
          return orig(result, options)
        })
        .then(() => result)
    },
    error: function(method, options) {
      return Promise.resolve()
        .then(method.bind(null, options))
        .catch(error => orig(error, options))
    },
  }[kind]

  state.registry[name].push({ hook, orig })
}

function removeHook(state, name, method) {
  let nameList = state.registry[name]
  if (nameList) {
    state.registry[name] = nameList.filter(registered => {
      return registered.orig !== method
    })
  }
}

function register(state, name, method, options = {}) {
  if (Array.isArray(name)) {
    return name.reverse().reduce(function(callback, name) {
      return register.bind(null, state, name, callback, options)
    }, method)()
  } else {
    return Promise.resolve().then(function() {
      if (!state.registry[name]) {
        return method(options)
      }

      return state.registry[name].reduce(function(method, registered) {
        return registered.hook.bind(null, method, options)
      }, method)()
    })
  }
}

let bindable = Function.bind.bind(Function.bind)

function bindApi(hook, state, name) {
  let args = name ? [state, name] : [state]
  let removeHookRef = bindable(removeHook, null).apply(null, args)

  hook.api = { remove: removeHookRef }
  hook.remove = removeHookRef
  ;['before', 'error', 'after', 'wrap'].forEach(function(kind) {
    let args$1 = name ? [state, kind, name] : [state, kind]
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args$1)
  })
}

function HookSingular() {
  let singularHookName = 'h'
  let singularHookState = { registry: {} }
  let singularHook = register.bind(null, singularHookState, singularHookName)
  bindApi(singularHook, singularHookState, singularHookName)
  return singularHook
}

function HookCollection() {
  let state = { registry: {} }
  let hook = register.bind(null, state)
  bindApi(hook, state)
  return hook
}

export default function Hook$1() {
  if (!Hook$1.collectionHookDeprecationMessageDisplayed) {
    console.warn('[before-after-hook]:重复调用Hook(), 请使用Hook.Collection().')
    Hook$1.collectionHookDeprecationMessageDisplayed = true
  }
  return HookCollection()
}
Hook$1.Singular = HookSingular.bind()
Hook$1.Collection = HookCollection.bind()

export const Hook = Hook$1
export const Singular = Hook$1.Singular
export const Collection = Hook$1.Collection
