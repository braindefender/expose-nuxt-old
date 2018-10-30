<template>
  <div class="cms-new-page">
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <div class="cms-table">
        <div class="cms-table__row cms-table__headers">
          <div class="cms-table__header cms-table__header--main cms-table__header--title">
            Модерируемые выставки
          </div>
          <div class="cms-table__header cms-table__header--date">Дата создания</div>
          <div class="cms-table__header cms-table__header--date">Дата обновления</div>
          <div class="cms-table__header cms-table__header">Редакторы</div>
          <div class="cms-table__header cms-table__header--actions">Действия</div>
        </div>
        <list-item
          v-if="items.length !== 0"
          v-for="(item, index) in items"
          :key="index"
          :item="item">
        </list-item>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '~/components/cms/list/ListItem';
import Sidebar from '~/components/cms/sidebar/Sidebar';

export default {
  name: 'List',
  components: {
    ListItem,
    Sidebar,
  },
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
    &__row
      display: flex
      width: 100%
      align-items: center
      margin-bottom: 20px
      flex: 0 0 auto
      position: relative
    &__headers
      height: 60px
      box-shadow: 0 1px 0 rgba(black, 0.1)
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
    &__list-item
      &--actions
        padding-right: 20px
        width: 360px
        flex: 0 0 auto
        display: grid
        grid-template-rows: 1fr 1fr
        grid-template-columns: 1fr 1fr
        grid-gap: 10px

  .cms-icon-big
    width: 48px
    height: 48px
    background: center no-repeat
    background-size: contain
    border: 2px solid rgba(black, 0.5)
    &--info
      background-image: url(~/assets/icons/info.svg)
    &--sort
      background-image: url(~/assets/icons/sort.svg)
    &--edit
    &--demo
    &--remove

</style>
