<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <div class="ec">

        <transition name="slide-fade">
          <div class="ec__box ec__theme" v-if="expose.mode == 0">
            <div class="ec__column">

              <div class="ec__item">
                <div class="ec__title">
                  Тип выставки:
                </div>
                <div class="ec__toggle">
                  <Select
                    :list="this.$store.state.modeList"
                    :check="expose.mode"
                    :call="setMode">
                  </Select>
                </div>
              </div>

            </div>

            <div class="ec__column">

              <div class="ec__item">
                <div class="ec__title">
                  Место проведения:
                </div>
                <div class="ec__toggle">
                  <Select
                    :list="sourceList"
                    :check="expose.source"
                    :call="setSource">
                  </Select>
                </div>
              </div>
            </div>

            <div class="ec__column">
              <div class="ec__item">
                <div class="ec__title">
                  Даты проведения:
                </div>
                <div class="ec__date-picker">
                  <span>от</span>
                  <input
                    @change="dateFrom = $event.target.value"
                    :value="dateFrom"
                    type="date"
                    name="date-starts"
                    max="9999-12-31">
                  <span>до</span>
                  <input
                    @change="dateTo = $event.target.value"
                    :value="dateTo"
                    type="date"
                    name="date-ends"
                    max="9999-12-31">
                </div>
              </div>
            </div>

          </div>

          <div class="ec__box ec__theme" v-if="expose.mode == 1">
            <div class="ec__column">

              <div class="ec__item">
                <div class="ec__title">Тип выставки:</div>
                <div class="ec__toggle">
                  <Select
                    :list="this.$store.state.modeList"
                    :check="expose.mode"
                    :call="setMode">
                  </Select>
                </div>
              </div>

              <div class="ec__item">
                <div class="ec__title">
                  Название:
                </div>

                <textarea
                  class="ec__textarea ec__textarea--bold ec__textarea--title"
                  name="title"
                  cols="30"
                  rows="1"
                  placeholder="Измените название выставки"
                  v-model="expose.title"
                  v-autosize="expose.title">
                </textarea>

              </div>

              <div class="ec__item">
                <div class="ec__title">
                  Обложка:
                </div>
                <div class="ec__loader">

                  <picture-input
                    ref="piCover"
                    width="172"
                    height="36"
                    accept="image/jpeg,image/jpg,image/png"
                    size="2"
                    button-class="button"
                    :zIndex=200
                    :plain="true"
                    :hideChangeButton="true"
                    @change="onPICoverChange">
                  </picture-input>

                  <p class="ec__loader-comment">
                    Рекомендуемое разрешение
                    <br>
                    не менее 1150x320px
                  </p>
                </div>
              </div>

            </div>

            <div class="ec__column">

              <div class="ec__item">
                <div class="ec__title">Место проведения:</div>
                <div class="ec__toggle">
                  <Select
                    :list="sourceList"
                    :check="expose.source"
                    :call="setSource">
                  </Select>
                </div>
              </div>

              <div class="ec__item">
                <div class="ec__title">
                  Даты проведения:
                </div>
                <div class="ec__date-picker">
                  <span>от</span>
                  <input
                    @change="dateFrom = $event.target.value"
                    :value="dateFrom"
                    type="date"
                    name="date-starts"
                    max="2099-12-31">
                  <span>до</span>
                  <input
                    @change="dateTo = $event.target.value"
                    :value="dateTo"
                    type="date"
                    name="date-ends"
                    max="2099-12-31">
                </div>
              </div>

              <div class="ec__item">
                <div class="ec__title">
                  Email:
                </div>
                <input
                  v-model="expose.email"
                  type="email"
                  name="email"
                  class="ec__input"
                  placeholder="Не указан">
              </div>

              <div class="ec__item">
                <div class="ec__title">
                  Телефон:
                </div>
                <input
                  v-model="expose.phone"
                  type="tel"
                  name="phone"
                  class="ec__input"
                  placeholder="+7 (999) 999 9999"
                  v-mask="'\+7\ (###) ###-####'"/>
              </div>

            </div>

            <div class="ec__column">

              <div class="ec__item">
                <div class="ec__title">
                  Описание:
                </div>

                  <textarea
                    class="ec__textarea ec__textarea--description"
                    name="description"
                    cols="30"
                    rows="1"
                    placeholder="Измените описание выставки"
                    v-model="expose.annotation"
                    v-autosize="expose.annotation">
                  </textarea>

              </div>

            </div>

          </div>
        </transition>

        <Cover :options="options"></Cover>

        <Annotation
          v-if="expose.mode != 0"
          :text="expose.annotation">
        </Annotation>

      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';

import Annotation from '@/components/expose/Annotation';
import Cover from '@/components/expose/Cover';
import Select from '@/components/cms/Select';
import Navigation from '@/components/cms/Navigation';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export default {
  name: 'Info',
  components: {
    Annotation,
    Cover,
    Select,
    Navigation,
  },
  directives: { mask },
  beforeDestroy() {
    this.syncState();
  },
  mounted() {
    this.fetchState();
  },
  data() {
    return {
      file: '',
      sourceList: this.$store.state.sourceList,
      dateFrom: this.dateYYYYMMDD(new Date()),
      dateTo: this.dateYYYYMMDD(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)),
      expose: this.$store.state.expose,
    };
  },
  computed: {
    title() {
      return this.expose.mode === 0
        ? this.sourceList[this.expose.source].weekly
        : this.expose.title;
    },
    phone() {
      return this.expose.mode === 0
        ? this.sourceList[this.expose.source].phone
        : this.expose.phone;
    },
    email() {
      return this.expose.mode === 0
        ? this.sourceList[this.expose.source].email
        : this.expose.email;
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
      return {
        nav: true,
        title: this.expose.title,
        image,
        source,
        date: {
          from: this.date(this.dateFrom),
          to: this.date(this.dateTo),
        },
        prev: {
          date: {
            from: {
              day: 5,
              month: 7,
              year: 2017,
            },
            to: {
              day: 24,
              month: 8,
              year: 2017,
            },
          },
        },
        next: undefined,
      };
    },
    exposeState() {
      const expose = {
        dates: {
          from: this.dateFrom,
          to: this.dateTo,
        },
      };
      if (this.expose.mode === 1) {
        expose.image = this.expose.image;
        expose.annotation = this.expose.annotation;
      }
      return { ...this.expose, ...expose };
    },
  },
  methods: {
    fetchState() {
      this.$store.dispatch('fetchInfoState').then(res => {
        this.expose = this.$store.state.expose;
      });
    },
    syncState() {
      this.$store.dispatch('syncInfoState', this.exposeState);
    },
    onPICoverChange(image) {
      if (image) {
        console.log('Picture loaded.');
        this.expose.image = image;
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
    date(input) {
      const date = new Date(input);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    },
    dateYYYYMMDD(date) {
      return date.toISOString().split('T')[0];
    },
    setMode(index) {
      this.expose.mode = index;
    },
    setSource(index) {
      this.expose.source = index;
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
