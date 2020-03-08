<template>
  <div class="layout-b">
    <div class="main-left">
      <router-view name="left" />
    </div>
    <div class="split" />
    <div class="main-right smooth-scroll">
      <div style="height: 3000px;" />
    </div>
    <BackTop target=".layout-b .main-right" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
export default {
  name: 'LayoutB',
  components: {
    BackTop
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-b {
  display: flex;
  height: 100%;
  .main-left,
  .main-right {
    flex: 1 1 0%;
  }
  .split {
    width: 2px;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>
