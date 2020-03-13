export class AsyncQueue {
  constructor(...values) {
    this.count = 0
    this.promise = new Promise(resolve => {
      this.resolve = resolve
    })

    values.forEach(v => this.put(v))
  }

  put(value) {
    let resolveNext = null
    const nextPromise = new Promise(resolve => {
      resolveNext = resolve
    })

    this.resolve({
      value: Promise.resolve(value),
      nextPromise,
    })

    this.resolve = resolveNext
    this.count = this.count + 1
  }

  get() {
    const resultingPromise = this.promise.then(({ value }) => value)
    const actualPromise = this.promise

    // 推迟下一个节点的解析，直到解决了当前的问题(value 可能是个Promise)
    this.promise = resultingPromise
      .then(() => actualPromise)
      .then(({ nextPromise }) => nextPromise)
    this.count = this.count - 1

    return resultingPromise
  }
}
