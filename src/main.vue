<template>
  <component :is="layout" class="app">
    <router-view />
    <BackTop />
  </component>
</template>

<script>
import BackTop from '@components/BackTop.vue'
export default {
  name: `main`,
  components: {
    BackTop
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
      return 'div'
    }
  },
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.app {
  height: 2000px;
}
</style>
