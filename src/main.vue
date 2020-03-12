<template>
  <div class="app">
    <!-- <AutoScroll /> -->
    <div @mouseup.capture="onMouseUp">
      <TouchMenu
        :style="
          `transform: translate3d(${menuPosition.x}px, ${menuPosition.y}px, 0px);`
        "
        @mousedown.native="onMouseDown"
      />
    </div>

    <component :is="layout" />
  </div>
</template>

<script>
import AutoScroll from '../demo/AutoScroll.vue'
import TouchMenu from '@components/business/TouchMenu.vue'
import { useMousePosition } from '@hooks/mouse-position.js'
import { ref, reactive, watch } from '@vue/composition-api'

export default {
  name: `main`,
  components: {
    AutoScroll,
    TouchMenu
  },
  setup() {
    let isMouseDown = ref(false)
    let isDrag = ref(false)

    let menuPosition = reactive({ x: 240, y: 240 })

    let onMouseDown = () => {
      isMouseDown.value = true
    }
    let onMouseUp = e => {
      if (isDrag.value) {
        e.preventDefault()
      }
      isDrag.value = false
      isMouseDown.value = false
    }

    let { x, y } = useMousePosition()

    watch([x, y], ([x, y]) => {
      if (isMouseDown.value) {
        isDrag.value = true
        menuPosition.x = x - 40
        menuPosition.y = y - 40
      }
    })

    return {
      x,
      y,
      menuPosition,
      onMouseDown,
      onMouseUp
    }
  },
  data() {
    return {}
  },
  computed: {
    layout() {
      var matchList = this.$route.matched
      if (!matchList.length) {
        return `div`
      }
      for (var l = matchList.length; l > 0; l--) {
        var meta = matchList[l - 1].meta
        if (meta && meta.layout) {
          return meta.layout
        }
      }
      return 'layout-c'
    }
  },
  methods: {}
}
</script>

<style lang="scss">
html,
body,
.app {
  overflow-y: initial;
  height: 100%;
}
</style>
<style lang="scss"></style>
