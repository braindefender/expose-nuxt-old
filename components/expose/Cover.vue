<template>
  <div class="cover">
    <div class="cover__inner cover__image">
      <img :src="imageTag" alt>
    </div>
    <div class="cover__inner cover__content">
      <div class="cover__title">{{ options.title }}</div>
    </div>
    <div v-if="!options.fromcms" class="cover__inner cover__controls cover__controls--top">
      <div class="cover-control">
        <a v-if="!this.$route.params.fromcms" href="/" class="cover-control__return-link">Назад</a>
      </div>
    </div>
    <div class="cover__inner cover__controls">
      <div class="cover-control cover-control--center">
        <span class="cover-control__title">{{ todayDate }}</span>
        <span class="cover-control__info">{{ options.mode === 0 ? `\n` : sourceTag }}</span>
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
      months: this.$store.state.static.months,
      sl: this.$store.state.static.sourceList,
    };
  },
  computed: {
    dateMode() {
      let d = this.options.dates;
      let mode = d.from !== '' && d.to !== '';
      return mode;
    },
    todayDate() {
      if (this.dateMode) {
        return this.generateFullDate(
          this.getDateFrom(this.options.dates.from),
          this.getDateFrom(this.options.dates.to),
        );
      } else {
        if (this.options.dates.public) {
          return this.generateFullDate(
            this.getDateFrom(this.options.dates.public),
          );
        } else {
          return '\n';
        }
      }
    },
    imageTag() {
      if (this.options.mode === 0) {
        return this.sl[this.options.source].image;
      } else {
        return this.options.image || this.sl.image;
      }
    },
    sourceTag() {
      return this.sl[this.options.source].title;
    },
  },
  methods: {
    getDateFrom(input) {
      const date = new Date(input);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
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
      white-space: pre-wrap
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
      &--top
        top: 0
        bottom: auto
        align-items: center

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
      color: white
      border: none
      outline: none
      +tdn
      &:visited
        color: white
    &__title
      display: block
      font-size: 16px
      line-height: 20px
    &__info
      display: block
      font-size: 13px
      opacity: 0.6
    &__return-link
      +tdn
      transition: all ease 0.15s
      padding: 4px 16px
      color: white
      background: rgba(black, 0.5)
      border-radius: 5em
      border: 2px solid rgba(white, 0.5)
      font-size: 14px
      opacity: 0.6
      &:hover
        opacity: 0.8

  @media only screen and (max-width : 1280px)
    .cover
      &__title
        max-width: 600px
        font-size: 24px
        line-height: 28px

  @media only screen and (max-width : 992px)
    .cover
      &__title
        max-width: 500px
        font-size: 21px
        line-height: 25px
      &__controls
        padding: 20px

  @media only screen and (max-width : 768px)
    .cover
      &__title
        max-width: 500px
        font-size: 20px
        line-height: 24px


</style>
