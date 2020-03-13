import { getCache, setCache } from '@utils/index.js'
import Fetch from '@utils/Fetch'
import {
  ref,
  set,
  watch,
  computed,
  onMounted,
  onUnmounted,
} from '@libs/composition-api'

const DEFAULT_KEY = 'USE_API_DEFAULT_KEY'

export default function useAsync(service, options = {}) {
  const {
    refreshDeps = [],
    manual = false,
    onSuccess = () => {},
    onError = () => {},
    defaultLoading = false,
    loadingDelay,
    pollingInterval = 0,
    pollingWhenHidden = true,
    defaultParams = [],
    refreshOnWindowFocus = false,
    focusTimespan = 5000,
    fetchKey,
    cacheKey,
    debounceInterval,
    throttleInterval,
    initialData,
    formatResult,
  } = options

  const config = {
    formatResult,
    onSuccess,
    onError,
    loadingDelay,
    pollingInterval,
    pollingWhenHidden,
    refreshOnWindowFocus,
    focusTimespan,
    debounceInterval,
    throttleInterval,
  }

  let newstFetchRef = ref(DEFAULT_KEY)
  let newFetches = {}
  let cacheData = cacheKey && getCache(cacheKey)

  // 如果有 缓存，则从缓存中读数据
  if (cacheData) {
    newstFetchRef.value = cacheData.newstFetchKey
    Object.keys(cacheData.fetches).forEach(key => {
      const cacheFetch = cacheData.fetches[key]
      const newFetch = new Fetch(service, config, subscribe.bind(null, key), {
        loading: cacheFetch.loading,
        params: cacheFetch.params,
        data: cacheFetch.data,
        error: cacheFetch.error,
      })
      newFetches[key] = newFetch.state
    })
  }

  const fetchesRef = ref(newFetches)

  const subscribe = (key, data) => {
    fetchesRef.value[key] = data

    if (cacheKey) {
      setCache(cacheKey, {
        fetches: fetchesRef.value,
        newstFetchKey: newstFetchRef.value,
      })
    }
  }

  const run = (...args) => {
    if (fetchKey) {
      const key = fetchKey(...args)
      newstFetchRef.value = key === undefined ? DEFAULT_KEY : key
    }

    let currentFetchKey = newstFetchRef.value
    let currentFetch = fetchesRef.value[currentFetchKey]

    if (!currentFetch) {
      const newFetch = new Fetch(
        service,
        config,
        subscribe.bind(null, currentFetchKey),
        {
          data: initialData,
        },
      )
      currentFetch = newFetch.state
      set(fetchesRef.value, currentFetchKey, currentFetch)
    }

    return currentFetch.run(...args)
  }

  onMounted(() => {
    if (!manual) {
      // 如果有缓存, 重新执行所有的
      if (Object.keys(fetchesRef.value).length) {
        Object.values(fetchesRef.value).forEach(f => f.refresh())
      } else {
        // 第一次默认执行，可以通过 defaultParams 设置参数
        run(...defaultParams)
      }
    }
  })

  const reset = () => {
    Object.values(fetchesRef.value).forEach(f => {
      f.unmount()
    })
    newstFetchRef.value = DEFAULT_KEY
    fetchesRef.value = {}
  }

  let unWatch = watch(
    refreshDeps,
    () => {
      if (!manual) {
        Object.values(fetchesRef.value).forEach(f => {
          f.refresh()
        })
      }
    },
    { deep: true },
  )

  onUnmounted(() => {
    unWatch()
    reset()
  })

  const noReady = function(name) {
    return () => {
      throw new Error(`Cannot call ${name} when service not executed once.`)
    }
  }

  return computed(() => {
    let newstFetchState = fetchesRef.value[newstFetchRef.value] || {}
    return Object.assign(
      {
        loading: !manual || defaultLoading,
        data: initialData,
        error: undefined,
        params: [],
        cancel: noReady('cancel'),
        refresh: noReady('refresh'),
        mutate: noReady('mutate'),
      },
      newstFetchState,
      {
        run,
        reset,
        fetches: fetchesRef.value,
      },
    )
  })
}
