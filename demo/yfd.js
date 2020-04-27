[
  [40, 50],
  [1, 10],
  [9, 20],
  [5, 8],
  [70, 80],
  [60, 100]
]


[
  [1, 20],
  [40, 50],
  [60, 100],
]


var x = {}
var y = {a: 2}
Object.setPrototypeOf(x, y)

// x.a = x.a + 1
console.log(x.a++)
console.log(x.a)
console.log(y.a)

CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染。
JS 阻塞 DOM 解析，但浏览器会"偷看"DOM，预先下载相关资源。
浏览器遇到 <script>且没有defer或async属性的标签时，会触发页面渲染，
因而如果前面CSS资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。
