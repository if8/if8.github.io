<template>
  <div class="modal modal-frame">
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Modal title
        </p>
        <button
          class="delete"
          aria-label="close"
        />
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">
          Save changes
        </button>
        <button class="button">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalFrame'
}
</script>

<style lang="scss" scoped>
</style>
