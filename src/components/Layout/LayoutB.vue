<template>
  <div class="layout-b">
    <TopNav />
    <div class="main">
      <div class="main-left">
        <router-view name="left" />
      </div>
      <div class="split" />
      <div class="main-right smooth-scroll">
        <div style="height: 3000px;" />
      </div>
    </div>
    <BackTop target=".layout-b .main-right" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
import TopNav from '@components/TopNav.vue'
export default {
  name: 'LayoutB',
  components: {
    BackTop,
    TopNav
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-b {
  height: 100%;
  .main {
    padding-top: 60px;
    margin-top: -60px;
    height: 100%;
    display: flex;
    .main-left,
    .main-right {
      flex: 1 1 0%;
    }
    .split {
      width: 2px;
      background: #f0f0f0;
    }
  }
}
</style>

<style lang="scss">
.layout-b {
  .top-nav {
    position: sticky;
    box-shadow: 0 2px 0 0 #f5f5f5;
  }
}
</style>
