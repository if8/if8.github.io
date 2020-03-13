<template>
  <nav class="side-panel">
    <p class="panel-heading">
      Repositories
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" placeholder="Search" type="text" />
        <span class="icon is-left">
          <b-icon pack="fas" icon="user" size="is-small" />
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
        <b-icon pack="fas" icon="user" size="is-small" />
      </span>
      bulma
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <b-icon pack="fas" icon="user" size="is-small" />
      </span>
      marksheet
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <b-icon pack="fas" icon="user" size="is-small" />
      </span>
      minireset.css
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <b-icon pack="fas" icon="user" size="is-small" />
      </span>
      jgthms.github.io
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <b-icon pack="fas" icon="user" size="is-small" />
      </span>
      daniellowtw/infboard
    </a>
    <a class="panel-block">
      <span class="panel-icon">
        <b-icon pack="fas" icon="user" size="is-small" />
      </span>
      mojs
    </a>
    <label class="panel-block"> <input type="checkbox" />> remember me </label>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">
        Reset all filters
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SidePanel',
  data() {
    return {
      a: 1,
    }
  },
}
</script>

<style lang="scss" scoped></style>
