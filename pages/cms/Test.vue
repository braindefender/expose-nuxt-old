<template>
  <div class="test-page">
    <div class="expose-page">
      <edit-item/>

      <!-- <cover :options="coverOptions"/> -->

      <!-- <div class="expose-page__grid">

        <div class="expose-page__panel expose-page__sort">

          <span class="expose-page__sort-title">Сортировка:</span>

          <button type="button"
            class="expose-page__sort-button expose-page__sort-button--active">
            по названию</button>

          <button type="button"
            class="expose-page__sort-button"
            @click="sortByAuthor">
            по автору</button>

          <button type="button"
            class="expose-page__sort-button"
            @click="sortByYear">
            по году</button>

        </div>

        <div class="expose-page__panel expose-page__search">

          <span class="expose-page__search-icon"/>

          <input
            class="expose-page__search-input"
            placeholder="Поиск по странице"
            type="text"/>

        </div>

        <div class="expose-page__content">

          <expose-stack
            v-for="(item, index) in stack.list"
            :key="index"
            :stack="item"/>

        </div>

        <div class="expose-page__content-selector">
          <no-ssr>
            <affix
              class="expose-page__menu"
              relative-element-selector=".expose-page__content-selector"
              :offset="{
                top: 10,
                bottom: 0,
                scrollAffix: false,
                scrollContainerSelector: '.cms-new-page'
              }">

              <content-selector :stack="stack"/>

              <div class="expose-page__info">

                <div class="expose-page__info-title">Информация</div>

                <div
                  v-if="this.expose.maker"
                  class="expose-page__info-text">
                  Составитель: {{ this.expose.maker }}
                </div>

                <div
                  v-if="this.expose.phone"
                  class="expose-page__info-text">
                  Телефон: <a :href="`tel:${this.phone}`">{{ this.expose.phone }}</a>
                </div>

                <div
                  v-if="this.expose.email"
                  class="expose-page__info-text">
                  Email: <a :href="`mailto:${this.expose.email}`">{{ this.expose.email }}</a>
                </div>

              </div>

            </affix>
          </no-ssr>
        </div>

      </div> -->

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
  mounted() {
    this.$store.commit(
      'edit/selectOnEditScreen',
      this.real.stacks.list[0].list[0],
    );
  },
  computed: {
    expose() {
      if (this.options && this.options.cms) {
        return this.$store.state.info;
      } else {
        return this.real.info;
      }
    },
    stack() {
      if (this.options && this.options.cms) {
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
      const sourceList = this.$store.state.sourceList;
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
        title: this.expose.title,
        source:
          this.expose.mode !== 0 ? sourceList[this.expose.source].title : '',
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
    sortByYear() {
      this.$store.commit('stacks/sortByYear', {
        stack: this.stack,
        inverse: this.inverse,
      });
      this.inverse = !this.inverse;
    },
    sortByAuthor() {
      this.$store.commit('stacks/sortByAuthor', {
        stack: this.stack,
        inverse: this.inverse,
      });
      this.inverse = !this.inverse;
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
