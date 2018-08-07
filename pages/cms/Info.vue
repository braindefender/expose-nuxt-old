<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <div class="ec">

        <transition name="slide-fade">
          <div class="ec__box ec__theme" v-if="mode == 0">
            <div class="ec__column">

              <div class="ec__item">
                <div class="ec__title">
                  Тип выставки:
                </div>
                <div class="ec__toggle">
                  <Select
                    :list="modeList"
                    :check="mode"
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
                    :check="source"
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

          <div class="ec__box ec__theme" v-if="mode == 1">
            <div class="ec__column">

              <div class="ec__item">
                <div class="ec__title">Тип выставки:</div>
                <div class="ec__toggle">
                  <Select
                    :list="modeList"
                    :check="mode"
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
                  v-model="customTitle"
                  v-autosize="customTitle">
                </textarea>

              </div>

              <div class="ec__item">
                <div class="ec__title">
                  Обложка:
                </div>
                <div class="ec__loader">
                  <button class="button">Загрузить обложку</button>
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
                    :check="source"
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
                  v-model="customEmail"
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
                  v-model="customPhone"
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
                    v-model="annotation"
                    v-autosize="annotation">
                  </textarea>

              </div>

            </div>

          </div>
        </transition>

        <Cover :options="options"></Cover>

        <Annotation
          v-if="mode != 0"
          :text="annotation">
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
  data() {
    return {
      modeList: [
        {
          index: 0,
          mode: 'weekly',
          title: 'Еженедельная выставка',
        },
        {
          index: 1,
          mode: 'theme',
          title: 'Тематическая выставка',
        },
      ],
      sourceList: [
        {
          index: 0,
          title: 'ГПНТБ СО РАН',
          weekly: `Еженедельная выставка новых поступлений\nГПНТБ СО РАН`,
          image: weekly0,
        },
        {
          index: 1,
          title: 'Отделение ГПНТБ СО РАН',
          weekly: `Еженедельная выставка новых поступлений\nотделения ГПНТБ СО РАН`,
          image: weekly1,
        },
      ],
      mode: 0,
      source: 0,
      customTitle: 'Измените название выставки',
      annotation: 'Измените описание выставки',
      dateFrom: this.dateYYYYMMDD(new Date()),
      dateTo: this.dateYYYYMMDD(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)),
      customImage: weekly0,
      customEmail: '',
      customPhone: '',
      author: 'Автор выставки',
    };
  },
  computed: {
    title() {
      return this.mode === 0
        ? this.sourceList[this.source].weekly
        : this.customTitle;
    },
    phone() {
      return this.mode === 0
        ? this.sourceList[this.source].phone
        : this.customPhone;
    },
    email() {
      return this.mode === 0
        ? this.sourceList[this.source].email
        : this.customEmail;
    },
    currentDate() {
      return this.date(Date.now());
    },
    options() {
      const source =
        this.mode === 0 ? `\n` : this.sourceList[this.source].title;
      const image =
        this.mode !== 0 ? this.customImage : this.sourceList[this.source].image;
      return {
        nav: true,
        title: this.title,
        image,
        source,
        date: {
          from: this.date(this.dateFrom),
          to: this.date(this.dateTo),
        },
        next: {
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
        prev: undefined,
      };
    },
  },
  methods: {
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
      this.mode = index;
    },
    setSource(index) {
      this.source = index;
    },
    submitData() {
      const data = {
        mode: this.mode,
        source: this.source,
        title: this.title,
        dates: {
          from: this.dateFrom,
          to: this.dateTo,
        },
        email: this.email,
        phone: this.phone,
        author: this.author,
      };
      if (this.mode === 1) {
        data.image = this.customImage;
        data.annotation = this.annotation;
      }
      this.$parent.$emit('submitData', data);
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'

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

</style>
