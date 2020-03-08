<template>
  <div class="layout-empty smooth-scroll">
    <router-view />
    <BackTop target=".layout-empty" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'

export default {
  name: 'LayoutEmpty',
  components: {
    BackTop
  },
}
</script>

<style lang="scss" scoped>
.layout-empty {
  height: 100%;
}
</style>
