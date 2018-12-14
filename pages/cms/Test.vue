<template>
  <div class="test-page">
    <div class="expose-page">
      <cover :options="coverOptions"/>
    </div>
  </div>
</template>

<script>
import testImage from '~/assets/images/giammarco-boscaro-380907-unsplash.jpg';

import BookPage from '~/components/expose/BookPage';
import ContentSelector from '@/components/expose/ContentSelector';
import Cover from '@/components/expose/Cover';
import ExposeStack from '@/components/expose/ExposeStack';
import ImagePicker from '@/components/cms/common/ImagePicker';
import EditItem from '@/components/cms/EditItem';

export default {
  name: 'Test',
  components: {
    BookPage,
    Cover,
    ContentSelector,
    ExposeStack,
    ImagePicker,
    EditItem,
  },
  props: ['options'],
  data() {
    return {
      testImage: testImage,
      mode: 0,
      source: 0,
      maker: 'this.maker',
      list: [],
      title: 'fasjdkfhasdjklh fasjkdlfhasjkdlfhajskl',
      real: {
        info: { source: 0, dates: {} },
        stacks: {
          list: [
            {
              title: 'Blah1',
              kind: 'stack',
              list: [
                {
                  title: 'Blah2',
                  kind: 'stack',
                  list: [
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                  ],
                },
                {
                  title: 'Blah3',
                  kind: 'stack',
                  list: [
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                  ],
                },
                {
                  title: 'Blah4',
                  kind: 'stack',
                  list: [
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                  ],
                },
              ],
            },
            {
              title: 'Blah5',
              kind: 'stack',
              list: [
                {
                  title: 'Blah6',
                  kind: 'stack',
                  list: [
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                  ],
                },
                {
                  title: 'Blah7',
                  kind: 'stack',
                  list: [
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                  ],
                },
                {
                  title: 'Blah8',
                  kind: 'stack',
                  list: [
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                    { title: 'blah-blah', kind: 'book' },
                  ],
                },
              ],
            },
          ],
        },
      },
      inverse: false,
    };
  },
  mounted() {},
  computed: {
    expose() {
      if (this.options && this.options.fromcms) {
        return this.$store.state.info;
      } else {
        return this.real.info;
      }
    },
    stack() {
      if (this.options && this.options.fromcms) {
        return this.$store.state.stacks.stack;
      } else {
        return this.real.stacks;
      }
    },
    path() {
      return $nuxt.$route.path.split('/').pop();
    },
    phone() {
      return `+${this.expose.phone.replace(/\D/g, '')}`;
    },
    coverOptions() {
      const sourceList = this.$store.state.static.sourceList;
      let image;
      if (this.expose && this.expose.image) {
        image = this.expose.image;
      } else {
        image = sourceList[this.expose.source].image;
      }
      let date = {};
      if (this.expose.dates.from) {
        date.from = this.date(this.expose.dates.from);
        date.to = this.date(this.expose.dates.to);
      } else {
        date.from = this.date(this.expose.dates.public);
        date.to = undefined;
      }
      return {
        nav: true,
        date,
        image,
        title:
          'Название выставки может быть очень длинным в несколько слов, а ещё и с описанием',
        source:
          this.expose.mode === 0 ? sourceList[this.expose.source].title : '',
        prev: undefined,
        next: undefined,
      };
    },
  },
  methods: {
    showData() {
      // console.log(this.$data);
    },
    cropImage(image) {
      this.cropImage = image;
    },
    changeImage(image) {
      this.testImage = image;
    },
    removeImage() {
      this.testImage = undefined;
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
  },
};
</script>

<style lang="sass">
  .test-page
    display: flex
    flex-direction: column

  .expose-page
    &__grid
      padding-top: 20px
      display: grid
      grid-template-columns: 2fr 1fr
      grid-template-rows: 40px auto
      grid-gap: 20px 15px
      min-width: 320px
      max-width: 1200px
      margin: 0 auto
    &__panel
      font-size: 14px
      border-radius: 5px
      overflow: hidden
      display: flex
      flex-direction: row
      justify-content: flex-start
      align-items: center
      background-color: rgba(black, 0.05)
      color: black
    &__menu
      padding-left: 15px
    &__search
      padding-left: 12px
      font-size: 0
    &__search-icon
      display: inline-block
      width: 20px
      height: 20px
      background: url('/assets/icon-search.svg') center center no-repeat
      opacity: 0.25
      margin-right: 5px
    &__search-input
      font-size: 13px
      border: none
      outline: none
      background: none
      &::placeholder
        color: rgba(black, 0.4)
    &__sort
      padding-left: 30px
    &__sort-title
      margin-right: 20px
    &__sort-button
      margin: 0
      padding: 0
      font-family: 'PT Sans'
      cursor: pointer
      color: #4680ff
      border: none
      outline: none
      background: none
      font-size: 14px
      margin-right: 20px
      &:last-child
        margin-right: 0
      &--active
        font-weight: bold
        color: black
    &__info-title
      color: black
      font-weight: bold
      font-size: 18px
      line-height: 20px
      padding-top: 15px
      margin-bottom: 15px
    &__info-text
      font-size: 14px
      line-height: 20px
      a
        color: #4680ff
        text-decoration: none
        &:hover
          text-decoration: none

</style>
