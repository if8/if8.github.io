<template>
  <div class="layout-a">
    <div class="aside">
      <SidePanel />
    </div>
    <div class="main">
      <nav
        aria-label="breadcrumbs"
        class="header breadcrumb"
      >
        <ul>
          <li>
            <a href="#">Bulma</a>
          </li>
          <li>
            <a href="#">Documentation</a>
          </li>
          <li>
            <a href="#">Components</a>
          </li>
          <li class="is-active">
            <a
              aria-current="page"
              href="#"
            >Breadcrumb</a>
          </li>
        </ul>
      </nav>

      <v-popover
        :auto-hide="false"
        open-group="group1"
      >
        <button class="button">
          <span class="icon is-small">
            <v-icon name="camera" />
          </span>
        </button>
        <div slot="popover">
          立刻接受了定金付老师看见的分离技术多了几分
        </div>
      </v-popover>

      <div class="dropdown is-active">
        <div class="dropdown-trigger">
          <button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            class="button"
          >
            <span>Dropdown button</span>
            <span class="icon is-small">
              <v-icon name="camera" />
            </span>
          </button>
        </div>
        <div
          id="dropdown-menu"
          class="dropdown-menu"
          role="menu"
        >
          <div class="dropdown-content">
            <a
              class="dropdown-item"
              href="#"
            >Dropdown item</a>
            <a class="dropdown-item">Other dropdown item</a>
            <a
              class="dropdown-item is-active"
              href="#"
            >Active dropdown item</a>
            <a
              class="dropdown-item"
              href="#"
            >Other dropdown item</a>
            <hr class="dropdown-divider">
            <a
              class="dropdown-item"
              href="#"
            >With a divider</a>
          </div>
        </div>
      </div>

      <MessageBox />

      <div class="why">
        sdkj
      </div>
      <router-view />
    </div>
    <BackTop target=".layout-a" />
  </div>
</template>

<script>
import BackTop from '@components/BackTop.vue'
import SidePanel from '@components/SidePanel.vue'
import MessageBox from '@components/MessageBox.vue'

export default {
  name: 'LayoutA',
  components: {
    BackTop,
    SidePanel,
    MessageBox
  },
}
</script>

<style lang="scss" scoped>
$nav-height: 0px !default;
$aside-width: 300px !default;
$vertical-margin: 0px !default;
$horizon-margin: 0px !default;

.layout-a {
  position: relative;
  overflow: auto;
  height: 100%;
  .header {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.075);
    background-color: rgb(255, 255, 255);
    height: $nav-height;
    position: sticky;
    top: 0px;
  }
  .aside {
    position: fixed;
    width: $aside-width;
    left: calc(#{$horizon-margin} / 2);
    top: calc(#{$nav-height} + #{$vertical-margin} / 2);
    bottom: calc(#{$vertical-margin} / 2);
    overflow: auto;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 0;
      border-right: 1px solid rgba(0, 0, 0, 0.075);
    }
  }
  .main {
    padding-left: calc(#{$horizon-margin} + #{$aside-width});
  }
}
</style>
