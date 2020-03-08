<template>
  <div class="app">
    <!-- <AutoScroll /> -->
    <component
      :is="layout"
    />
  </div>
</template>

<script>
import AutoScroll from '../demo/AutoScroll.vue'
export default {
  name: `main`,
  components: {
    AutoScroll
  },
  computed: {
    layout () {
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
}
</script>

<style lang="scss">
html,
body,
.app {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.app {
}
</style>
