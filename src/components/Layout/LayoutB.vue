<template>
  <div class="layout-b">
    <div class="main-left">
      <router-view name="left" />
    </div>
    <div class="main-right">
      <div class="test"></div>
      <router-view />
    </div>
    <BackTop target=".layout-b .main-right" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
export default {
  name: 'layout-b',
  components: {
    BackTop
  },
}
</script>

<style lang="scss" scoped>
.layout-b {
  display: flex;
  height: 100%;
  .main-left,
  .main-right {
    flex: 1 1 0%;
    overflow: auto;
  }
  .test {
    height: 3000px;
  }
}
</style>
