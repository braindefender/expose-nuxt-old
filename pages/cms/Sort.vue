<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <div class="es">
        <div class="es__side es__side--left">
          <div class="es__side-top">
            <div class="es__side-title">
              Неотсортированные
            </div>
            <div class="es__side-controls">
              <button class="button" type="button">Выделить все</button>
              <button class="button" type="button">Удалить</button>
              <button class="button" type="button">Загрузить XML</button>
            </div>
          </div>
          <div class="es__list">
            <ESCard
              v-for="(item, index) in this.$store.state.unsortedItems"
              :item="item"
              :key="index"
              :options="{
                selectMode: false,
                showBadges: false,
                showLetter: letters[index],
                showLetters: true,
              }">
            </ESCard>
          </div>
        </div>
        <div class="es__side es__side--right">
          <Stack :options="{
            showProgress: false,
            showCheckbox: true
          }"></Stack>
          <Stack :options="{
            showProgress: false,
            showCheckbox: true
          }"></Stack>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Navigation from '@/components/cms/Navigation';
import Stack from '@/components/cms/Stack';
import ESCard from '@/components/cms/ESCard';

export default {
  name: 'PageTwo',
  methods: {
    toggleStack() {
      this.stack.opened = !this.stack.opened;
    },
  },
  components: { Navigation, Stack, ESCard },
  data() {
    return {
      stack: {
        opened: false,
      },
    };
  },
  computed: {
    letters() {
      return this.$store.state.unsortedItems
        .map(el => el.author[0])
        .map((val, ind, arr) => val !== arr[ind - 1]);
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'
  @import '@/styles/mixins.sass'

  .es
    position: relative
    z-index: 1
    display: flex
    flex-direction: row
    padding-top: 10px
    &__side
      width: 50%
      overflow-y: scroll
      height: calc(100vh - 58px)
      &--left
        padding-right: 5px
        margin-right: 5px
      &--right
        padding-right: 5px
    &__side-top
      padding-left: 20px
      margin-bottom: 10px
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
    &__side-title
      font-size: 16px
      font-weight: bold
      line-height: 20px
    &__side-controls
      display: flex
      flex-direction: row
      .button
        margin-right: 10px
        &:last-child
          margin-right: 0
    .es-card-wrapper
      margin-bottom: 6px

  .list-enter-active, .list-leave-active
    transition: all 1s

  .list-enter, .list-leave-to
    opacity: 0
    transform: translateY(30px)

  .list-move
    transition: transform 1s

  .es-stack-view
    box-sizing: border-box
    background-color: #EBECF0
    border-radius: 10px
    padding-top: 8px
    padding-bottom: 10px
    overflow: hidden
    position: relative
    z-index: 1
    margin-bottom: 10px
    .es-stack-view
      background-color: #E1E2E5
    &__info
      padding-left: 48px
    &__count
      font-size: 14px
      line-height: 20px
      color: rgba(black, 0.4)


</style>
