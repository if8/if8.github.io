<template>
  <div class="show-icons">
    <div
      v-for="name in nameList"
      :key="name"
      class="icon-wrap"
    >
      <v-icon
        :name="name"
        :scale="4"
      />
      <div>{{ name }}</div>
    </div>
  </div>
</template>

<script>
import { IconNameList } from '@utils/icon-names.js'
export default {
  name: 'ShowIcons',
  data () {
    return {
      nameList: IconNameList
    }
  }
}
</script>

<style lang="scss" scoped>
.show-icons {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 12px;

  .icon-wrap {
    text-align: center;
    overflow: hidden;
    flex-basis: 10%;
    margin-bottom: 24px;
    padding: 0px 8px;
  }
}
</style>
