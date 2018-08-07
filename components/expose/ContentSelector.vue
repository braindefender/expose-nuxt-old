<template>
<div class="content-selector">

<h3>Содержание</h3>

<ul>
  <li v-for="(item, index) in this.list"
    :key="item"
    :class="index == active ? 'active' : ''">{{ item }}</li>
</ul>

</div>
</template>

<script>
export default {
  name: 'ContentSelector',
  props: ['list'],
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

  h3
    color: black
    font-weight: bold
    font-size: 18px
    line-height: 20px

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
      &.active
        color: rgba(black, 1)
        font-weight: bold
        &::after
          content: ''
          position: absolute
          top: 0
          bottom: 0
          left: -12px
          width: 3px
          background-color: #1861f2
          border-radius: 5em

</style>
