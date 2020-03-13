<template>
  <div class="layout-c">
    <TopNav :class="{ 'has-scroll': hasScroll }" />
    <div class="is-gradient">
      <div class="header py-100 text-center">
        <h1 class="title">
          Y our Stars
        </h1>
        <p>Browse your starred repositories and topics</p>
      </div>
      <div class="cloud">
        <svg viewBox="0 0 1600 100" class="separator">
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
    <router-view />
    <div class="footer-svg" />
    <BackTop @scroll="switchHeaderClass" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
import TopNav from '@components/TopNav.vue'
export default {
  name: 'LayoutC',
  components: {
    BackTop,
    TopNav,
  },
  data() {
    return {
      hasScroll: false,
    }
  },
  methods: {
    switchHeaderClass(scrollTop) {
      this.hasScroll = scrollTop > 0
    },
  },
}
</script>
<style lang="scss">
.layout-c {
  .top-nav {
    padding: 0 24px;
    position: sticky;
    top: 0;
    background: none;
    backdrop-filter: blur(8px);

    &:before {
      content: '';
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
      overflow: visible;
      background: linear-gradient(45deg, hsl(201, 56, 65), hsl(291, 78, 57.5));
      transition-duration: 0.25s;
      transition-property: opacity;
      transition-timing-function: ease-in-out;
    }

    &.has-scroll:before {
      content: '';
      opacity: 0.7;
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
@keyframes dividerAnimation2 {
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

.footer-svg {
  position: relative;
  min-height: 30vw;
  background-color: rgb(118, 218, 255);
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    left: 50%;
    position: absolute;
    min-width: 400vw;
    min-height: 400vw;
    background-color: #fff;
    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &:before {
    bottom: 12vw;
    border-radius: 45% 46% 45.5% 46%;
    animation-name: rotate;
  }

  &:after {
    bottom: 5vw;
    opacity: 0.5;
    border-radius: 47% 47.5% 48% 47.5%;
    animation-name: rotate2;
    transform: rotateZ(45deg) scale(0.96);
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}
@keyframes rotate2 {
  0% {
    transform: translate(-50%, 0) rotateZ(45deg) scale(0.96);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(225deg) scale(0.96);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(405deg) scale(0.96);
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
      opacity: 0.96;
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
