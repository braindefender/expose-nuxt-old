<template>
  <div class="es-card-wrapper">
    <div class="es-card-wrapper__letter" v-if="options.showLetters">
      <span v-if="options.showLetter">
        {{item.author ? item.author[0] : item.title[0]}}
      </span>
    </div>
    <div
      :class="selected ? 'es-card es-card--selected' : 'es-card'"
      @click="atClick">
      <div class="es-card__controls">
        <div
          v-if="!selectMode"
          class="es-card__check" @click="options.checkOnClick ? '' : check">
          <input type="checkbox" :checked="item.checked">
          <label></label>
        </div>
        <div
          v-else
          ref="progress" class="control-progress"></div>
      </div>
      <div class="es-card__content">
        <div class="es-card__top">
          <div
            :class="item.author
              ? 'es-card__author'
              : 'es-card__author es-card__author--gray'">
          {{ author }}
          </div>
          <div class="es-card__info">{{ info }}</div>
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
import progressbar from 'progressbar.js';

export default {
  name: 'ESCard',
  props: ['item', 'options'],
  mounted() {
    if (this.selectMode) {
      this.progressbar = new progressbar.Circle(this.$refs.progress, {
        strokeWidth: 16,
        easing: 'easeInOut',
        duration: 1000,
        color: '#4680ff',
      });
      this.progressbar.animate(this.progress);
    }
  },
  data() {
    return {
      showBadges: this.options.showBadges ? this.options.showBadges : false,
      selectMode: this.options ? this.options.selectMode : false,
      progressbar: Object,
    };
  },
  computed: {
    author() {
      return this.item.author || 'Автор не указан';
    },
    info() {
      return [this.item.source, this.item.year]
        .filter(el => el !== undefined)
        .join(', ');
    },
    selected() {
      return this.item === this.$store.state.editState.selected;
    },
    progress() {
      let progress = 0;
      if (this.item.annotation) {
        progress += 1;
      }
      if (this.item.cover) {
        progress += 1;
      }
      return this.item.progress + progress / 2;
    },
  },
  methods: {
    select() {
      this.$store.commit('selectOnEditScreen', this.item);
    },
    check() {
      this.$emit('check');
    },
    atClick() {
      this.options.checkOnClick ? this.check() : this.select();
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
      flex: 0 0 auto
      color: $color-accent
      &--gray
        color: rgba(black, 0.4)
    &__info
      font-size: 14px
      line-height: 15px
      text-align: right
      span
        color: $color-accent
    &__title
      font-size: 14px
      line-height: 17px
      font-weight: bold
      width: 80%
    &__controls
      margin-left: -1px
      width: 48px
      padding-top: 8px
      flex: 0 0 auto
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
