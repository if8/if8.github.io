<template>
  <component :is="NotFound" class="route-dynamic"></component>
</template>

<script>
import NotFound from '@components/NotFound.vue'

export default {
  name: 'RouteDynamic',
  data() {
    return {
      NotFound,
    }
  },
}
</script>
<style lang="scss" scoped>
.route-dynamic {
  height: 2000px;
}
</style>
