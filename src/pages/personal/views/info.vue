<template>
  <div class="personal-info">
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
    <div
      class="dropdown"
      :class="{'is-active': false}"
    >
      <div class="dropdown-trigger">
        <button
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          class="button"
        >
          <span>Dropdown button</span>
          <span class="icon is-small">
            <b-icon
              pack="fas"
              icon="user"
              size="is-small"
            />
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
  </div>
</template>

<script>
export default {
  name: 'PersonalInfo'
}
</script>

<style lang="scss" scoped>
</style>
