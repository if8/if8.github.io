<template>
  <nav class="side-panel">
    <p class="panel-heading">
      Repositories
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          class="input"
          placeholder="Search"
          type="text"
        >
        <span class="icon is-left">
          <v-icon name="camera" />
        </span>
      </p>
    </div>
    <p class="panel-tabs">
      <a class="is-active">All</a>
      <a>Public</a>
      <a>Private</a>
      <a>Sources</a>
      <a>Forks</a>
    </p>
    <a class="panel-block is-active">
      <span class="panel-icon">
        <v-icon name="camera" />
      </span>
      bulma
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <v-icon name="camera" />
      </span>
      marksheet
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <v-icon name="camera" />
      </span>
      minireset.css
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <v-icon name="camera" />
      </span>
      jgthms.github.io
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <v-icon name="camera" />
      </span>
      daniellowtw/infboard
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <v-icon name="camera" />
      </span>
      mojs
    </a>
    <label class="panel-block">
      <input type="checkbox">
      remember me
    </label>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">
        Reset all filters
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SidePanel'
}
</script>

<style lang="scss" scoped>
</style>
