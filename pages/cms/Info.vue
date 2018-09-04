<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <div class="ec">

        <Weekly
          v-if="expose.mode === 0"
          :mode="expose.mode"
          :source="expose.source"
          :dateTo="dateTo"
          :dateFrom="dateFrom"
          @set="set">
        </Weekly>

        <Theme
          v-if="expose.mode === 1"
          :title="expose.title"
          :mode="expose.mode"
          :phone="expose.phone"
          :email="expose.email"
          :source="expose.source"
          :dateTo="dateTo"
          :dateFrom="dateFrom"
          :annotation="expose.annotation"
          @set="set">
        </Theme>

        <Cover :options="options"></Cover>

        <Annotation
          v-if="expose.mode !== 0"
          :text="expose.annotation">
        </Annotation>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Annotation from '@/components/expose/Annotation';
import Cover from '@/components/expose/Cover';
import Select from '@/components/cms/Select';
import Navigation from '@/components/cms/Navigation';

import Weekly from '~/components/cms/info/Weekly';
import Theme from '~/components/cms/info/Theme';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export default {
  name: 'Info',
  components: {
    Annotation,
    Cover,
    Select,
    Navigation,
    Weekly,
    Theme,
  },
  beforeDestroy() {
    this.syncState();
  },
  mounted() {
    if (this.$route.params.cms !== true) {
      this.fetchState();
    }
  },
  data() {
    return {
      sourceList: this.$store.state.sourceList,
    };
  },
  computed: {
    expose() {
      return this.$store.state.info;
    },
    info() {
      return this.expose.mode === 0 ? this.weekly : this.theme;
    },
    dateFrom() {
      return this.$store.state.info.dateFrom;
    },
    dateTo() {
      return this.$store.state.info.dateTo;
    },
    weekly() {
      return {
        mode: 0,
        title: this.sourceList[this.expose.source].weekly,
        phone: this.sourceList[this.expose.source].phone,
        email: this.sourceList[this.expose.source].email,
        source: this.expose.source,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        image: '',
      };
    },
    theme() {
      return {
        mode: 1,
        source: this.expose.source,
        title: this.expose.title,
        phone: this.expose.phone,
        email: this.expose.email,
        image: this.expose.image,
        annotation: this.expose.annotation,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        categories: this.expose.categories,
      };
    },
    options() {
      const source =
        this.expose.mode === 0
          ? `\n`
          : this.sourceList[this.expose.source].title;
      const image =
        this.expose.mode !== 0
          ? this.expose.image
          : this.sourceList[this.expose.source].image;
      const title =
        this.expose.mode === 0
          ? this.sourceList[this.expose.source].weekly
          : this.expose.title;
      return {
        nav: true,
        title,
        image,
        source,
        date: {
          from: this.getDateFrom(this.dateFrom),
          to: this.getDateFrom(this.dateTo),
        },
        prev: undefined,
        next: undefined,
      };
    },
  },
  methods: {
    fetchState() {
      this.$store.dispatch('fetchState');
    },
    syncState() {
      this.$store.dispatch('syncInfoState', this.info);
    },
    set(field, value) {
      this.$store.commit('info/set', { field, value });
    },
    getDateInYYYYMMDD(date) {
      return date.toISOString().split('T')[0];
    },
    getDateFrom(input) {
      const date = new Date(input);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
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
    box-sizing: border-box
    background-color: white
    padding-top: 36px
    &__box
      padding-left: 20px
      padding-right: 20px
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: flex-start
      padding-bottom: 36px
    &__column
      display: flex
      flex-direction: column
      justify-content: space-between
      align-items: flex-start
    &__title
      font-weight: bold
      font-size: 14px
      line-height: 20px
      margin-bottom: 5px
    &__item
      margin-bottom: 20px
      &:last-child
        margin-bottom: 0
    &__toggle
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
      border: 2px solid rgba(black, 0.1)
      padding-top: 4px
      padding-bottom: 4px
      padding-left: 15px
      padding-right: 15px
      font-weight: bold
      min-width: 200px
      &::placeholder
        color: rgba(black, 0.4)
    &__textarea
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
      border: 2px solid rgba(black, 0.1)
      &::placeholder
        color: rgba(black, 0.4)
      &--bold
        font-weight: bold
      &--title
        font-size: 14px
        height: 32px
        line-height: 15px
        min-width: 200px
      &--description
        font-size: 14px
        line-height: 20px
        min-height: 190px
        min-width: 480px
    &__loader
      &-comment
        margin: 0
        padding: 0
        padding-top: 7px
        font-size: 13px
        line-height: 17px
        color: rgba(black, 0.6)
    &__date-picker
      input[type=date]
        margin: 0
        padding: 0
        box-sizing: border-box
        border: none
        outline: none
        border: 2px solid rgba(black, 0.1)
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
        margin-right: 10px
        margin-left: 10px
        &:first-child
          margin-left: 0

  .picture-input
    padding: 0
    width: 172px
    height: 32px
    border-radius: 5px
    overflow: hidden
    transition: all ease 0.15s
    box-shadow: 0px 3px 6px rgba(black, 0)
    &:hover
      box-shadow: 0px 3px 6px rgba($color-accent, 0.4)
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

</style>
