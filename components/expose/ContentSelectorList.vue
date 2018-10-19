<template>
    <div
      class="csl">
      <a
        :href="`#${stack.title}`"
        class="csl__title scrollactive-item">{{ stack.title }}</a>
      <div class="csl__list">
        <!-- <scrollactive
          active-class="active"
          :duration="800"
          bezier-easing-value=".5,0,.35,1"> -->
        <content-selector-list
          v-for="(item, index) in stack.list"
          v-if="item.kind === 'stack'"
          :stack="item"
          :key="index"/>
        <!-- </scrollactive> -->
      </div>
    </div>
</template>

<script>
export default {
  name: 'ContentSelectorList',
  props: ['stack', 'index'],
  data() {
    return {};
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'

  .csl
    position: relative
    display: block
    margin-bottom: 6px
    &:last-child
      margin-bottom: 0
    &__title
      font-size: 14px
      line-height: 20px
      color: #999
      text-decoration: none
      &:hover
        text-decoration: underline
      &:visited
        opacity: 1
        color: rgba(#4680ff, 1)
      &.active
        &::before
          content: ''
          position: absolute
          top: 0
          left: -12px
          bottom: 0
          background-color: rgba($color-accent, 1)
          width: 3px
          border-radius: 3px
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
