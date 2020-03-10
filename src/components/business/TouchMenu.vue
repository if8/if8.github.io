<template>
  <nav class="touch-menu">
    <div class="area" />

    <b-icon
      class="menu-open-button"
      pack="fas"
      icon="apple-alt"
      size="is-medium"
      @click="clickedMenu"
    />

    <b-icon
      v-for="icon in menuItemList"
      :key="icon"
      class="menu-item"
      pack="fas"
      :icon="icon"
      size="is-medium"
      @click="clickedMenu"
    />
  </nav>
</template>

<script>
export default {
  name: 'TouchMenu',
  data () {
    return {
      menuItemList: [
        'print',
        'envelope-open-text',
        'address-book',
        'calendar-plus',
        'balance-scale',
        'chart-pie',
        'anchor',
        'air-freshener'
      ]
    }
  },
  methods: {
    clickedMenu () {
      console.log(Date.now())
    }
  }
}
</script>

<style lang="scss" scoped>
$distance: 105px;

.touch-menu {
  position: absolute;
  z-index: 1;
  width: 66px;
  height: 66px;
  .area {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .menu-item,
  .menu-open-button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: #e91e63;
    border-radius: 100%;
    position: absolute;
    color: white;
    text-align: center;
    line-height: 66px;
  }

  .menu-item:hover, .menu-open-button:hover {
    opacity: 0.6;
    transition-duration: 300ms;
    transition-property: opacity;
    transition-timing-function: ease-in-out;
  }

  .menu-open-button {
    z-index: 2;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 400ms;
    transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  }

  &:hover .area,
  .area:hover {
    min-width: calc(100px * 2 + 66px);
    min-height: calc(100px * 2 + 66px);

    ~ .menu-open-button {
      transform: scale(0.9, 0.9) translate3d(0, 0, 0);
    }

    ~ .menu-item {
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
    }
    ~ .menu-item:nth-child(3) {
      transition-duration: 180ms;
      transform: translate3d(calc(100px * 0.707), calc(-100px * 0.707), 0);
    }
    ~ .menu-item:nth-child(4) {
      transition-duration: 280ms;
      transform: translate3d(100px, 0, 0);
    }
    ~ .menu-item:nth-child(5) {
      transition-duration: 380ms;
      transform: translate3d(calc(100px * 0.707), calc(100px * 0.707), 0);
    }
    ~ .menu-item:nth-child(6) {
      transition-duration: 480ms;
      transform: translate3d(0, 100px, 0);
    }
    ~ .menu-item:nth-child(7) {
      transition-duration: 580ms;
      transform: translate3d(calc(-100px * 0.707), calc(100px * 0.707), 0);
    }
    ~ .menu-item:nth-child(8) {
      transition-duration: 680ms;
      transform: translate3d(-100px, 0, 0);
    }
    ~ .menu-item:nth-child(9) {
      transition-duration: 780ms;
      transform: translate3d(calc(-100px * 0.707), calc(-100px * 0.707), 0);
    }
    ~ .menu-item:nth-child(10) {
      transition-duration: 880ms;
      transform: translate3d(0, -100px, 0);
    }
  }
}
</style>
