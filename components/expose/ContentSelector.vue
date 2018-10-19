<template>
  <div class="content-selector">

    <h3>Содержание</h3>
    <div class="content-selector__list">
      <scrollactive
          active-class="active"
          :duration="800">
        <content-selector-list
          v-for="(item, index) in stack.list"
          v-if="item.kind === 'stack'"
          :stack="item"
          :index="index"
          :key="index"/>
      </scrollactive>
    </div>

  </div>
</template>

<script>
import ContentSelectorList from '~/components/expose/ContentSelectorList';

export default {
  name: 'ContentSelector',
  components: { ContentSelectorList },
  props: ['stack'],
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="sass" scoped>

  .content-selector
    max-width: 250px
    text-align: left
    &__list
      max-height: calc(100vh - 70px)
      overflow-y: auto
      position: relative
      padding-left: 12px
      &::before
        content: ''
        position: absolute
        top: 0
        left: 0px
        bottom: 0
        background-color: rgba(black, 0.15)
        width: 3px
        border-radius: 5em

  h3
    color: black
    font-weight: bold
    font-size: 18px
    line-height: 20px
    padding-top: 18px
    padding-bottom: 20px

  ul
    list-style: none
    position: relative
    padding: 0
    margin: 0
    padding-left: 12px
    font-weight: normal
    font-size: 14px
    line-height: 20px
    &::before
      position: absolute
      left: 0
      top: 0
      bottom: 0
      content: ''
      width: 3px
      background-color: #eee
      border-radius: 5em
    li
      padding: 0
      margin: 0
      margin-bottom: 6px
      position: relative
      color: rgba(black, 0.6)

</style>
