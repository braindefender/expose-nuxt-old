<template>
  <div class="cover">
    <div class="cover__inner cover__image">
      <img :src="options.image" alt="">
    </div>
    <div class="cover__inner cover__content">
      <div class="cover__title">{{ options.title }}</div>
    </div>
    <div class="cover__inner cover__controls">
      <div
        v-if="options.nav"
        class="cover-control cover-control--left"
        :class="options.prev ? '' : 'cover-control--disabled'">
        <a href="#" class="cover-control__link">
          <span class="cover-control__title">Предыдущая неделя</span>
          <span class="cover-control__info">{{ prevDate }}</span>
        </a>
      </div>
      <div class="cover-control cover-control--center">
        <span class="cover-control__title">{{ todayDate }}</span>
        <span class="cover-control__info">{{ options.source }}</span>
      </div>
      <div
        v-if="options.nav"
        class="cover-control cover-control--right"
        :class="options.next ? '' : 'cover-control--disabled'">
        <a href="#" class="cover-control__link">
          <span class="cover-control__title">Следующая неделя</span>
          <span class="cover-control__info">{{ nextDate }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cover',
  props: ['options'],
  data() {
    return {
      months: this.$store.state.months,
    };
  },
  computed: {
    prevDate() {
      if (this.options.prev) {
        return this.generateDate(
          this.options.prev.date.from,
          this.options.prev.date.to,
        );
      }
      return `\n`;
    },
    nextDate() {
      if (this.options.next) {
        return this.generateDate(
          this.options.next.date.from,
          this.options.next.date.to,
        );
      }
      return `\n`;
    },
    todayDate() {
      if (this.options.date) {
        return this.generateFullDate(
          this.options.date.from,
          this.options.date.to,
        );
      } else {
        return '\n';
      }
    },
  },
  methods: {
    generateDate(from, to) {
      if (to) {
        return `с ${from.day} ${this.months[from.month]} по ${to.day} ${
          this.months[to.month]
        }`;
      } else {
        return `от ${from.day} ${this.months[from.month]}, ${from.year}`;
      }
    },
    generateFullDate(from, to) {
      if (to) {
        return `с ${from.day} ${this.months[from.month]} по ${to.day} ${
          this.months[to.month]
        } ${to.year}`;
      } else {
        return `от ${from.day} ${this.months[from.month]}, ${from.year}`;
      }
    },
  },
};
</script>

<style lang="sass">

  @import '~/styles/mixins.sass'

  .cover

    width: 100%
    // height: 320px
    padding-top: 27.826%
    position: relative
    color: white
    background-color: #333
    &__inner
      +posa(0)
      pointer-events: none
    &__content
      display: flex
      justify-content: center
      align-items: center
      pointer-events: auto
    &__title
      text-align: center
      max-width: 680px
      font-size: 24px
      line-height: 30px
      white-space: pre
    &__image
      display: flex
      justify-content: center
      align-items: center
      overflow: hidden
      &::after
        content: ''
        +posa(0)
        background-color: rgba(black, 0.4)
      img
        width: 100%
    &__controls
      top: auto
      padding: 30px
      display: flex
      align-items: flex-start
      flex-direction: row
      justify-content: space-between

  .cover-control
    position: relative
    transition: all ease 0.3s
    pointer-events: auto
    &--disabled
      pointer-events: none
      opacity: 0.2
    &--left
      width: 200px
      left: 0
      text-align: left
      &:hover
        left: 10px
    &--right
      width: 200px
      text-align: right
      right: 0
      &:hover
        right: 10px
    &--center
      flex-grow: 1
      text-align: center
    &__link
      text-decoration: none
      color: white
      border: none
      outline: none
      &:hover
        text-decoration: none
    &__title
      display: block
      font-size: 16px
      line-height: 20px
    &__info
      display: block
      font-size: 13px
      opacity: 0.6
</style>
