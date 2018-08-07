<template>
  <div class="ec-select">
    <div
      v-for="(item, index) in list"
      class="ec__toggle-item button"
      @click="call(item.index)"
      :class="check == item.index ? '' : 'button--outline'"
      :key="index">{{item.title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: ['list', 'call', 'check'],
  data() {
    return {};
  },
};
</script>

<style lang="sass">

</style>
