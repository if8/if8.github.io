<template>
  <div class="layout-c smooth-scroll">
    <div class="header py-40 text-center">
      <h1 class="title">
        Your Stars
      </h1>
      <p>Browse your starred repositories and topics</p>
    </div>
    <nav
      class="pagination is-right"
      role="navigation"
      aria-label="pagination"
    >
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li>
          <a
            class="pagination-link"
            aria-label="Goto page 1"
          >1</a>
        </li>
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a
            class="pagination-link"
            aria-label="Goto page 45"
          >45</a>
        </li>
        <li>
          <a
            class="pagination-link is-current"
            aria-label="Page 46"
            aria-current="page"
          >46</a>
        </li>
        <li>
          <a
            class="pagination-link"
            aria-label="Goto page 47"
          >47</a>
        </li>
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a
            class="pagination-link"
            aria-label="Goto page 86"
          >86</a>
        </li>
      </ul>
    </nav>
    <router-view name="left" />
    <BackTop target=".layout-c" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
export default {
  name: 'LayoutC',
  components: {
    BackTop
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
