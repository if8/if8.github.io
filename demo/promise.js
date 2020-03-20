let microQueue = Promise.resolve()

class minPromise {
  constructor(executor) {
    this._value = null
    this._status = minPromise.PENDING
    this.resolveQueue = []
    this.rejectQueue = []

    let _resolve = val => {
      const run = () => {
        if (this._status !== minPromise.PENDING) return

        this._status = minPromise.FULFILLED
        this._value = val

        while (this.resolveQueue.length) {
          let fun = this.resolveQueue.shift()
          fun(val)
        }
      }
      microQueue.then(run)
    }
    let _reject = err => {
      const run = () => {
        if (this._status !== minPromise.PENDING) return

        this._status = minPromise.REJECTED
        this._value = err

        while (this.rejectQueue.length) {
          let fun = this.rejectQueue.shift()
          fun(err)
        }
      }
      microQueue.then(run)
    }
    executor(_resolve, _reject)
  }
  then(resolveCallback, rejectCallback) {
    return new minPromise(function(res, rej) {
      if (typeof resolveCallback !== 'function') {
        resolveCallback = v => v
      }

      let wrapResolveCallback = val => {
        try {
          let x = resolveCallback(val)
          x instanceof minPromise ? x.then(res, rej) : res(x)
        } catch (error) {
          rej(error)
        }
      }

      if (typeof rejectCallback !== 'function') {
        rejectCallback = v => v
      }

      let wrapRejectCallback = err => {
        try {
          let x = rejectCallback(err)
          x instanceof minPromise ? x.then(res, rej) : res(x)
        } catch (error) {
          rej(error)
        }
      }

      if (this._status === minPromise.PENDING) {
        this.resolveQueue.push(wrapResolveCallback)
        this.rejectQueue.push(wrapRejectCallback)
      }

      if (this._status === minPromise.FULFILLED) {
        wrapResolveCallback(this._value)
      }

      if (this._status === minPromise.REJECTED) {
        wrapRejectCallback(this._value)
      }
    })
  }
  catch(rejectCallback) {
    return this.then(null, rejectCallback)
  }
  finally(callback) {
    return this.then(
      val => {
        return minPromise.resolve(callback()).then(() => val)
      },
      err => {
        return minPromise.resolve(callback()).then(() => err)
      },
    )
  }
}

minPromise.PENDING = 'pending'
minPromise.FULFILLED = 'fulfilled'
minPromise.REJECTED = 'rejected'
minPromise.resolve = function(val) {
  return new minPromise(function(res) {
    res(val)
  })
}
minPromise.reject = function(err) {
  return new minPromise(function(res, rej) {
    rej(err)
  })
}
