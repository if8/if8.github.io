<template>
  <div class="home-index">
    <div class="test">home-indexee</div>
    <router-view></router-view>
    <div class="b">dfsdkjlle</div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style lang="scss" scoped>
@import "@styles/var.scss";
.home-index {
  .test {
    color: $black;
  }
}
</style>
