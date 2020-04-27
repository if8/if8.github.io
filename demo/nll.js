const getPropertyValue = (node, style, view = window) =>
  view.getComputedStyle(node, null).getPropertyValue(style)

let getPoint = obj => {
  let t = obj.offsetTop
  while ((obj = obj.offsetParent)) {
    t += obj.offsetTop
  }
  return t
}

class Draggable {
  constructor(node, box) {
    this.node = node
    this.box = box
    this.node.addEventListener('mousedown', this.mousedown)
    this.args = {}
  }
  mousedown = evt => {
    document.addEventListener('mousemove', this.mousemove)
    document.addEventListener('mouseup', this.mouseup)
    const oldX = evt.pageX
    const oldY = evt.pageY
    const nodeML = parseInt(getPropertyValue(this.node, 'margin-left'), 10)
    const nodeMT = parseInt(getPropertyValue(this.node, 'margin-top'), 10)
    const nodeX = parseInt(getPropertyValue(this.node, 'left'), 10)
    const nodeY = parseInt(getPropertyValue(this.node, 'top'), 10)
    const nodeW = parseInt(getPropertyValue(this.node, 'width'), 10)
    const nodeH = parseInt(getPropertyValue(this.node, 'height'), 10)
    const boxW = parseInt(getPropertyValue(this.box, 'width'), 10) - nodeML
    const boxH = parseInt(getPropertyValue(this.box, 'height'), 10) - nodeMT
    this.args = {
      oldX,
      oldY,
      nodeML,
      nodeMT,
      nodeX,
      nodeY,
      nodeW,
      nodeH,
      boxW,
      boxH,
    }
  }
  mousemove = evt => {
    const { oldX, oldY, nodeX, nodeY, nodeW, nodeH, boxW, boxH } = this.args
    let x = evt.pageX - oldX + nodeX
    let y = evt.pageY - oldY + nodeY
    x = Math.min(Math.max(x, 0), boxW - nodeW)
    y = Math.min(Math.max(y, 0), boxH - nodeH)
    this.node.style.left = `${x}px`
    this.node.style.top = `${y}px`
  }
  mouseup = evt => {
    document.removeEventListener('mousemove', this.mousemove)
    document.removeEventListener('mouseup', this.mouseup)
  }
}
new Draggable(
  document.querySelector('.item'),
  document.querySelector('.container'),
)
