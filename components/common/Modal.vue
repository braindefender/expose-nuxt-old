<template>
  <div transition="modal" class="modal">
    <div class="modal__wrapper">
      <div class="modal__header" :class="`modal__header--${options.type}`">{{ options.header }}</div>
      <div class="modal__body">
        <slot/>
      </div>
      <div class="modal__buttons">
        <div
          class="modal__button"
          :class="options.swapcolors ? 'modal__button--error' : 'modal__button--ok'"
          @click="options.okcallback"
        >{{ options.oktext }}</div>
        <div
          v-if="options.showcancel"
          class="modal__button"
          :class="options.swapcolors ? 'modal__button--ok' : 'modal__button--error'"
          @click="options.cancelcallback"
        >{{ options.canceltext }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Modal',
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="sass">

@import '~/styles/vars.sass'
@import '~/styles/mixins.sass'

.modal
  display: flex
  align-items: center
  justify-content: center
  background-color: rgba(black, 0.5)
  transition: opacity 0.3s ease
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 15000
  position: absolute

  &__wrapper
    min-width: 320px
    border-radius: 5px
    box-shadow: 0 5px 20px rgba(black, 0.1)
    transition: opacity 0.3s ease
    background: white
    padding: 20px
    display: grid
    grid-template-rows: 32px 1fr 32px
    grid-row-gap: 20px

  &__header
    display: flex
    justify-content: center
    align-items: center
    font-weight: bold
    text-align: center
    &--tip
      background: rgba($color-accent, 0.1)
    &--error
      background: rgba($color-error, 0.1)
    &--warning
      background: rgba($color-warning, 0.1)

  &__buttons
    display: flex

  &__button
    +button
    border-radius: 5px
    width: 100%
    font-weight: bold
    font-size: 14px
    padding: 10px 20px
    margin-right: 10px
    border: 1px solid rgba(black, 0.05)
    &--ok
      background: rgba(black, 0.05)
      color: $color-accent
    &--error
      background: rgba(black, 0.05)
      color: $color-error
    &:last-child
      margin-right: 0

  .modal-preview
    &__grid
      display: grid

</style>
