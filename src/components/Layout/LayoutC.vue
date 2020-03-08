<template>
  <div class="layout-c">
    <TopNav />
    <div class="is-gradient">
      <div class="header py-100 text-center">
        <h1 class="title">
          Your Stars
        </h1>
        <p>Browse your starred repositories and topics</p>
      </div>
      <div class="cloud">
        <svg
          viewBox="0 0 1600 100"
          class="separator"
        >
          <path
            d="M0 0v64c35 13 59 31 125 31 104 0 104-44 209-44s105 44 209 44 105-44 209-44 105 44 209 44 105-44 209-44 106 44 209 44 105-44 209-44h12V0z"
            class="step1"
          />
          <path
            d="M610 77c39 0 39-25 77-25s38 25 76 25 39-25 77-25 38 25 76 25 39-25 77-25 38 25 76 25 39-25 77-25 38 25 76 25 38-25 77-25 38 25 76 25 38-25 76-25 39 25 77 25c32 0 37-18 62-24V0H15v77h9c36 0 37-25 73-25s37 25 74 25 36-25 73-25 37 25 73 25 37-25 74-25 36 25 73 25 37-25 73-25 37 25 74 25"
            class="step2"
          />
          <path
            d="M0 0v69c25-12 37-32 80-32 60 0 60 40 120 40s60-40 120-40 60 40 120 40 60-40 120-40 60 40 120 40 60-40 120-40 61 40 120 40 60-40 120-40 60 40 120 40 60-40 120-40 60 40 120 40 60-40 120-40c42 0 55 20 80 32V0z"
            class="step3"
          />
        </svg>
      </div>
    </div>
    <router-view name="left" />
    <div style="height:2000px;" />
    <Pagination style="width:100%; " />
    <BackTop target=".layout-c" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
import Pagination from '@components/Pagination.vue'
import TopNav from '@components/TopNav.vue'
export default {
  name: 'LayoutC',
  components: {
    BackTop,
    Pagination,
    TopNav
  },
}
</script>
<style lang="scss">
.layout-c {
  .top-nav {
    padding: 0 24px;
    position: sticky;
    top: 0;
    background: rgba(255,255,255,0.6);
    &:before {
      content: '';
      position: absolute;
      opacity: 0.6;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      overflow: visible;
      background: linear-gradient(45deg, #0aabc7, #bb09d3);
    }
  }
}
@keyframes dividerAnimation1 {
  0% {
    transform: translate(-25%);
  }
  50% {
    transform: translate(25%);
  }
  to {
    transform: translate(-25%);
  }
}
@keyframes dividerAnimation2-data-v-e7979c66 {
  0% {
    transform: translate(18%, 5%) scaleX(1.25);
  }
  50% {
    transform: translate(-18%, 5%) scaleX(1.25);
  }
  to {
    transform: translate(18%, 5%) scaleX(1.25);
  }
}
@keyframes dividerAnimation3 {
  0% {
    transform: translate(-8%, 10%);
  }
  50% {
    transform: translate(8%, 10%);
  }
  to {
    transform: translate(-8%, 10%);
  }
}
</style>

<style lang="scss" scoped>
.layout-c {
  .is-gradient {
    overflow: hidden;
    margin-top: -3.25rem;
    background-color: transparent !important;
    background: linear-gradient(45deg, #0aabc7, #bb09d3);
  }
  .cloud {
    transform: rotate(180deg) scale(2, 1);
    margin-top: 1px;

    svg {
      overflow: visible;
      display: block;
      transform: translateY(-1px);
    }
    .step1 {
      opacity: 0.25;
      fill: #fff;
      animation: dividerAnimation3 120s cubic-bezier(0.1, 0, 0.9, 1) infinite;
    }
    .step2 {
      opacity: 0.5;
      fill: #fff;
      animation: dividerAnimation2 120s cubic-bezier(0.1, 0, 0.9, 1) infinite;
    }
    .step3 {
      opacity: 0.95;
      fill: #fff;
      animation: dividerAnimation1 120s cubic-bezier(0.1, 0, 0.9, 1) infinite;
    }
  }
  .py-100 {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .text-center {
    text-align: center !important;
  }
}
</style>
