const cache: { [key: string]: { data: any; timer: any } } = {}

export const setCache = (key: string, data: any) => {
  if (cache[key]) {
    clearTimeout(cache[key].timer)
  }

  // 数据在不活跃 5min 后，删除掉
  const timer = setTimeout(() => {
    delete cache[key]
  }, 5 * 60 * 1000)

  cache[key] = {
    data,
    timer,
  }
}

export const getCache = (key: string) => cache[key] && cache[key].data
