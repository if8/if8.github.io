export class AsyncQueue {
  constructor (...values) {
    this.promise = new Promise(resolve => {
      this.resolve = resolve
    })

    values.forEach(v => this.put(v))
    this.count = values.length
  }

  put (value) {
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

  get () {
    this.count = this.count - 1

    const resultingPromise = this.promise.then(({ value }) => value)
    const actualPromise = this.promise

    this.promise = resultingPromise.then(() => actualPromise).then(({ nextPromise }) => nextPromise)

    return resultingPromise
  }
}
