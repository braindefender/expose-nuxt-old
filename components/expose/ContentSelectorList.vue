<template>
  <div class="csl">
    <div class="csl__title">
      {{ stack.title }}
    </div>
    <div class="csl__list">
      <content-selector-list
        v-for="(item, index) in stack.list"
        v-if="item.kind === 'stack'"
        :stack="item"
        :key="index">
      </content-selector-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentSelectorList',
  props: ['stack'],
  data() {
    return {};
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'

  .csl
    position: relative
    &__title
      font-size: 14px
      line-height: 20px
      opacity: 0.6
      margin-bottom: 6px
    &__list
      padding-left: 12px
      position: relative
      &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        bottom: 0
        background-color: rgba(black, 0.15)
        width: 3px
        border-radius: 3px

</style>
