<script>
export default {
  name: 'ScrollActive',

  props: {
    activeClass: {
      type: String,
      default: 'current',
    },
    offset: {
      type: Number,
      default: 20,
    },
    scrollOffset: {
      type: Number,
      default: null,
    },
    scrollContainerSelector: {
      type: String,
      default: '',
    },
    clickToScroll: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
    alwaysTrack: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
    highlightFirstItem: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },

  data () {
    return {
      prevScrollTop: 0,
      items: [],
      observer: null,
      skipTrack: false,
      currentItem: null,
      lastActiveItem: null,
      scrollAnimationFrame: null,
    }
  },

  computed: {
    scrollContainer () {
      return (this.scrollContainerSelector
        ? document.querySelector(this.scrollContainerSelector)
        : this.$el) || window
    },
  },

  mounted () {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver

    if (!this.observer && MutationObserver) {
      this.observer = new MutationObserver(this.initActiveItems)
      this.observer.observe(this.$el, {
        childList: true,
        subtree: true,
      })
    }

    this.initActiveItems()
    this.removeActiveClass()
    this.currentItem = this.getItemInsideWindow()

    if (this.currentItem) {
      this.currentItem.classList.add(this.activeClass)
    }

    this.scrollContainer.addEventListener('scroll', this.onScroll)
  },

  updated () {
    this.initActiveItems()
  },

  beforeDestroy () {
    this.scrollContainer.removeEventListener('scroll', this.onScroll)
    window.cancelAnimationFrame(this.scrollAnimationFrame)
  },

  methods: {
    onScroll (event) {
      const scrollTop = event.target.scrollTop
      const scrollDir = scrollTop - this.prevScrollTop > 0 ? 'down' : 'up'
      this.$emit('scrollChanged', scrollTop, scrollDir)
      this.prevScrollTop = scrollTop

      if (this.skipTrack) return

      this.currentItem = this.getItemInsideWindow()

      if (this.currentItem !== this.lastActiveItem) {
        this.removeActiveClass()
        this.$emit('activeChanged', event, this.currentItem, this.lastActiveItem)
        if (this.lastActiveItem) {
          this.currentItem.parentElement.scrollBy(0, (scrollDir === 'down' ? 1 : -1) * this.lastActiveItem.scrollHeight)
        }
        this.lastActiveItem = this.currentItem
      }

      if (this.currentItem) {
        this.currentItem.classList.add(this.activeClass)
      }
    },

    getItemInsideWindow () {
      let currentItem

      this.items.forEach(item => {
        const isFirstItem = (item === this.items[0])
        const target = document.getElementById(item.dataset.hash)

        if (!target) return

        const distanceFromTop = this.scrollContainer.scrollTop || window.pageYOffset
        const targetDistanceFromTop = this.getOffsetTop(target)

        const isScreenPastSection = distanceFromTop >= targetDistanceFromTop - this.offset
        const isScreenBeforeSectionEnd = distanceFromTop < targetDistanceFromTop - this.offset + target.offsetHeight

        if (isFirstItem && this.highlightFirstItem && isScreenBeforeSectionEnd) {
          currentItem = item
        }

        if (isScreenPastSection && (!this.exact || isScreenBeforeSectionEnd)) {
          currentItem = item
        }
      })

      return currentItem
    },

    initActiveItems () {
      this.items = [].slice.call(this.$el.querySelectorAll('.scroll-active-item'))

      this.items.forEach(item => {
        item[this.clickToScroll ? 'addEventListener' : 'removeEventListener']('click', this.handleClick)
      })
    },

    handleClick (event) {
      event.preventDefault()

      const hash = event.currentTarget.dataset.hash
      const target = document.getElementById(hash)

      if (!target) {
        return console.warn(`[vue-scroll-active] Element '${hash}' was not found. Make sure it is set in the DOM.`)
      }

      if (!this.alwaysTrack) {
        this.skipTrack = true
        this.removeActiveClass()
        event.currentTarget.classList.add(this.activeClass)
      }

      this.scrollTo(target).then(_ => {
        if (!this.alwaysTrack) {
          this.skipTrack = false
          this.currentItem = this.items.find(item => item.dataset.hash === target.id)

          if (this.currentItem !== this.lastActiveItem) {
            this.$emit('activeChanged', null, this.currentItem, this.lastActiveItem)
            this.lastActiveItem = this.currentItem
          }
        }
      })
    },

    scrollTo (target) {
      window.cancelAnimationFrame(this.scrollAnimationFrame)
      return new Promise((resolve) => {
        const targetDistanceFromTop = this.getOffsetTop(target)
        const startingY = this.scrollContainer.scrollTop || window.pageYOffset
        const difference = targetDistanceFromTop - startingY
        const easing = function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
        let start = null

        const step = (timestamp) => {
          if (!start) start = timestamp

          let delta = timestamp - start
          let progressPercentage = delta / this.duration

          if (delta >= this.duration) {
            delta = this.duration
            progressPercentage = 1
          }

          const offset = this.scrollOffset || this.offset
          const perTick = startingY + easing(progressPercentage) * (difference - offset)

          this.scrollContainer.scrollTo(0, perTick)

          if (delta < this.duration) {
            this.scrollAnimationFrame = window.requestAnimationFrame(step)
          } else {
            resolve()
          }
        }

        window.requestAnimationFrame(step)
      })
    },

    getOffsetTop (element) {
      let yPosition = 0
      let nextElement = element
      let scrollContainerOffsetParent = this.scrollContainer.offsetParent

      while (nextElement && nextElement !== scrollContainerOffsetParent) {
        yPosition += nextElement.offsetTop
        nextElement = nextElement.offsetParent
      }

      if (this.scrollContainer.offsetTop) {
        yPosition -= this.scrollContainer.offsetTop
      }

      return yPosition
    },

    removeActiveClass () {
      this.items.forEach(item => {
        item.classList.remove(this.activeClass)
      })
    },
  },

  render (h) {
    var _this = this
    var vnodeList = []
    var items = this.$slots.default.filter(function (vnode) {
      return vnode.data && vnode.data.attrs && vnode.data.attrs.indicator
    })

    items.forEach(function (item, index) {
      var title = item.data.attrs.indicator
      var descSlot = item.data.attrs.descSlot
      var content = descSlot ? _this.$slots[descSlot] : item.data.attrs.desc

      vnodeList.push(
        h('div', { class: 'scroll-active-item', attrs: { 'data-hash': item.data.attrs.id } }, [
          h('span', { class: 'scroll-active-item__title' }, title),
          h('span', { class: 'scroll-active-item__desc' }, content)
        ])
      )
    })

    return h(this.tag, {
      class: 'scroll-active'
    }, [
      h('div', { class: 'scroll-active-nav' }, [
        h('div', { class: 'side-header' }, [
          this.$slots['side-header']
        ]),
        h('div', { class: 'side-main' }, vnodeList),
        h('div', { class: 'side-footer' }, [
          this.$slots['side-footer']
        ])
      ]),
      h('div', { class: 'scroll-active-main' }, [
        this.$slots.default
      ])
    ])
  }
}
</script>
