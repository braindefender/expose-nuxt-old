<template>
  <div class="cms-new-page">
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <div class="cms-table">
        <div class="cms-table__row cms-table__headers">
          <div class="cms-table__header cms-table__header--main cms-table__header--title">
            Модерируемые выставки
          </div>
          <div class="cms-table__header cms-table__header--status">
            Статус
          </div>
          <div class="cms-table__header cms-table__header--date">Дата создания</div>
          <div class="cms-table__header cms-table__header--date">Дата обновления</div>
          <div class="cms-table__header cms-table__header">Редакторы</div>
          <div class="cms-table__header cms-table__header--actions">Действия</div>
        </div>
        <list-item
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
import Sidebar from '~/components/cms/Sidebar';

export default {
  name: 'List',
  components: {
    ListItem,
    Sidebar,
  },
  data() {
    return {
      items: [
        {
          status: 'waiting',
          dateCreate: '2018-08-18',
          dateUpdate: '2018-08-26',
        },
        {
          status: 'public',
        },
      ],
    };
  },
};
</script>

<style lang="sass">
  @import '~/styles/vars.sass'

  .cms-new-page
    display: flex
    flex-direction: row
    &__content
      height: 100vh
    &__title
      font-weight: bold
      font-size: 18px
  .cms-table
    display: flex
    flex-direction: column
    &__row
      display: flex
      width: 100%
      align-items: center
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
      &--status
        width: 120px
        flex: 0 0 auto
        &--public
          color: $color-accent
        &--hidden
          color: rgba(black, 0.4)
        &--waiting
          color: $color-error
      &--date
        width: 160px
        flex: 0 0 auto
      &--authors
        font-size: 14px
      &--actions
        padding-right: 20px
        width: 180px
        flex: 0 0 auto

</style>
