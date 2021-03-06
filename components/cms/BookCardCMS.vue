<template>
  <div class="book-card" v-if="annotation || additional.cover">
    <image-blur :image="`${imageSrc}?_=${Date.now()}`" :meta="item.meta" :options="{ width: 125 }"/>
    <div class="book-card__content">
      <div
        :class="item.author
          ? 'book-card__author'
          : 'book-card__author book-card__author--gray'"
      >{{ author }}</div>
      <a :href="link" class="book-card__title">{{ item.title }}</a>
      <div class="book-card__info">{{ info }}</div>
      <div class="book-card__annotation">{{ additional.annotation || 'Информация отсутствует' }}</div>
    </div>
  </div>
  <div class="book-card book-card--small" v-else>
    <div class="book-card__line">
      <div
        :class="item.author
          ? 'book-card__author'
          : 'book-card__author book-card__author--gray'"
      >{{ author }}</div>
      <div class="book-card__info">{{ info }}</div>
    </div>
    <div class="book-card__line">
      <a :href="link" class="book-card__title book-card__title--small">{{ item.title }}</a>
    </div>
  </div>
</template>

<script>
import noCover from '~/assets/default/Article.svg';

import ImageBlur from '~/components/common/ImageBlur';

export default {
  name: 'BookCard',
  props: ['item'],
  components: { ImageBlur },
  watch: {
    'item.year'(oldVal, newVal) {
      this.year = newVal;
      this.info = this.getInfo();
    },
    'item.source'(oldVal, newVal) {
      this.source = newVal;
      this.info = this.getInfo();
    },
    'item.pages'(oldVal, newVal) {
      this.pages = newVal;
      this.info = this.getInfo();
    },
  },
  data() {
    return {
      source: this.item.source || '',
      year: this.item.year || '',
      pages: this.item.pages ? `${this.item.pages} с.` : '',
      author: this.item.author || 'Автор не указан',
      info: this.getInfo(),
      additional: {},
      imageSrc: '',
    };
  },
  mounted() {
    if (this.$route.params.fromcms !== undefined) {
      this.$axios
        .$get('cms/book', {
          params: { irbis: this.item.irbis },
        })
        .then(res => {
          console.log('tada');
          console.log(res);
          this.additional = { ...this.item, ...res[0] };
          if (this.additional.hasCover) {
            this.getImage();
          }
        });
    } else {
    }
  },
  computed: {
    meta() {
      return `${this.author} — ${this.item.title}, ${this.source}, ${
        this.year
      }`;
    },
    cover() {
      return this.additional.cover ? this.item.cover : noCover;
    },
    exposeCreate() {
      return this.$store.state.real.info.dates.create;
    },
    annotation() {
      if (this.item.annotation) {
        if (this.item.annotation.length > 260) {
          return `${this.item.annotation.slice(1, 248)}... Читать далее`;
        } else {
          return this.item.annotation;
        }
      } else {
        return undefined;
      }
    },
    link() {
      if (!this.$route.params.fromcms) {
        const name = this.$store.state.real.info.title
          .split('\n')
          .join('~')
          .split(' ')
          .join('_');
        const title = this.item.title.split(' ').join('_');
        return `/expose/${name}-${this.exposeCreate}/book/${title}`;
      } else {
        return '#';
      }
    },
  },
  methods: {
    getImage() {
      let img = new Image();
      let self = this;
      img.onload = function() {
        self.imageSrc = self.additional.cover || self.cover;
      };
      img.src = this.item.cover;
    },
    getInfo() {
      return [
        this.item.source || '',
        this.item.year || '',
        this.item.pages ? `${this.item.pages} с.` : '',
      ]
        .filter(el => el !== '')
        .join(', ');
    },
  },
};
</script>

<style lang="sass" scoped>

  @import '@/styles/vars.sass'
  @import '@/styles/mixins.sass'

  .book-card
    padding: 15px
    border-radius: 5px
    overflow: hidden
    display: flex
    flex-direction: row
    background-color: white
    box-shadow: 0px 5px 10px rgba(black, 0.1)
    margin-bottom: 10px
    transition: all ease 0.25s
    &:hover
      box-shadow: 0px 5px 20px rgba(black, 0.15)
    &:last-child
      margin-bottom: 0
    &--small
      display: flex
      flex-direction: column
      padding-top: 10px
      padding-bottom: 10px
      cursor: pointer
      &__info
        color: rgba(black, 0.6)
        font-size: 14px
    &__content
      flex-grow: 1
      padding-top: 5px
      padding-bottom: 5px
      margin-left: 10px
    &__line
      display: flex
      flex-direction: row
      justify-content: space-between
    &__image
      margin-right: 15px
      flex-grow: 0
      flex-shrink: 0
      flex-basis: 125px
      width: 125px
      background-color: #333
      border-radius: 5px
      overflow: hidden
      img
        width: 100%
        // object-fit: cover
    &__author
      font-size: 14px
      line-height: 20px
      color: $color-accent
      max-width: 560px
      &--gray
        color: rgba(black, 0.4)
    &__title
      font-weight: bold
      line-height: 20px
      max-width: 560px
      margin-bottom: 5px
      cursor: pointer
      color: black
      position: relative
      display: block
      +tdn
      transition: all ease-in-out 0.1s
      &:hover
        color: $color-accent
      &:visited
        color: black
      &--small
        font-size: 15px
        margin: 0
    &__info
      max-width: 560px
      color: rgba(black, 0.6)
      font-size: 14px
      margin-bottom: 5px
    &__annotation
      display: flex
      overflow: hidden
      max-width: 480px
      font-size: 14px
      line-height: 18px
      color: rgba(black, 0.6)
      white-space: pre-wrap

</style>
