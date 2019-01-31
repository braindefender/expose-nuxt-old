<template>
  <div class="cms-new-page">
    <sidebar/>
    <div class="cms-new-page__content">
      <div class="cms-new-page__columns">
        <div class="cms-new-page__rows" style="flex-grow: 0; overflow-y: auto">
          <div class="cms-new-page__panel">
            <nuxt-link class="button" :to="{ name: `cms-List` }">Назад</nuxt-link>
            <nuxt-link class="button" :to="{ name: `cms-Sort`, params: { fromcms: true } }">Далее</nuxt-link>
          </div>
          <Weekly v-if="expose.mode === 0"/>
          <Thematic v-if="expose.mode === 1"/>
        </div>
        <div class="ec__preview">
          <Cover :options="options"/>
          <Annotation v-if="expose.mode !== 0" :text="expose.annotation"/>
          <div class="ec__preview-image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Annotation from '@/components/expose/Annotation';
import Cover from '@/components/expose/Cover';
import Thematic from '~/components/cms/info/Thematic';
import Weekly from '~/components/cms/info/Weekly';
import Sidebar from '~/components/cms/sidebar/Sidebar';

export default {
  name: 'Info',
  middleware: 'auth',
  components: {
    Annotation,
    Cover,
    Thematic,
    Weekly,
    Sidebar,
  },
  mounted() {
    if (this.$route.params.fromcms !== true) {
      this.$router.push({ path: '/cms/list' });
    }
  },
  beforeDestroy() {
    if (this.$route.params.fromcms === true) {
      this.$store.commit('syncState');
    }
  },
  data() {
    return {};
  },
  computed: {
    expose() {
      return this.$store.state.info;
    },
    options() {
      return {
        nav: true,
        fromcms: true,
        ...this.expose,
      };
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'
  @import '@/styles/mixins.sass'

  .slide-fade-enter-active
    transition: all .3s ease

  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(10px)
    opacity: 0

  .ec
    background-color: white
    &__preview
      overflow: hidden
      min-height: 100vh
      display: flex
      justify-content: flex-start
      align-items: flex-start
      flex-direction: column
      flex: 1 0 auto
    &__preview-image
      margin-top: 40px
      width: 100%
      flex-grow: 1
      background: url('~/assets/expose-preview.svg') top left no-repeat
    &__box
      padding-left: 20px
      padding-right: 20px
      padding-top: 30px
      flex-shrink: 0
      width: 410px
      flex-grow: 1
      display: flex
      flex-direction: column
      align-items: flex-start
      padding-bottom: 36px
      overflow: auto
    &__row
      display: flex
      flex-direction: column
      width: 100%
      flex: 0 0 auto
      margin-bottom: 25px
      &:last-child
        margin-bottom: 0
    &__column
      display: flex
      flex-direction: column
      justify-content: space-between
      align-items: flex-start
    &__title
      font-weight: bold
      font-size: 16px
      line-height: 20px
      margin-bottom: 6px
    &__toggle-item
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
    &__input
      border: none
      outline: none
      border-radius: 5px
      box-sizing: border-box
      font-family: 'PT Sans'
      font-size: 14px
      line-height: 20px
      border: 1px solid rgba(black, 0.2)
      padding-top: 4px
      padding-bottom: 4px
      padding-left: 15px
      padding-right: 15px
      font-weight: bold
      width: 100%
      min-height: 32px
      &::placeholder
        color: rgba(black, 0.4)
    &__text-field
      min-height: 32px
      width: 100%
      border: none
      outline: none
      box-sizing: border-box
      font-family: 'PT Sans'
      font-size: 14px
      border-radius: 5px
      padding-left: 15px
      padding-right: 15px
      padding-top: 7px
      padding-bottom: 7px
      border: 1px solid rgba(black, 0.2)
      white-space: pre
      &:focus
        border: 1px solid rgba($color-accent, 1)
    &__textarea
      min-height: 32px
      width: 100%
      border: none
      outline: none
      box-sizing: border-box
      font-family: 'PT Sans'
      font-size: 14px
      border-radius: 5px
      padding-top: 7px
      padding-bottom: 10px
      padding-left: 15px
      padding-right: 15px
      resize: none
      border: 1px solid rgba(black, 0.2)
      &::placeholder
        color: rgba(black, 0.4)
      &--bold
        font-weight: bold
      &--title
        font-size: 14px
        height: 32px
        line-height: 16px
      &--description
        font-size: 14px
        line-height: 20px
    &__loader
      z-index: 10
      &-input
        opacity: 0
        display: none
      &-label
        width: 100%
        height: 32px
        background-color: #555
      &-comment
        margin: 0
        padding: 0
        padding-top: 7px
        font-size: 13px
        line-height: 17px
        color: rgba(black, 0.6)
      >.picture-input
        padding: 0
        width: 100%
        height: 32px
        border-radius: 5px
        overflow: hidden
        transition: all ease 0.15s
        box-shadow: 0px 3px 6px rgba(black, 0)
        &:hover
          box-shadow: 0px 3px 6px rgba($color-accent, 0.4)
        .picture-preview
          width: 100%
          height: 32px
        .preview-container
          position: relative
          overflow: hidden
          &::after
            +posa(0)
            padding-bottom: 4px
            z-index: 5000
            font-weight: bold
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            color: white
            font-size: 14px
            pointer-events: none
            content: 'Загрузить обложку'
            background-color: rgba($color-accent, 1)
    &__date-picker
      display: flex
      flex-direction: row
      &-half
        width: 50%
        display: flex
        justify-content: space-between
        align-items: center
        padding-left: 15px
        flex: 0 0 auto
        &:first-child
          padding-left: 0
      input[type=date]
        margin: 0
        padding: 0
        box-sizing: border-box
        border: none
        outline: none
        border: 1px solid rgba(black, 0.2)
        border-radius: 5px
        padding-left: 8px
        padding-right: 4px
        height: 32px
        font-size: 14px
        font-weight: bold
        font-family: 'PT Sans'
        cursor: pointer
        &::-webkit-inner-spin-button
          -webkit-appearance: none
          display: none
        &::-webkit-clear-button
          opacity: 0
          display: none
          -webkit-appearance: none
        &::-webkit-calendar-picker-indicator
          cursor: pointer
          display: block
          width: 26px
          height: 22px
          background: url('../../assets/icon-calendar-inactive.svg') center right no-repeat
          opacity: 1
          margin: 0
          padding: 0
          color: transparent
          transition: all ease 0.25s
          &:hover, &:active
            background: url('../../assets/icon-calendar-active.svg') center right no-repeat
      span
        font-size: 14px
        line-height: 20px
        font-weight: bold

</style>
