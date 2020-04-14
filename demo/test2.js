class Test {
  constructor (itemSelector, containSeletor) {
    this.itemDom = document.querySelector(itemSelector)
    this.containerDom = document.querySelector(containSeletor)
    this.parentRect = this.containerDom.getBoundingClientRect()
    this.itemRect = this.itemDom.getBoundingClientRect()
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.startPosition = {
      x: 0,
      y: 0
    }
    this.endPosition = {
      x: 0,
      y: 0
    }
    this.isDrag = false
    this.containerDom.addEventListener('mousedown', this.mouseDown)
    this.containerDom.addEventListener('mouseup', this.mouseUp)
    this.containerDom.addEventListener('mousemove', this.mouseMove)
  }
  mouseDown (e) {
    this.isDrag = true
    this.startPosition = {
      x: e.clientX,
      y: e.clientY
    }
  }
  mouseUp (e) {
    this.isDrag = false
  }
  mouseMove(e) {
    if(!this.isDrag) return
    this.endPosition = {
      x: e.clientX,
      y: e.clientY
    }
    var deltaX = this.endPosition.x - this.startPosition.x
    var deltaY = this.endPosition.y- this.startPosition.y
    this.itemDom.style.transform = `translate(${deltaX}px, ${deltaY}px);`
  }
}
