<template>
  <div
    class="banner auto-scroll"
    functional
  >
    <div class="inner">
      <div class="img-wrapper">
        <div class="img">
          SDK九分裤
        </div>
      </div>
      <div class="img-wrapper">
        <div class="img">
          而我我哦if收到佛i
        </div>
      </div>
      <div class="img-wrapper">
        <div class="img">
          任务群殴我我IE破熊
        </div>
      </div>
      <div class="img-wrapper">
        <div class="img">
          破五千年的思路打开
        </div>
      </div>
      <div class="img-wrapper">
        <div class="img">
          圣诞节分裂盘丝洞
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutoScroll'
}
</script>
<style lang="scss">
@keyframes aaa {
  0% {
    transform: translateX(0px);
  }
  5% {
    transform: translateX(-640px);
  }
  25% {
    transform: translateX(-640px);
  }
  30% {
    transform: translateX(-1280px);
  }
  50% {
    transform: translateX(-1280px);
  }
  55% {
    transform: translateX(-1920px);
  }
  75% {
    transform: translateX(-1920px);
  }
  80% {
    transform: translateX(-2560px);
  }
  100% {
    transform: translateX(-2560px);
  }
}
</style>

<style lang="scss" scoped>
.auto-scroll {
  width: 640px;
  height: 300px;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid #f0f0f0;
  .img-wrapper {
    float: left;
    width: 640px;
  }
  .inner {
    width: 9999px;
    position: relative;
    animation: aaa 16s infinite 2s running;
    &:hover {
      animation-play-state: paused;
      cursor: pointer;
    }
  }
  .img {
    width: 640px;
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
}
</style>
