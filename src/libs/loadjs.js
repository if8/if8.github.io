let noop = function() {}
let bundleIdCache = {}
let bundleIdResultMap = {}
let bundleIdCallbackQueueMap = {}
let defaultArgs = {
  success: noop,
  error: noop,
  before: noop,
  numRetries: 0,
}

function subscribe(bundleIds, callbackFn) {
  let depsNotFound = []
  let len = bundleIds.length
  let numWaiting = len
  let fn = function(bundleId, pathsNotFound) {
    if (pathsNotFound.length) {
      depsNotFound.push(bundleId)
    }

    numWaiting--
    if (!numWaiting) {
      callbackFn(depsNotFound)
    }
  }

  // register callback
  while (len--) {
    let bundleId = bundleIds[len]
    let bundleIdResult = bundleIdResultMap[bundleId]

    // execute callback if in result cache
    if (bundleIdResult) {
      fn(bundleId, bundleIdResult)
    } else {
      // add to callback queue
      bundleIdCallbackQueueMap[bundleId] =
        bundleIdCallbackQueueMap[bundleId] || []
      bundleIdCallbackQueueMap[bundleId].push(fn)
    }
  }
}

function publish(bundleId, pathsNotFound) {
  if (!bundleId) return

  bundleIdResultMap[bundleId] = pathsNotFound

  var bundleIdCallbackQueue = bundleIdCallbackQueueMap[bundleId]

  // empty callback queue
  while (bundleIdCallbackQueue && bundleIdCallbackQueue.length) {
    bundleIdCallbackQueue[0](bundleId, pathsNotFound)
    bundleIdCallbackQueue.splice(0, 1)
  }
}

function executeCallbacks({ error, success }, depsNotFound) {
  return depsNotFound.length ? error(depsNotFound) : success()
}

function loadFile(path, callbackFn, args, numTries = 0) {
  var doc = document,
    async = args.async,
    maxTries = args.numRetries + 1,
    beforeCallbackFn = args.before,
    pathname = path.replace(/[?|#].*$/, ''),
    pathStripped = path.replace(/^(css|img)!/, ''),
    isLegacyIECss,
    ele

  if (/(^css!|\.css$)/.test(pathname)) {
    ele = doc.createElement('link')
    ele.rel = 'stylesheet'
    ele.href = pathStripped

    // tag IE9+
    isLegacyIECss = 'hideFocus' in ele

    // use preload in IE Edge (to detect load errors)
    if (isLegacyIECss && ele.relList) {
      isLegacyIECss = 0
      ele.rel = 'preload'
      ele.as = 'style'
    }
  } else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(pathname)) {
    ele = doc.createElement('img')
    ele.src = pathStripped
  } else {
    ele = doc.createElement('script')
    ele.src = path
    ele.async = async === undefined ? true : async
  }

  ele.onload = ele.onerror = ele.onbeforeload = function(ev) {
    var result = ev.type[0]

    // treat empty stylesheets as failures to get around lack of onerror
    // support in IE9-11
    if (isLegacyIECss) {
      try {
        if (!ele.sheet.cssText.length) {
          result = 'e'
        }
      } catch (err) {
        // sheets objects created from load errors don't allow access to
        // `cssText` (unless error is Code:18 SecurityError)
        if (err.code != 18) {
          result = 'e'
        }
      }
    }

    // handle retries in case of load failure
    if (result == 'e') {
      numTries += 1

      if (numTries < maxTries) {
        return loadFile(path, callbackFn, args, numTries)
      }
    } else if (ele.rel == 'preload' && ele.as == 'style') {
      // activate preloaded stylesheets
      return (ele.rel = 'stylesheet')
    }

    callbackFn(path, result, ev.defaultPrevented)
  }

  if (beforeCallbackFn(path, ele) !== false) {
    doc.head.appendChild(ele)
  }
}

function loadFiles(paths, callbackFn, args) {
  paths = Array.isArray(paths) ? paths : [paths]

  let numWaiting = paths.length
  let pathsNotFound = []
  let fn = function(path, result, defaultPrevented) {
    if (result == 'e') {
      pathsNotFound.push(path)
    }

    // handle beforeload event. If defaultPrevented then that means the load
    // will be blocked (ex. Ghostery/ABP on Safari)
    if (result == 'b') {
      if (defaultPrevented) {
        pathsNotFound.push(path)
      } else {
        return
      }
    }

    numWaiting--
    if (!numWaiting) {
      callbackFn(pathsNotFound)
    }
  }

  for (let i = 0, len = numWaiting; i < len; i++) {
    loadFile(paths[i], fn, args)
  }
}

export default function loadjs(paths, arg1, arg2) {
  var bundleId, args

  if (typeof arg1 === 'string') {
    bundleId = arg1
    args = arg2
  } else {
    args = arg1
  }

  if (typeof args === 'function') {
    args = Object.assign(defaultArgs, { success: args })
  } else {
    args = Object.assign({}, defaultArgs, args)
  }

  // throw error if bundle is already defined
  if (bundleId) {
    if (bundleId in bundleIdCache) {
      throw 'LoadJS'
    } else {
      bundleIdCache[bundleId] = true
    }
  }

  return new Promise(function loadFn(resolve, reject) {
    loadFiles(
      paths,
      function(pathsNotFound) {
        executeCallbacks(args, pathsNotFound)

        executeCallbacks({ success: resolve, error: reject }, pathsNotFound)

        publish(bundleId, pathsNotFound)
      },
      args,
    )
  })
}

loadjs.ready = function ready(deps, args) {
  deps = Array.isArray(deps) ? deps : [deps]
  args =
    typeof args === 'function'
      ? Object.assign({ success: args }, defaultArgs)
      : Object.assign({}, args, defaultArgs)

  subscribe(deps, function(depsNotFound) {
    executeCallbacks(args, depsNotFound)
  })
  return loadjs
}

loadjs.done = function done(bundleId) {
  publish(bundleId, [])
  return loadjs
}

loadjs.reset = function reset() {
  bundleIdCache = {}
  bundleIdResultMap = {}
  bundleIdCallbackQueueMap = {}
  return loadjs
}

loadjs.isDefined = function isDefined(bundleId) {
  return bundleId in bundleIdCache
}
