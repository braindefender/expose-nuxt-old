<template>
  <div v-show="show" transition="modal" class="modal">
    <div class="modal__wrapper">
      <div class="modal__header" :class="`modal__header--${type}`">{{ header }}</div>
      <div class="modal__body">{{ body }}</div>
      <div class="modal__buttons">
        <div class="modal__button" @click="okcallback">{{ oktext }}</div>
        <div v-if="showcancel" class="modal__button" @click="cancelcallback">{{ canceltext }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
    header: {
      type: String,
      default: 'Tips',
    },
    body: {
      type: String,
      default: '',
    },
    oktext: {
      type: String,
      default: 'OK',
    },
    okcallback: {
      type: Function,
      default: function() {
        this.show = false;
      },
    },
    showcancel: {
      type: Boolean,
      default: false,
    },
    canceltext: {
      type: String,
      default: 'Отмена',
    },
    cancelcallback: {
      type: Function,
      default: function() {
        this.show = false;
      },
    },
    duration: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'tip',
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="sass">

@import '~/styles/vars.sass'

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
  position: fixed

  &__wrapper
    width: 320px
    border-radius: 5px
    box-shadow: 0 5px 20px rgba(black, 0.15)
    transition: opacity 0.3s ease
    text-align: center
    background: white

  &__header
    padding: 10px 20px
    font-weight: bold
    &--tip
      background: rgba($color-accent, 0.1)
    &--error
      background: rgba($color-error, 0.1)
    &--warning
      background: rgba($color-warning, 0.1)

  &__body
    padding: 20px

  &__buttons
    display: flex

  &__button
    width: 100%
    font-weight: bold
    font-size: 14px
    cursor: pointer
    padding: 10px 20px
    &:first-child
      background: rgba($color-accent, 0.1)
    &:nth-child(2)
      background: rgba($color-error, 0.1)

</style>
