<template>
  <a v-if="this.item.annotation || this.item.cover || this.item.hasCover" :href="link" class="bc">
    <image-blur :image="`${imageSrc}?_=${Date.now()}`" :meta="item.meta" :options="{ width: 125 }"/>
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
  <div class="bc bc--small" v-else>
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
  </div>
</template>

<script>
import noCover from '~/assets/default/Article.svg';

import ImageBlur from '~/components/common/ImageBlur';

export default {
  name: 'BookCard',
  props: ['item'],
  components: { ImageBlur },
  data() {
    return {
      source: this.item.source || '',
      imageSrc: '',
      cover: this.item.cover,
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
          // this.annotation = res[0].annotation;
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
          return `${a.slice(1, 248)}... Читать далее`;
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
    text-decoration: none
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
