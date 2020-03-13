import { throttle, debounce } from '@libs/min-throttle'
import {
  funcLimitTime,
  isDocumentVisible,
  subscribeFocus,
  subscribeVisible,
} from '@utils/index.js'

export default class Fetch {
  constructor(service, config, subscribe, initState) {
    // 请求时序
    this.requestStamp = 0
    // 是否卸载
    this.unmountedFlag = false
    // visible 后，是否继续轮询
    this.pollingWhenVisibleFlag = false
    this.pollingTimer = undefined
    this.loadingDelayTimer = undefined
    this.unsubscribe = []
    this.service = service
    this.config = config
    this.subscribe = subscribe

    this.that = this
    this.state = {
      loading: false,
      params: [],
      data: undefined,
      error: undefined,
      run: this.run.bind(this.that),
      mutate: this.mutate.bind(this.that),
      refresh: this.refresh.bind(this.that),
      cancel: this.cancel.bind(this.that),
      unmount: this.unmount.bind(this.that),
    }

    if (initState) {
      this.state = Object.assign(Object.assign({}, this.state), initState)
    }

    this.formatResult =
      this.config.formatResult ||
      function(_) {
        return _
      }

    this.debounceRun = this.config.debounceInterval
      ? debounce(this._run.bind(this), this.config.debounceInterval)
      : undefined

    this.throttleRun = this.config.throttleInterval
      ? throttle(this._run.bind(this), this.config.throttleInterval)
      : undefined

    this.limitRefresh = funcLimitTime(
      this.refresh.bind(this),
      this.config.focusTimespan,
    )

    if (this.config.pollingInterval) {
      this.unsubscribe.push(subscribeVisible(this.rePolling.bind(this)))
    }

    if (this.config.refreshOnWindowFocus) {
      this.unsubscribe.push(subscribeFocus(this.limitRefresh.bind(this)))
    }
  }

  setState(s = {}) {
    this.state = Object.assign(Object.assign({}, this.state), s)
    this.subscribe(this.state)
  }

  _run(...args) {
    // 取消已有定时器
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer)
    }

    // 取消 loadingDelayTimer
    if (this.loadingDelayTimer) {
      clearTimeout(this.loadingDelayTimer)
    }

    this.requestStamp = Date.now()
    // 闭包存储当次请求的 requestStamp
    const lastRequestStamp = this.requestStamp

    this.setState({
      loading: !this.config.loadingDelay,
      params: args,
    })

    if (this.config.loadingDelay) {
      this.loadingDelayTimer = setTimeout(() => {
        this.setState({ loading: true })
      }, this.config.loadingDelay)
    }

    return this.service(...args)
      .then(res => {
        if (!this.unmountedFlag && lastRequestStamp === this.requestStamp) {
          if (this.loadingDelayTimer) {
            clearTimeout(this.loadingDelayTimer)
          }

          const formattedResult = this.formatResult(res)

          this.setState({
            data: formattedResult,
            error: undefined,
            loading: false,
          })

          if (this.config.onSuccess) {
            this.config.onSuccess(formattedResult, args)
          }

          return formattedResult
        }
      })
      .catch(error => {
        if (!this.unmountedFlag && lastRequestStamp === this.requestStamp) {
          if (this.loadingDelayTimer) {
            clearTimeout(this.loadingDelayTimer)
          }

          this.setState({
            data: undefined,
            error,
            loading: false,
          })

          if (this.config.onError) {
            this.config.onError(error, args)
          }

          console.error(error)
          return error
        }
      })
      .finally(() => {
        if (!this.unmountedFlag && lastRequestStamp === this.requestStamp) {
          if (this.config.pollingInterval) {
            // 如果屏幕隐藏，并且 !pollingWhenHidden, 则停止轮询，并记录 flag，等 visible 时，继续轮询
            if (!isDocumentVisible() && !this.config.pollingWhenHidden) {
              this.pollingWhenVisibleFlag = true
              return
            }

            this.pollingTimer = setTimeout(() => {
              this._run(...args)
            }, this.config.pollingInterval)
          }
        }
      })
  }

  run(...args) {
    // options 存在 debounceInterval，则 run 和 refresh 不会返回 Promise。
    if (this.debounceRun) {
      this.debounceRun(...args)
      return Promise.resolve(null)
    }

    // options 存在 throttleInterval，则 run 和 refresh 不会返回 Promise。
    if (this.throttleRun) {
      this.throttleRun(...args)
      return Promise.resolve(null)
    }

    return this._run(...args)
  }

  cancel() {
    if (this.debounceRun) {
      this.debounceRun.cancel()
    }
    if (this.throttleRun) {
      this.throttleRun.cancel()
    }
    if (this.loadingDelayTimer) {
      clearTimeout(this.loadingDelayTimer)
    }
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer)
    }
    this.pollingWhenVisibleFlag = false
    this.requestStamp = Date.now()
    this.setState({ loading: false })
  }

  refresh() {
    return this.run(...this.state.params)
  }

  rePolling() {
    if (this.pollingWhenVisibleFlag) {
      this.pollingWhenVisibleFlag = false
      this.refresh()
    }
  }

  mutate(data) {
    let newData = data
    if (typeof data === 'function') {
      newData = data(this.state.data) || {}
    }
    this.setState({ data: newData })
  }

  unmount() {
    this.unmountedFlag = true
    this.cancel()
    this.unsubscribe.forEach(s => s())
  }
}
