<template>
  <div class="book-page">
    <div class="book-page__return">
      <div class="book-page__return-image">
        <img :src="returnImage" alt>
      </div>
      <a
        :href="`/expose/${book.expose.link}`"
        class="book-page__return-link"
      >{{ book.expose.title }}</a>
    </div>
    <div class="book-page__wrapper">
      <div class="book-page__side">
        <div v-if="book.cover" class="book-image">
          <div class="book-image__blur">
            <div class="book-image__blur-container">
              <img :src="book.cover" :alt="meta">
            </div>
          </div>
          <div class="book-image__image">
            <img :src="book.cover" :alt="meta">
          </div>
        </div>
        <div v-else class="book-ph">
          <div class="book-ph__author">{{ authors.split(',')[0] }}</div>
          <div class="book-ph__title">{{ book.title }}</div>
          <div class="book-ph__info">{{ sourceAndYear }}</div>
        </div>
        <div class="book-page__button">
          <a :href="irbisLink" class="button">Перейти в каталог</a>
        </div>
        <div v-if="book.link" class="book-page__button">
          <a :href="book.link" class="button">Ссылка на полный текст</a>
        </div>
      </div>
      <div class="book-page__content">
        <div class="book-page__authors">{{ authors }}</div>
        <div class="book-page__title">{{ book.title }}</div>
        <div class="book-page__source">{{ sourceAndYear }}</div>
        <div class="book-page__annotation">{{ book.annotation }}</div>
        <div v-if="book.info !== 0" class="book-page__info">
          <div v-for="(item, index) in book.info" :key="index" class="book-page__info-line">
            <div class="book-page__info-cell bold">{{ item.name }}</div>
            <div class="book-page__info-cell">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="book.images !== 0" class="book-page__images">
      <image-blur
        v-for="(image, index) in book.images"
        :key="index"
        :image="image"
        :meta="`${meta}-${index}`"
        :options="{ width: 125 }"
      />
    </div>
    <div class="book-contents" v-if="book.contents">
      <div class="book-contents__title">Содержание</div>
      <div class="book-contents__text">{{ book.contents }}</div>
    </div>
  </div>
</template>

<script>
import image from '@/assets/covers/public01032012112432_b.jpg';
import image1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

import ImageBlur from '@/components/common/ImageBlur';

export default {
  name: 'BookPage',
  props: ['book'],
  components: { ImageBlur },
  data() {
    return {
      image,
      image1,
    };
  },
  computed: {
    sourceCity() {
      if (this.book.source) {
        const lowerSource = this.book.source.toLowerCase();
        const bsm = this.$store.state.static.bookSourceMap;
        return bsm[lowerSource] || this.book.source;
      } else {
        return undefined;
      }
    },
    sourceAndYear() {
      return [this.sourceCity, this.book.year]
        .filter(el => el !== undefined)
        .join(', ');
    },
    meta() {
      return `${this.book.author} — ${this.book.title}, ${this.book.source}, ${
        this.book.year
      }`;
    },
    authors() {
      if (this.book.authors) {
        return this.book.authors.join(', ');
      } else {
        return this.book.author;
      }
    },
    irbisLink() {
      if (this.book.irbis) {
        return (
          'http://webirbis.spsl.nsc.ru/irbis64r_01/cgi/cgiirbis_64.exe' +
          '?Z21ID=&I21DBN=CAT&P21DBN=CAT&S21STN=1&S21REF=3&S21FMT=fullwebr&C21COM=S&S21CNR=20&S21P01=0&S21P02=1&S21P03=I=&S21STR=' +
          this.book.irbis.replace(/\*/g, '%2A').replace(/\//g, '%2F')
        );
      } else {
        return undefined;
      }
    },
    returnImage() {
      if (this.book.expose) {
        if (this.book.expose.source !== undefined) {
          return this.book.expose.cover !== ''
            ? this.book.expose.cover
            : this.$store.state.static.sourceList[this.book.expose.source]
                .image;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'

  .book-page
    box-sizing: border-box
    color: black
    width: 890px
    padding-left: 60px
    padding-right: 60px
    padding-top: 30px
    padding-bottom: 30px
    margin: 0 auto
    &__button
      margin-bottom: 20px
      &:last-child
        margin-bottom: 0
    &__return
      max-width: 770px
      margin-bottom: 30px
      position: relative
      z-index: 5
      border-radius: 5px
      overflow: hidden
      &::after
        +posa(0)
        content: ''
        background-color: rgba(black, 0.4)
    &__return-image
      +posa(0)
      display: flex
      align-items: center
      img
        width: 100%
        // animation: slide 20s alternate infinite ease-in-out
    &__return-link
      +tdn
      position: relative
      z-index: 10
      display: flex
      align-items: center
      height: 60px
      padding-left: 50px
      color: white
      &::after
        +posa(0)
        left: 20px
        right: auto
        width: 15px
        content: ''
        background: url('~/assets/icon-chevron-left.svg') center center no-repeat
    &__wrapper
      display: flex
      flex-direction: row
    &__side
      width: 240px
      margin-right: 30px
      .book-image
        margin-bottom: 30px
    &__content
      width: 500px
      padding-top: 20px
    &__authors
      font-size: 16px
      line-height: 20px
      margin-bottom: 10px
    &__title
      font-size: 20px
      line-height: 22px
      margin-bottom: 16px
      font-weight: bold
    &__source
      font-size: 16px
      line-height: 20px
      margin-bottom: 16px
    &__annotation
      font-size: 14px
      line-height: 18px
      font-style: italic
      text-align: justify
      margin-bottom: 20px
      opacity: 0.8
      white-space: pre-wrap
    &__info
      margin-bottom: 30px
      background: rgba(black, 0.05)
      border-radius: 5px
      padding: 15px
    &__info-line
      display: flex
      flex-direction: row
      justify-content: space-between
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
    &__info-cell
      font-size: 14px
      line-height: 16px
      max-width: 250px
      &:first-child
        text-align: left
      &:last-child
        text-align: right
    &__images
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      min-height: 50px
      margin-bottom: 30px
      padding-top: 30px

  .book-contents
    text-align: center
    &__title
      text-align: center
      margin-bottom: 30px
      font-size: 18px
      font-weight: bold
    &__text
      padding: 36px
      background-color: #f2f2f2
      border-radius: 5px
      font-size: 13px
      line-height: 15px
      font-family: 'PT Mono'
      text-align: justify
      display: inline-block

  .book-ph
    width: 100%
    height: 350px
    background: white
    margin-bottom: 30px
    border-radius: 5px
    display: flex
    align-items: center
    flex-direction: column
    justify-content: space-between
    padding: 40px 20px
    font-size: 12px
    color: black
    box-shadow: 0 5px 25px rgba(black, 0.10)
    &__title
      font-weight: bold
      text-align: center
      font-size: 12px

</style>
