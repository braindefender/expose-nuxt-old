<template>
  <div class="cms-new-page">
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <div class="cms-table">
        <div class="cms-table__row cms-table__headers">
          <div
            class="cms-table__header cms-table__header--main cms-table__header--title"
          >Модерируемые выставки</div>
        </div>
        <div class="cms-table__list">
          <list-item-new
            v-if="items.length !== 0"
            v-for="(item, index) in items"
            :key="index"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItemNew from '~/components/cms/list/ListItemNew';
import Sidebar from '~/components/cms/sidebar/Sidebar';

export default {
  name: 'List',
  components: {
    ListItemNew,
    Sidebar,
  },
  middleware: 'authenticated',
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.exposeList;
    },
  },
  mounted() {
    this.$store.dispatch('fetchExposeList', this.$store.state.currentStatus);
    this.$store.dispatch('fetchUsersList');
  },
};
</script>

<style lang="sass">
  @import '~/styles/vars.sass'
  @import '~/styles/mixins.sass'

  .cms-table
    display: flex
    flex-direction: column
    flex-grow: 1
    overflow-y: auto
    background-color: #f5f5f5
    &__row
      display: flex
      width: 100%
      align-items: center
      margin-bottom: 20px
      flex: 0 0 auto
      position: relative
      &--blocked
        pointer-events: none
        user-select: none
    &__headers
      height: 60px
      box-shadow: 0 1px 0 rgba(black, 0.1)
      background-color: white
    &__header, &__list-item
      font-size: 15px
      color: rgba(black, 0.8)
      margin-right: 20px
      flex-grow: 1
      &:last-child
        margin-right: 0
      &--main
        padding-left: 20px
        margin-right: 40px
        width: 395px
        flex: 0 0 auto
      &--title
        font-size: 18px
        font-weight: bold
        color: black
      &--date
        width: 160px
        flex: 0 0 auto
      &--authors
        font-size: 14px
    &__header
      &--actions
        padding-right: 20px
        width: 360px
        flex: 0 0 auto
    &__list
      padding-left: 15px
      padding-right: 15px
      > div
        margin-bottom: 15px
        &:last-child
          margin-bottom: 0
    &__list-item
      position: relative
      &--action-panel
        min-width: 400px
        max-width: 550px
        display: flex
        justify-content: flex-end
        padding-right: 20px
        padding-left: 20px
        .cms-icon-big
          margin-right: 20px
          &:last-child
            margin-right: 0
      &--blocked
        min-width: 400px
        max-width: 550px
        padding-left: 20px
        padding-right: 20px
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        padding-right: 20px
        min-height: 80px
        border-radius: 5px
        &::after
          border-radius: inherit
          position: absolute
          top: 0
          left: 30px
          right: 30px
          bottom: 0
          content: ''
          background-color: rgba(black, 0.1)

  .cms-icon-big
    width: 80px
    height: 80px
    border-radius: 50%
    cursor: pointer
    position: relative
    display: flex
    justify-content: center
    align-items: flex-end
    font-size: 12px
    font-weight: bold
    &::after
      position: absolute
      top: 4px
      left: 10px
      right: 10px
      bottom: 16px
      content: ''
      opacity: 0.5
      border-radius: inherit
      background: center no-repeat
      background-size: 24px 24px
      transition: all ease-in-out 0.15s
    &::before
      position: absolute
      top: 6px
      left: 12px
      right: 12px
      bottom: 18px
      content: ''
      border-radius: inherit
      border: 2px solid rgba(black, 0.15)
      transition: all ease-in-out 0.15s
    &:hover
      color: $color-accent
      &::after
        opacity: 0.8
      &::before
        border: 5px solid rgba($color-accent, 1)
    &--info
      &::after
        background-image: url(~/assets/icons/info.svg)
    &--sort
      &::after
        background-image: url(~/assets/icons/sort.svg)
    &--edit
      &::after
        background-image: url(~/assets/icons/edit.svg)
    &--demo
      &::after
        background-image: url(~/assets/icons/demo.svg)
    &--remove
      color: rgba(black, 0.5)
      &:hover
        color: $color-error
        &::before
          border: 5px solid rgba($color-error, 1)
      &::after
        opacity: 1
        background-image: url(~/assets/icons/remove--color.svg)

  .cms-icon-big-divider
    width: 2px
    height: 80px
    margin-right: 20px
    position: relative
    &::after
      +posa(0)
      content: ''
      background-color: rgba(black, 0.15)
      border-radius: 5px

</style>
