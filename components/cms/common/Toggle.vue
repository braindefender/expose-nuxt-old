<template>
  <div class="cms-toggle">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="check == item.index ? 'cms-toggle__item--active' : ''"
      class="cms-toggle__item"
      @click="call(item.index)"
      >{{item.title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: ['list', 'call', 'check'],
  data() {
    return {};
  },
};
</script>

<style lang="sass">
  @import 'styles/vars.sass'

  .cms-toggle
    display: flex
    align-items: center
    width: 100%
    border-radius: 5px
    border: 1px solid rgba(black, 0.2)
    font-size: 14px
    height: 32px
    &__item
      margin-left: -1px
      margin-right: -1px
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center
      flex-grow: 1
      flex-shrink: 0
      flex-basis: max-content
      height: 32px
      border-radius: 5px
      border: 2px solid rgba($color-accent, 0)
      padding-left: 15px
      padding-right: 15px
      color: rgba(black, 0.6)
      &--active
        border: 2px solid rgba($color-accent, 1)
        font-weight: bold
        color: $color-accent

</style>
