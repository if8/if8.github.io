/*
[{
id: '',
pid: '',
value: '',
chilren: []
}]
*/

/*
setting : {
idKey: 'id'
pIdKey: 'pid',
childrenKey： 'chilren'
}

*/

function transer(tree) {
  var result = []
  transerDigui(tree, result)
  return result
}

function transerDigui(tree, acc = []) {
  for (let i = 0; i < tree.length; i++) {
    let item = tree[i]
    acc.push({ id: item.id, pid: item.pid, value: item.value })
    transerDigui(item.chilren, acc)
  }
  return acc
}

function transferReverse(
  sNodes,
  setting = { idKey: 'id', pIdKey: 'pid', childrenKey: 'chilren' },
) {
  var i,
    l,
    key = setting.idKey,
    parentKey = setting.pIdKey,
    childKey = setting.childrenKey

  if (!key || key == '' || !sNodes) {
    return []
  }

  if (!Array.isArray(sNodes)) {
    return [sNodes]
  }

  var r = []
  var tmpMap = {}

  for (i = 0, l = sNodes.length; i < l; i++) {
    tmpMap[sNodes[i][key]] = sNodes[i]
  }

  for (i = 0, l = sNodes.length; i < l; i++) {
    if (
      tmpMap[sNodes[i][parentKey]] &&
      sNodes[i][key] != sNodes[i][parentKey]
    ) {
      if (!tmpMap[sNodes[i][parentKey]][childKey]) {
        tmpMap[sNodes[i][parentKey]][childKey] = []
      }
      tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i])
    } else {
      r.push(sNodes[i])
    }
  }

  return r
}

let test = [
  { id: 1, pid: 0, value: 2, children: [] },
  { id: 2, pid: 1, value: 3, children: [] },
  { id: 3, pid: 1, value: 4, children: [] },
  { id: 5, pid: -1, value: 3, children: [] },
]
transferReverse(test)
