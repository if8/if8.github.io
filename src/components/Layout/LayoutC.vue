<template>
  <div class="layout-c smooth-scroll">
    <div class="header py-40 text-center">
      <h1 class="title">
        Your Stars
      </h1>
      <p>Browse your starred repositories and topics</p>
    </div>
    <router-view name="left" />
    <Pagination style="width:100%; " />
    <BackTop target=".layout-c" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
import Pagination from '@components/Pagination.vue'
export default {
  name: 'LayoutC',
  components: {
    BackTop,
    Pagination
  },
}
</script>

<style lang="scss" scoped>
.layout-c {
  height: 100%;
  .py-40 {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .text-center {
    text-align: center !important;
  }
  .header {
    background-color: #fafbfc;
    border-bottom: 1px solid #e1e4e8;
  }
}
</style>
