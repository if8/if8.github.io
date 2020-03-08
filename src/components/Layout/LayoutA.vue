<template>
  <div class="layout-a smooth-scroll">
    <div class="aside smooth-scroll">
      <PersonCard />
      <SidePanel />
    </div>
    <div class="main">
      <router-view />
      <MessageBox />
    </div>
    <BackTop target=".layout-a" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
import PersonCard from '@components/PersonCard.vue'
import SidePanel from '@components/SidePanel.vue'
import MessageBox from '@components/MessageBox.vue'

export default {
  name: 'LayoutA',
  components: {
    BackTop,
    SidePanel,
    MessageBox,
    PersonCard
  },
}
</script>

<style lang="scss" scoped>
$nav-height: 0px !default;
$aside-width: 300px !default;
$vertical-margin: 0px !default;
$horizon-margin: 0px !default;

.layout-a {
  position: relative;
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
