<template>
  <div class="sort-menu">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="generateClass(item)"
      class="sort-menu__item"
      @click="reverse(item)"
    >{{ item[fields.title] }}</div>
  </div>
</template>

<script>
export default {
  name: 'SortMenu',
  props: {
    list: {
      type: Array,
      required: true,
    },
    check: {
      type: Object,
      required: true,
    },
    fields: {
      type: Object,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      direction: false,
    };
  },
  methods: {
    generateClass(item) {
      let active = this.compare(item) ? 'sort-menu__item--active' : '';
      let direction = this.direction
        ? 'sort-menu__item--up'
        : 'sort-menu__item--down';
      return `${active} ${direction}`;
    },
    reverse(item) {
      this.direction = this.compare(item) ? !this.direction : false;
      this.callback({ type: item, direction: this.direction });
    },
    compare(item) {
      let check = this.fields.check;
      return this.check[check] == item[check];
    },
  },
};
</script>

<style lang="sass">
@import 'styles/vars.sass'

.sort-menu
  display: flex
  align-items: center
  width: 100%
  border-radius: 5px
  border: 1px solid rgba(black, 0.2)
  font-size: 14px
  height: 32px

  &__item
    display: flex
    align-items: center
    justify-content: center
    flex-grow: 1
    flex-shrink: 0
    flex-basis: max-content
    height: 32px
    border-radius: inherit
    border: 2px solid rgba($color-accent, 0)
    color: rgba(black, 0.6)
    margin-left: -1px
    margin-right: -1px
    padding-left: 15px
    padding-right: 15px
    cursor: pointer
    user-select: none
    transition: all ease-in-out 0.15s

    &--active
      border: 2px solid rgba($color-accent, 1)
      font-weight: bold
      color: $color-accent
      position: relative
      padding-left: 47px
      &::before
        content: ''
        position: absolute
        top: -2px
        left: -2px
        bottom: -2px
        width: 32px
        background-color: $color-accent
        border-radius: inherit
      &::after
        content: ''
        position: absolute
        top: -4px
        left: -2px
        bottom: 0
        width: 32px
        background: url('~assets/icon-chevron-left.svg') center no-repeat
        background-size: 12px
    &--up
      &::after
        top: 4px
        transform: rotate(90deg)
    &--down
      &::after
        transform: rotate(-90deg)


</style>
