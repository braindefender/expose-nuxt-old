<template>
  <div class="es-card-wrapper">
    <div class="es-card-wrapper__letter" v-if="options.showLetters">
      <span v-if="options.showLetter">
        {{item.author[0]}}
      </span>
    </div>
    <div
      :class="selected ? 'es-card es-card--selected' : 'es-card'"
      @click="select">
      <div class="es-card__controls">
        <div class="es-card__check" @click="check">
          <input type="checkbox" :checked="options.checked">
          <label></label>
        </div>
      </div>
      <div class="es-card__content">
        <div class="es-card__top">
          <div class="es-card__author">{{ item.author }}</div>
          <div class="es-card__info">{{item.source}}, <span>{{item.year}}</span></div>
        </div>
        <div class="es-card__bot">
          <div class="es-card__title">{{ item.title }}</div>
          <div class="es-card__badge-box" v-if="showBadges">
            <div class="es-card__badge es-card__badge--warning">
              Нет аннотации
            </div>
            <div class="es-card__badge es-card__badge--error">
              Нет обложки!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ESCard',
  props: ['item', 'options'],
  data() {
    return {
      selected: false,
      showBadges: this.options.showBadges,
      selectMode: this.options.selectMode,
    };
  },
  methods: {
    select() {
      if (this.selectMode) {
        this.selected = !this.selected;
      }
    },
    check() {
      this.$emit('check');
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'
  @import '@/styles/mixins.sass'

  .es-card-wrapper
    display: flex
    flex-direction: row
    &__letter
      padding-top: 5px
      flex: 0 0 auto
      width: 10px
      margin-right: 10px
      text-align: right
      font-size: 14px
      line-height: 20px
      font-weight: bold
      color: rgba(black, 0.25)

  .es-card
    flex: 1 1 auto
    box-sizing: border-box
    display: flex
    flex-direction: row
    background-color: white
    border-radius: 5px
    overflow: hidden
    padding-top: 4px
    padding-bottom: 5px
    padding-right: 8px
    box-shadow: 0px 2px 5px rgba(black, 0.05), 0px 4px 8px rgba(black, 0.05)
    transition: all ease 0.25s
    position: relative
    cursor: pointer
    border: 2px solid rgba($color-accent, 0)
    &:hover
      box-shadow: 0px 2px 5px rgba(black, 0.1), 0px 4px 16px rgba(black, 0.05)
    &--selected
      border: 2px solid rgba($color-accent, 1)
    &__content
      flex-grow: 1
    &__top
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      margin-bottom: -2px
    &__author
      font-size: 14px
      line-height: 20px
      color: $color-accent
    &__info
      font-size: 14px
      line-height: 20px
      span
        color: $color-accent
    &__title
      font-size: 15px
      line-height: 17px
      font-weight: bold
      width: 80%
    &__controls
      width: 48px
      padding-top: 8px
      flex-grow: 0
      display: flex
      flex-direction: column
      align-items: center
    &__check
      user-select: none
      input
        display: none
        opacity: 0
        -webkit-appearance: none
      label
        position: relative
        display: block
        width: 22px
        height: 22px
        background-color: rgba(black, 0.12)
        border-radius: 7px
        cursor: pointer
        transition: all ease 0.15s
        &::before
          transition: all ease 0.15s
          +posa(3px)
          border-radius: 5px
          content: ''
          background-color: white
        &:after
          transition: all ease 0.15s
          +posa(5px)
          border-radius: 3px
          content: ''
        &:hover
          &::after
            background-color: rgba(black, 0.12)
        &:active
          &::after
            background-color: $color-accent
      input:checked + label
        &::after
          background-color: $color-accent
        &:hover
          &::after
            box-shadow: 0px 3px 6px rgba(70, 128, 255, 0.4)
        &:active
          &::after
            background-color: rgba(black, 0.12)
    &__badge-box
      padding-top: 2px
      padding-bottom: 2px
    &__badge
      box-sizing: border-box
      font-weight: bold
      height: 18px
      font-size: 12px
      line-height: 16px
      color: rgba(black, 0.75)
      display: inline-block
      text-align: center
      padding-left: 8px
      padding-right: 8px
      padding-top: 1px
      padding-bottom: 8px
      border-radius: 4em
      &--warning
        background-color: rgba($color-warning, 0.6)
      &--error
        background-color: rgba($color-error, 0.6)

</style>
