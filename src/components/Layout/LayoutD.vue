<template>
  <div class="layout-d">
    <b-carousel :indicator-inside="false">
      <b-carousel-item v-for="(item, i) in 6" :key="i">
        <span class="image">
          <img :src="getImgUrl(i)" />
        </span>
      </b-carousel-item>
      <template slot="indicators" slot-scope="props">
        <span class="al image">
          <img :src="getImgUrl(props.i)" :title="props.i" />
        </span>
      </template>
    </b-carousel>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'LayoutD',
  methods: {
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`
    }
  }
}
</script>

<style lang="scss">
.is-active .al img {
  filter: grayscale(0%);
}
.al img {
  filter: grayscale(100%);
}
</style>
