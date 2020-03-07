<template>
  <div class="home-index">
    <div class="test">home-index</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style lang="scss" scoped>
.home-index {
  .test {
    color: red;
  }
}
</style>
