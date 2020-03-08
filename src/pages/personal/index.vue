<template>
  <div class="person-index">
    <div class="test">
      person-index
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style lang="scss" scoped>
@import "@styles/var.scss";
.person-index {
  .test {
    color: $black;
  }
}
</style>
