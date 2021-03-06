<template>
  <div class="book-popup">
    <div class="book-popup__aside">
      <div v-if="book.cover" class="book-popup__cover">
        <img :src="full(book.cover)">
      </div>
      <div v-else class="book-popup__cover book-popup__cover--placeholder">
        <div class="book-popup__cover-authors">{{ authors }}</div>
        <div class="book-popup__cover-title">{{ book.title }}</div>
        <div class="book-popup__cover-source">{{ source }}</div>
        <div class="book-popup__cover-year">{{ book.year }}</div>
      </div>
      <div class="book-popup__links">
        <a
          class="book-popup__link"
          :href="book.basePath"
          target="_blank"
          rel="noopener noreferrer"
        >Перейти в каталог</a>
        <a v-if="book.link" class="book-popup__link" :href="book.link">Полный текст</a>
        <a v-if="book.contents" class="book-popup__link" :href="contentsLink">Содержание</a>
        <a
          v-for="(item, index) in book.extLink"
          :key="index"
          :href="item.link"
          class="book-popup__link"
        >{{ item.title }}</a>
      </div>
    </div>
    <div class="book-popup__content">
      <div v-if="!opened" class="book-popup__controls">
        <a
          class="book-popup__badge book-popup__badge--link"
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
        >Открыть в новом окне</a>
        <button
          type="button"
          class="book-popup__circle-button book-popup__circle-button--close"
          @click="closePopup"
        ></button>
      </div>
      <div class="book-popup__title">{{ book.title }}</div>
      <div class="book-popup__authors">{{ authors }}</div>
      <div class="book-popup__badges">
        <div v-if="source" class="book-popup__badge">
          Издательство:&nbsp;
          <span>{{ source }}</span>
        </div>
        <div v-if="book.year" class="book-popup__badge">
          Год:&nbsp;
          <span>{{ book.year }}</span>
        </div>
        <div v-if="book.pages" class="book-popup__badge">
          Страниц:&nbsp;
          <span>{{ book.pages }}</span>
        </div>
      </div>
      <div v-if="book.annotation" class="book-popup__annotation">{{ book.annotation }}</div>
      <div class="book-popup__additional">
        <div v-if="hasInfo" class="book-popup__info">
          <div class="book-popup__info-heading">Дополнительная информация</div>
          <ul class="book-popup__info-list">
            <li v-for="(item, index) in book.info" :key="index" class="book-popup__info-line">
              <div class="book-popup__info-name">{{ item.name }}</div>
              <div v-if="checkIsArray(item.value)" class="book-popup__info-value">
                <span
                  v-for="(field, key) in item.value"
                  :key="key"
                >{{ field + (key != item.value.length - 1 ? ', ' : '') }}</span>
              </div>
              <div v-else class="book-popup__info-value">{{ item.value }}</div>
            </li>
          </ul>
        </div>
        <div v-else class="book-popup__info">
          <div class="book-popup__info-heading">Дополнительная информация отсутствует</div>
        </div>
        <div v-if="hasImages" class="book-popup__images">
          <div class="book-popup__images-heading">Дополнительные изображения</div>
          <ul class="book-popup__images-list">
            <li v-for="(item, index) in book.images" :key="index" class="book-popup__image">
              <img
                :src="item"
                v-img:group="{
                  src: `${full(item)}`,
                  thumbnails: true,
                }"
              >
            </li>
          </ul>
        </div>
        <div v-else class="book-popup__images">
          <div class="book-popup__images-heading">Дополнительные изображения отсутствуют</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookPopup',
  props: {
    book: {
      type: Object,
      required: true,
    },
    opened: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    hasInfo() {
      return this.book.info != undefined && this.book.info.length != 0;
    },
    hasImages() {
      return this.book.images != undefined && this.book.images.length != 0;
    },
    contentsLink() {
      const exposeRoute = this.$route.path.split('/');
      const webirbis = this.book.webirbis;
      return `/${exposeRoute[1]}/${exposeRoute[2]}/contents/${webirbis}`;
    },
    link() {
      const webirbis = this.book.webirbis;
      return `${this.$route.path}/book/${webirbis}`;
    },
    authors() {
      return this.book.authors.join(', ');
    },
    source() {
      if (this.book.source) {
        const lowerSource = this.book.source.toLowerCase();
        const bsm = this.$store.state.static.bookSourceMap;
        return bsm[lowerSource] || this.book.source;
      } else {
        return undefined;
      }
    },
  },
  methods: {
    checkIsArray(arg) {
      return Array.isArray(arg);
    },
    full(path) {
      let pos = path.indexOf('/books');
      return path.substr(0, pos + 7) + 'full_' + path.substr(pos + 7);
    },
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="sass">
  @import '~/styles/vars.sass'
  @import '~/styles/mixins.sass'

  .book-popup
    width: 1024px
    display: grid
    grid-column-gap: 30px
    grid-template-rows: 1fr
    grid-template-columns: 320px 1fr
    border-radius: 10px
    background-color: white
    padding: 20px

    &__aside
      display: grid
      grid-template-rows: min-content auto
      grid-row-gap: 20px

    &__cover
      max-width: 320px
      border-radius: 5px
      overflow: hidden
      font-size: 0
      img
        width: 100%
      &--placeholder
        font-size: 13px
        text-align: center
        display: flex
        flex-direction: column
        justify-content: space-between
        height: 440px
        padding: 30px
        background-color: rgba(black, 0.03)
        border: 1px solid rgba(black, 0.1)

    &__cover-title
      font-size: 15px

    &__content
      display: grid
      grid-row-gap: 10px
      grid-template-rows: repeat(5, min-content)
      grid-auto-rows: min-content

    &__controls
      font-size: 0
      display: flex
      justify-content: space-between

    &__badges
      display: flex
      align-items: flex-start

    &__badge
      +tdn
      border: none
      outline: none
      display: flex
      align-items: flex-start
      justify-content: center
      position: relative
      font-size: 13px
      padding-top: 4px
      padding-bottom: 4px
      padding-left: 10px
      padding-right: 10px
      border-radius: 12px
      background-color: rgba(black, 0.05)
      color: rgba(black, 0.6)
      margin-right: 10px
      overflow: hidden
      max-width: 480px
      &:last-child
        margin-right: 0
      span
        color: $color-accent
      &--link
        color: $color-accent
        cursor: pointer
        &:hover
          background-color: rgba(black, 0.1)
        &:active
          &::after
            top: 0
            bottom: 0
        &:focus
          &::after
            top: 0
            bottom: 0
        &::after
          +posa(0)
          content: ''
          border-radius: inherit
          background-color: rgba($color-accent, 0.25)
          transition: all ease-in 0.2s
          top: 32px
          bottom: -32px

    &__circle-button
      +button
      height: 24px
      width: 24px
      background-color: rgba(black, 0.05)
      border-radius: 50%
      &:hover
        background-color: rgba(black, 0.1)
      &:active
        background-color: rgba(black, 0.15)

      &--close
        &::before, &::after
          position: absolute
          content: ''
          width: 10px
          height: 2px
          background-color: $color-accent
          border-radius: 5em
        &::before
          transform: rotate(45deg)
        &::after
          transform: rotate(-45deg)

    &__title
      font-size: 20px
      line-height: 22px
      width: 90%
      padding-top: 20px

    &__authors
      font-size: 14px
      color: rgba(black, 0.6)

    &__annotation
      font-size: 14px
      line-height: 19px
      font-style: italic
      text-align: justify
      padding-right: 10px
      color: rgba(black, 0.8)
      padding-top: 6px
      padding-bottom: 6px
      white-space: pre-wrap
      max-height: 160px
      overflow-y: scroll
      overflow-x: hidden

    &__additional
      display: grid
      grid-template-columns: 1fr 1fr
      grid-column-gap: 20px

    &__info, &__images
      font-size: 13px
      background-color: rgba(black, 0.03)
      border-radius: 5px
      align-self: start

    &__info-heading, &__images-heading
      display: flex
      align-items: center
      height: 32px
      font-size: 14px
      padding: 0 10px
      border-radius: 5px
      background-color: rgba(black, 0.05)

    &__info-list
      margin: 0
      padding: 10px
      list-style-type: none

    &__info-line
      color: rgba(black, 0.8)
      display: flex
      justify-content: space-between
      line-height: 15px
      margin-bottom: 4px
      &:last-child
        margin-bottom: 0

    &__info-value
      text-align: right

    &__images-list
      margin: 0
      padding: 10px
      list-style-type: none
      display: grid
      grid-template-columns: repeat(4, 1fr)
      grid-auto-rows: auto
      grid-gap: 10px

    &__image
      font-size: 0
      border-radius: 5px
      overflow: hidden
      display: flex
      justify-content: center
      align-items: center
      border: 1px solid rgba(black, 0.1)
      height: 90px
      img
        height: 100%
        width: 100%

    &__links
      display: grid
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))
      grid-auto-rows: min-content
      grid-gap: 15px 15px

    &__link
      +button
      height: 32px
      border-radius: 5px
      font-size: 13px
      background-color: rgba(black, 0.05)
      color: $color-accent
      padding-left: 15px
      padding-right: 15px
      transition: all ease 0.2s
      overflow: hidden
      &:hover
        background-color: rgba(black, 0.1)
      &:active, &:focus
        &::after
          top: 0
          bottom: 0
      &::after
        +posa(0)
        content: ''
        border-radius: inherit
        background-color: rgba($color-accent, 0.25)
        transition: all ease-in 0.2s
        top: 32px
        bottom: -32px

</style>
