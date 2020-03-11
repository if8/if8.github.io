function create (Con, ...args) {
  this.obj = {};

  Object.setPrototypeOf(this.obj, Con.prototype);

  let result = Con.apply(this.obj, args);

  return result instanceof Object ? result : this.obj;
}


Array.myIsArray = function (o) {
  return Object.prototype.toString.call(Object(o)) === '[object Array]';
};


function new2 (o) {
  var F = function () { };
  F.prototype = o;
  return new F();
};

class Event {
  constructor() {
    this._cache = {}
  }

  on (type, callback) {
    let fns = (this._cache[type] = this._cache[type] || [])
    if (fns.indexOf(callback) === -1) {
      fns.push(callback)
    }
    return this
  }

  off (type, callback) {
    let fns = this._cache[type]
    if (Array.isArray(fns)) {
      if (callback) {
        let index = fns.indexOf(callback)
        if (index !== -1) {
          fns.splice(index, 1)
        }
      } else {
        fns.length = 0
      }
    }
    return this
  }

  trigger (type, data) {
    let fns = this._cache[type]
    if (Array.isArray(fns)) {
      fns.forEach((fn) => fn(data))
    }
    return this
  }

  once (type, callback) {
    let wrapFun = () => {
      callback.call(this);
      this.off(type, wrapFun);
    };
    this.on(type, wrapFun);
    return this;
  }
}

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue ? initialValue : this[0];
  for (let i = initialValue ? 0 : 1; i < this.length; i++) {
    let _this = this;
    accumulator = callback(accumulator, this[i], i, _this);
  }
  return accumulator;
};

Function.prototype.myCall = function (context, ...args) {
  context = context || window;

  context.fn = this;

  const result = context.fn(...args); // context.fn(...arg1)

  delete context.fn;

  return result
};

Function.prototype.mybind = function (context = window, ...rest) {
  let _this = this;

  return function F () {
    let rest2 = Array.prototype.slice.call(arguments)

    if (this instanceof F) { // new
      return new _this(...rest2)
    } else {
      _this.apply(context, rest.concat(rest2));
    }
  }
};

function progressCurrying (fn, args = []) {
  let _this = this
  let len = fn.length;

  return function () {
    let _args = Array.prototype.slice.call(arguments);
    Array.prototype.push.apply(args, _args);

    // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
    if (_args.length < len) {
      return progressCurrying.call(_this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

function debounce (func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args); // context.func(args)
    }, wait);
  };
}

function throttle (fn, delay) {
  let prevTime = Date.now();
  return function () {
    let curTime = Date.now();
    if (curTime - prevTime > delay) {
      fn.apply(this, arguments);
      prevTime = curTime;
    }
  };
}

JSON.parse(JSON.stringfy(obj))

function clone (target) {
  if (typeof target === 'object') {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key])
    }
    return cloneTarget;
  } else {
    return target
  }
}

function clone2 (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    if (map.get(target)) {
      return target;
    }

    let cloneTarget = Array.isArray(target) ? [] : {};
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone2(target[key], map)
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// L 表示左表达式，R 表示右表达式
function instance_of (L, R) {
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) {
      return false;
    }
    // 这里重点：当 O 严格等于 L 时，返回 true
    if (O === L) {
      return true;
    }
    L = L.__proto__;
  }
}

function myExtend (C, P) {
  var F = function () { };
  F.prototype = P.prototype;
  C.prototype = new F();
  C.prototype.constructor = C;
  C.super = P.prototype;
}

function _asyncToGenerator (fn) {
  return function () {
    var self = this,
      args = arguments;

    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args); // 获取迭代器实例

      function _next (value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }

      function _throw (err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      // 第一次触发
      _next(undefined);
    });
  };
}

function my_co (it) {
  return new Promise((resolve, reject) => {
    function next (data) {
      try {
        var { value, done } = it.next(data);
      } catch (e) {
        return reject(e);
      }

      if (!done) {
        //done为true,表示迭代完成
        //value 不一定是 Promise，可能是一个普通值。使用 Promise.resolve 进行包装。
        Promise.resolve(value).then(val => next(val), reject);
      } else {
        resolve(value);
      }
    }

    next(); //执行一次next
  });
}

function* test () {
  yield new Promise((resolve, reject) => {
    setTimeout(resolve, 100);
  });
  yield new Promise((resolve, reject) => {
    // throw Error(1);
    resolve(10)
  });
  yield 10;
  return 1000;
}

Array.prototype.myFlat = function (num = 1) {
  if (Array.isArray(this)) {
    let arr = [];
    if (!Number(num) || Number(num) < 0) {
      return this;
    }
    this.forEach(item => {
      if (Array.isArray(item)) {
        let count = num
        arr = arr.concat(item.myFlat(--count))
      } else {
        arr.push(item)
      }
    });
    return arr;
  } else {
    throw this + ".flat is not a function";
  }
};

Array.prototype.myMap = function (callback, thisArg) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(callback.call(thisArg, this[i], i, this));
  }
  return arr;
};

Array.prototype.myMap2 = function (callback, thisArg) {
  let result = this.reduce((accumulator, currentValue, index, array) => {
    accumulator.push(callback.call(thisArg, currentValue, index, array));
    return accumulator;
  }, []);
  return result;
};


const effectStack = []
function run (effect, fn, args) {
  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect)
      return fn(...args)
    } finally {
      effectStack.pop()
    }
  }
}

function effect (fn, options = {}) {
  const effect = function effect (...args) {
    return run(effect, fn, args) // 里面执行fn
  }
  effect.lazy = options.lazy
  effect.computed = options.computed
  effect.deps = []

  // 不是理解计算的，不需要调用此时调用effect
  if (!options.lazy) {
    effect()
  }
  return effect
}

const isObject = val => val !== null && typeof val === 'object'
const toProxy = new WeakMap() // 缓存代理过的对象
const toRaw = new WeakMap() // 缓存被代理过的对象

const handlers = {
  get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    track(target, key)
    return isObject(res) ? reactive(res) : res
  },
  set (target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    const extraInfo = { oldValue: target[key], newValue: value }
    trigger(target, key, extraInfo)
    return result
  }
}

function reactive (target) {
  let observed = toProxy.get(target)
  if (observed) {
    return observed
  }
  if (toRaw.has(target)) {
    return target
  }
  observed = new Proxy(target, handlers)
  toProxy.set(target, observed) // 缓存observed
  toRaw.set(observed, target) // 缓存target
  return observed
}

const targetMap = new WeakMap()
function track (target, key) {
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target) || new Map()
    targetMap.set(target, depsMap)

    let dep = depsMap.get(key) || new Set()
    depsMap.set(key, dep)

    if (!dep.has(effect)) {
      dep.add(effect)
      effect.deps.push(dep)
    }
  }
}

function trigger (target, key, extraInfo) {
  const depsMap = targetMap.get(target)
  if (depsMap === void 0) {
    return;
  }

  const effects = new Set() // 普通的 effect
  const computedRunners = new Set() // computed 的 effect

  if (key !== void 0) {
    let deps = depsMap.get(key)
    deps.forEach(effect => {
      if (effect.computed) {
        computedRunners.add(effect)
      } else {
        effects.add(effect)
      }
    })
  }
  const run = effect => {
    if (effect.options.scheduler !== void 0) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  }

  computedRunners.forEach(run)
  effects.forEach(run)
}

function computed (fn) {
  const getter = isObject(fn) ? fn.get : fn
  const setter = isObject(fn) ? fn.set : () => { throw ('') }

  let dirty = true
  const effect = effect(getter, {
    computed: true,
    lazy: true,
    scheduler: () => {
      if (!dirty) {
        dirty = true
        trigger(computed, 'set' /* SET */, 'value')
      }
    }
  })

  let computed = {
    effect,
    get value () {
      if (dirty) {
        value = runner()
        dirty = false
      }
      track(computed, 'get' /* GET */, 'value')
      return value
    },
    set value (newValue) {
      setter(newValue)
    }
  }
  return computed
}
