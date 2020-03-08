<template>
  <transition name="fade-in">
    <div
      v-if="visible"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="back-top"
      @click.stop="handleClick"
    >
      <slot>
        <v-icon name="arrow-up" />
      </slot>
    </div>
  </transition>
</template>

<script>
import { throttle } from '@libs/min-throttle.js';
import { addCaptureScroll } from '@libs/scroll-listener'
import { inOutCubic } from '@libs/easing'

export default {
  name: 'BackTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String,
      default: ''
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
      el: null,
      container: null,
      visible: false
    };
  },
  computed: {
    styleBottom () {
      return `${this.bottom}px`;
    },
    styleRight () {
      return `${this.right}px`;
    }
  },
  mounted () {
    this.init();
    this.throttledScrollHandler = throttle(this.onScroll, 300);
    this.removeCaptureScroll = addCaptureScroll(this.throttledScrollHandler);
  },
  beforeDestroy () {
    this.removeCaptureScroll && this.removeCaptureScroll()
  },
  methods: {
    init () {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll (event) {
      if (this.container === event.target) {
        const scrollTop = this.el.scrollTop;
        this.visible = scrollTop >= this.visibilityHeight;
      }
    },
    handleClick (e) {
      this.scrollToTop();
      this.$emit('click', e);
    },
    scrollToTop () {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF = window.requestAnimationFrame;
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - inOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    }
  }
};
</script>
<style lang="scss" scoped>
.back-top {
  position: fixed;
  background-color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;

  &:hover {
    background-color: #f2f6fc;
  }
}
</style>
