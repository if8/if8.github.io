<template>
  <div class="layout-a">
    <div class="aside"></div>
    <div class="main">
      <div class="header"></div>
      <router-view />
    </div>
    <BackTop target=".layout-a" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
export default {
  name: 'LayoutA',
  components: {
    BackTop
  },
}
</script>

<style lang="scss" scoped>
$nav-height: 70px !default;
$aside-width: 300px !default;
$vertical-margin: 0px !default;
$horizon-margin: 0px !default;

.layout-a {
  position: relative;
  overflow: auto;
  height: 100%;
  .header {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.075);
    background-color: rgb(255, 255, 255);
    height: $nav-height;
    position: sticky;
    top: 0px;
  }
  .aside {
    position: fixed;
    width: $aside-width;
    left: calc(#{$horizon-margin} / 2);
    top: calc(#{$nav-height} + #{$vertical-margin} / 2);
    bottom: calc(#{$vertical-margin} / 2);
    overflow: auto;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 0;
      border-right: 1px solid rgba(0, 0, 0, 0.075);
    }
  }
  .main {
    padding-left: calc(#{$horizon-margin} + #{$aside-width});
  }
}
</style>
