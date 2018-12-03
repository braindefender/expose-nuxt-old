<template>
  <div class="cms-new-page">
    <!-- <Navigation></Navigation> -->
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <div class="cms-new-page__columns">
        <div class="cms-new-page__rows" style="flex-grow: 0; overflow-y: auto">
          <div class="cms-new-page__panel">
            <nuxt-link class="button" :to="{ name: `cms-List`, params: { cms: true } }">Назад</nuxt-link>
            <nuxt-link class="button" :to="{ name: `cms-Sort`, params: { cms: true } }">Далее</nuxt-link>
          </div>

          <Weekly
            v-if="expose.mode === 0"
            :mode="expose.mode"
            :source="expose.source"
            :dates="expose.dates"
            @set="set"
            @setDate="setDate"
          ></Weekly>

          <Theme
            v-if="expose.mode === 1"
            :title="expose.title"
            :mode="expose.mode"
            :phone="expose.phone"
            :email="expose.email"
            :source="expose.source"
            :dates="expose.dates"
            :annotation="expose.annotation"
            @set="set"
            @setDate="setDate"
          ></Theme>
        </div>
        <div class="ec__preview">
          <Cover :options="options"></Cover>

          <Annotation v-if="expose.mode !== 0" :text="annotation"></Annotation>

          <div class="ec__preview-image"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Sidebar from '~/components/cms/sidebar/Sidebar';

import Annotation from '@/components/expose/Annotation';
import Cover from '@/components/expose/Cover';
import Select from '@/components/cms/Select';

import Weekly from '~/components/cms/info/Weekly';
import Theme from '~/components/cms/info/Theme';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export default {
  name: 'Info',
  components: {
    Sidebar,
    Annotation,
    Cover,
    Select,
    Weekly,
    Theme,
  },
  beforeDestroy() {
    if (this.canSyncState) {
      this.syncState();
    }
  },
  mounted() {
    if (this.$route.params.cms !== true) {
      this.$router.push({ path: '/cms/list' });
      this.canSyncState = false;
    } else {
      this.$store.dispatch('fetchCategoryList');
    }
  },
  data() {
    return {
      canSyncState: true,
      sourceList: this.$store.state.sourceList,
    };
  },
  computed: {
    annotation() {
      return this.$store.state.info.annotation;
    },
    expose() {
      return this.$store.state.info;
    },
    info() {
      return this.expose.mode === 0 ? this.weekly : this.theme;
    },
    common() {
      return {
        source: this.expose.source,
        dates: {
          create: this.$store.state.info.dates.create,
          update: this.$store.state.info.dates.update,
          public: this.$store.state.info.dates.public,
          from: this.$store.state.info.dates.from,
          to: this.$store.state.info.dates.to,
        },
        ownerID: this.expose.ownerID,
        workerID: this.expose.workerID,
        blocked: this.expose.blocked,
        _id: this.expose._id,
      };
    },
    weekly() {
      return {
        ...this.common,
        ...{
          mode: 0,
          title: this.sourceList[this.expose.source].weekly,
          phone: this.sourceList[this.expose.source].phone,
          email: this.sourceList[this.expose.source].email,
          image: '',
          annotation: '',
        },
      };
    },
    theme() {
      return {
        ...this.common,
        ...{
          mode: 1,
          title: this.expose.title.trim(),
          phone: this.expose.phone,
          email: this.expose.email,
          image: this.expose.image,
          annotation: this.expose.annotation,
          categories: this.expose.categories,
        },
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
      let date = {};
      if (this.expose.dates.from) {
        date.from = this.getDateFrom(this.expose.dates.from);
        date.to = this.getDateFrom(this.expose.dates.to);
      } else {
        date.from = this.getDateFrom(this.expose.dates.public);
        date.to = undefined;
      }
      return {
        nav: true,
        cms: true,
        date,
        title,
        image,
        source,
        prev: undefined,
        next: undefined,
      };
    },
  },
  methods: {
    syncState() {
      this.$store.dispatch('syncInfoState', this.info);
    },
    set(field, value) {
      this.$store.commit('info/set', { field, value });
    },
    setDate(field, value) {
      this.$store.commit('info/setDate', { field, value });
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
