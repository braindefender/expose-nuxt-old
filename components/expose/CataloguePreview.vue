<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__title">
          Каталог выставок
        </div>
        <nuxt-link
          to="catalogue"
          class="cat-layout__action">
          Смотреть все
        </nuxt-link>
      </div>
      <div class="cat-layout__content">
        <div class="cat-layout__grid">
          <catalogue-card
            v-for="(item, index) in list"
            :key="index"
            :item="item">
          </catalogue-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogueCard from '@/components/expose/CatalogueCard';

export default {
  name: 'CataloguePreview',
  components: { CatalogueCard },
  props: ['list'],
  data() {
    return {};
  },
};
</script>


<style lang="sass">

  @import '~/styles/mixins.sass'

  .cat-layout
    max-width: 810px
    padding-bottom: 20px
    &__grid
      display: grid
      grid-template-columns: repeat(auto-fill, 395px)
      grid-auto-row: auto
      grid-gap: 30px 20px
      grid-auto-flow: row
    &__slider
      width: 100%
      height: 226px
      background-color: #333
      border-radius: 5px
    &__panel
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: 64px
    &__title
      font-size: 20px
      font-weight: bold
      font-family: 'PT Sans'
    &__action
      cursor: pointer
      font-size: 14px
      color: #4680ff
      +tdn
    &__sort
      font-size: 0
    &__sort-button
      margin: 0
      padding: 0
      font-family: 'PT Sans'
      cursor: pointer
      color: #4680ff
      border: none
      outline: none
      background: none
      font-size: 14px
      margin-right: 20px
      &:last-child
        margin-right: 0
      &--active
        font-weight: bold
        color: black

</style>
