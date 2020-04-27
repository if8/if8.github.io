1.	js实现深度复制
2.	请用js实现将一个二维数组转换成树结构
例如：将下面数据
[
    ["a", "aa", "aaa", "aaaa"],
    ["b", "bb", "bbb"],
    ["a", "ab", "aba"],
    ["a", "aa", "aab"]
] 

转为：
[
    {
        "name" : "a",
        "child" : [
            {
                "name" : "aa",
                "child" : [
                    {
                        "name" : "aaa",
                        "child" : [
                            {
                                "name" : "aaaa",
                                "child" : []
                            }
                        ]
                    },
                    {
                        "name" : "aab",
                        "child" : []
                    }
                ]

            },
            {
                "name" : "ab",
                "child" : [
                    {
                        "name": "aba",
                        "child" : []
                    }
                ]

            }
        ]
    },
    {
        "name": "b",
        "child" : [
            {
                "name" : "bb",
                "child" : [
                    {
                        "name" : "bbb",
                        "child" : []
                    }
                ]
            }
        ]
    }

]


function toTree (arr) {
  let result = []
  let map = {}
  let len = arr.length

  for (let i = 0; i < len; i++) {
    let innerArr = arr[i]
    let rootName = innerArr[0]
    if (!map[rootName]) {
      map[rootName] = {name: rootName, child: []}
      result.push(map[rootName])
    }
  }

  for (let i = 0; i < len; i++) {
    let innerArr = arr[i]
    for (let j = 0; j < innerArr.length; j++) {
      let item = innerArr[j]
      if (j !== 0 ) {
        map[item.slice(-1)].child.push({name: item, child: []})
      }
    }
  }
  return result
}

toTree([
  ["a", "aa", "aaa", "aaaa"],
  ["b", "bb", "bbb"],
  ["a", "ab", "aba"],
  ["a", "aa", "aab"]
] )
