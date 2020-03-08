<template>
  <div class="home-index">
    <div class="test">
      home-index
    </div>
    <router-view />
    <div class="b">
      是的弗兰克
    </div>
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
