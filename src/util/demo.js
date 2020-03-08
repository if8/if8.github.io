import { AsyncQueue } from "@lib/AsyncQueue"

export function genAsyncQueue(params) {
  let channel = new AsyncQueue()
  return {
    get () {
      return channel.get()
    },
    put (message) {
      return channel.put(message)
    }
  }
}

export function asyncCallback(func, files, finish) {
  var output = []

  ;(function next(i, len, callback) {
    if (i < len) {
      func(files[i], function(data, err) {
        if (err) {
          callback(err)
        } else {
          output.push(data)
          next(i + 1, len, callback)
        }
      })
    } else {
      callback(null, output)
    }
  })(0, files.length, finish)
}

export function compose(middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError("Middleware stack must be an array!")
  }

  for (const fn of middleware) {
    if (typeof fn !== "function") {
      throw new TypeError("Middleware must be composed of functions!")
    }
  }

  return function(context, next) {
    let index = -1

    function dispatch(runIndex, ...args) {
      if (runIndex <= index) {
        return Promise.reject(new Error("next() called multiple times"))
      }

      if (args.length) {
        return Promise.resolve(next.apply(null, args))
      }

      index = runIndex

      // fn 是一个async的方法
      let fn = runIndex === middleware.length ? next : middleware[runIndex]

      if (!fn) {
        return Promise.resolve()
      }

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, runIndex + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}

export function travel(dir, callback, finish) {
  fs.readdir(dir, function(err, files) {
    ;(function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir, files[i])

        fs.stat(pathname, function(err, stats) {
          if (stats.isDirectory()) {
            travel(pathname, callback, function() {
              next(i + 1)
            })
          } else {
            callback(pathname, function() {
              next(i + 1)
            })
          }
        })
      } else {
        finish && finish()
      }
    })(0)
  })
}
