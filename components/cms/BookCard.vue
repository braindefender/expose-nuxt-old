<template>
  <div class="book-card">
    <div
      class="checkbox"
      :class="this.item.checked ? 'checked' : ''"
      @click="check">
    </div>
    <div class="title">{{ this.item.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: ['item'],
  data() {
    return {};
  },
  methods: {
    check() {
      this.$emit('check');
    },
  },
};
</script>

<style lang="sass" scoped>
  .book-card
    background-color: white
    border-radius: 5px
    color: black
    display: flex
    align-items: center
    height: 32px
    padding-left: 8px
    .checkbox
      position: relative
      width: 16px
      height: 16px
      border-radius: 5px
      background-color: #4680ff
      &.checked
        background-color: #FB616F
    .title
      padding-left: 10px
</style>
