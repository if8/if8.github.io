<template>
  <transition name="fade-in">
    <div
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      @click.stop="handleClick"
      class="back-top"
      v-if="visible"
    >
      <slot>
        <v-icon name="camera"/>
      </slot>
    </div>
  </transition>
</template>

<script>
import { throttle } from '@lib/min-throttle.js';
import { addCaptureScroll } from '@lib/scroll-listener'
const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;

export default {
  name: 'BackTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
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
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    }
  },
  beforeDestroy () {
    this.removeCaptureScroll && this.removeCaptureScroll()
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
