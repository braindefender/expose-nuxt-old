<template>
  <div class="bc">
    <div class="bc__wrapper">
      <a
        v-if="this.item.annotation || this.item.cover || this.item.hasCover"
        class="bc__card"
        :href="link"
        @click.prevent="openPopup"
      >
        <div class="bc__image">
          <img :src="`${imageSrc}?_=${Date.now()}`" :alt="item.meta">
        </div>
        <div class="bc__content">
          <div
            :class="item.author
                ? 'bc__author'
                : 'bc__author bc__author--gray'"
          >{{ author }}</div>
          <div class="bc__title">{{ item.title }}</div>
          <div class="bc__info">{{ info }}</div>
          <div class="bc__annotation">{{ annotation }}</div>
        </div>
      </a>
      <a v-else class="bc__card bc__card--small">
        <div class="bc__line">
          <div
            :class="item.author
              ? 'bc__author'
              : 'bc__author bc__author--gray'"
          >{{ author }}</div>
          <div class="bc__info">{{ info }}</div>
        </div>
        <div class="bc__line">
          <a :href="link" class="bc__title bc__title--small">{{ item.title }}</a>
        </div>
      </a>
    </div>
    <div v-if="opened" class="bc__popup-wrapper">
      <div class="bc__popup-bg" @click="closePopup"></div>
      <div class="bc__popup">
        <book-popup :book="book" @close="closePopup"/>
      </div>
    </div>
  </div>
</template>

<script>
import noCover from '~/assets/default/Article.svg';

import ImageBlur from '~/components/common/ImageBlur';
import BookPopup from '~/components/expose/BookPopup';

export default {
  name: 'BookCard',
  props: ['item'],
  components: { ImageBlur, BookPopup },
  data() {
    return {
      source: this.item.source || '',
      imageSrc: '',
      cover: this.item.cover,
      opened: false,
      book: null,
    };
  },
  mounted() {
    if (this.$route.params.fromcms !== undefined) {
      this.$axios
        .$get('cms/book', {
          params: { irbis: this.item.irbis },
        })
        .then(res => {
          // console.log('tada');
          // console.log(res);
          // this.additional = { ...this.item, ...res[0] };
          this.cover = res[0].cover;
          this.getImage();
        });
    } else {
      this.imageSrc = this.cover;
    }
  },
  computed: {
    annotation() {
      let a = this.item.annotation;
      if (a !== '' && a !== undefined) {
        if (a.length > 260) {
          return `${a.slice(0, 250)}...`;
        } else {
          return a;
        }
      } else {
        return '';
      }
    },
    author() {
      return this.item.author || 'Автор не указан';
    },
    meta() {
      return `${this.author} — ${this.item.title}, ${this.item.source}, ${
        this.item.year
      }`;
    },
    link() {
      if (!this.$route.params.fromcms) {
        // const title = this.item.title.split(' ').join('_');
        const title = this.item.webirbis;
        return `${this.$route.path}/book/${title}`;
      } else {
        return '#';
      }
    },
    info() {
      return [
        this.item.source || '',
        this.item.year || '',
        this.item.pages ? `${this.item.pages} стр.` : '',
      ]
        .filter(el => el !== '')
        .join(', ');
    },
  },
  methods: {
    openPopup() {
      this.$axios.get(this.link).then(res => {
        this.book = res.data;
        this.opened = true;
      });
    },
    closePopup() {
      this.opened = false;
    },
    getImage() {
      let img = new Image();
      let self = this;
      img.onload = function() {
        self.imageSrc = self.cover;
      };
      img.src = this.cover;
    },
  },
};
</script>

<style lang="sass" scoped>

  @import '@/styles/vars.sass'
  @import '@/styles/mixins.sass'

  .bc
    &__wrapper

    &__card
      text-decoration: none
      padding: 15px
      border-radius: 5px
      overflow: hidden
      display: grid
      grid-column-gap: 10px
      grid-template-columns: 125px 1fr
      grid-template-rows: min-content
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
      font-size: 0
      align-self: start
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

    &__popup-wrapper
      +posa(0)
      position: fixed
      z-index: 5000
      display: flex
      align-items: center
      justify-content: center
      background-color: rgba(black, 0.8)

    &__popup-bg
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: 5001

    &__popup
      z-index: 5002

</style>
