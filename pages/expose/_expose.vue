<template>
  <div class="container">
    <div class="expose-page">

      <Cover :options="coverOptions"></Cover>

      <div class="expose-page__grid">
        <div class="expose-page__panel expose-page__sort">
          <span class="expose-page__sort-title">Сортировка:</span>
          <button
            type="button"
            class="expose-page__sort-button expose-page__sort-button--active">
            по названию</button>
          <button
            type="button"
            class="expose-page__sort-button">
            по автору</button>
          <button
            type="button"
            class="expose-page__sort-button">
            по году</button>
        </div>
        <div class="expose-page__panel expose-page__search">
          <span class="expose-page__search-icon"></span>
          <input
            class="expose-page__search-input"
            type="text"
            placeholder="Поиск по странице">
        </div>
        <div class="expose-page__content">

          <expose-stack
           v-for="(item, index) in stack.list"
           :key="index"
           :stack="item">
           </expose-stack>

        </div>
        <div class="expose-page__menu">
          <!-- <ContentSelector :list="list"></ContentSelector> -->
          <div class="expose-page__info">
            <div class="expose-page__info-title">
              Информация
            </div>
            <div class="expose-page__info-text">
              Составитель: {{ this.maker }}
            </div>
            <div class="expose-page__info-text">
              Телефон: <a :href="`tel:${this.phone}`">{{ this.prettyPhone }}</a>
            </div>
            <div class="expose-page__info-text">
              Email: <a :href="`mailto:${this.email}`">{{ this.email }}</a>
            </div>
          </div>
        </div>
      </div>
      <!-- <button @click="showData"></button> -->
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/expose/BookCard';
import ContentSelector from '@/components/expose/ContentSelector';
import Cover from '@/components/expose/Cover';
import ExposeStack from '@/components/expose/ExposeStack';

export default {
  name: 'Expose',
  components: { Cover, ContentSelector, BookCard, ExposeStack },
  props: ['options'],
  mounted() {
    if (!this.options) {
      this.$axios
        .get(`/expose/${this.path}`)
        .then(res => {
          this.expose = res;
        })
        .catch(err => {
          console.log(`Error: get expose named: ${this.path}`, err);
        });
    }
  },
  data() {
    return {
      mode: 0,
      source: 0,
      title: 'this.title',
      dates: {
        from: '2018-08-07',
        to: '2018-08-14',
      },
      email: 'this.email',
      phone: '+79130014485',
      maker: 'this.maker',
      list: [],
      expose: {},
    };
  },
  methods: {
    showData() {
      // console.log(this.$data);
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
  computed: {
    info() {
      return `Документов: ${this.list.length}`;
    },
    path() {
      return $nuxt.$route.path.split('/').pop();
    },
    stack() {
      if (this.options) {
        if (this.options.cms) {
          return this.$store.state.sortTest.stack;
        }
      } else {
        this.expose.stack;
      }
    },
    prettyPhone() {
      return this.phone.replace(
        /(\+\d)(\d\d\d)(\d\d\d)(\d\d\d\d)/,
        '$1 ($2) $3-$4',
      );
    },
    coverOptions() {
      const sourceList = this.$store.state.sourceList;
      const image = this.image ? this.image : sourceList[this.source].image;
      return {
        nav: true,
        title: this.title,
        image,
        source: sourceList[this.source].title,
        date: {
          from: this.date(this.dates.from),
          to: this.date(this.dates.to),
        },
        prev: undefined,
        next: undefined,
      };
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'

  .expose-section
    border-radius: 5px
    background-color: #f5f5f5
    &__content
      padding-left: 15px
      padding-right: 15px
      padding-bottom: 15px
    &__panel
      padding-left: 30px
      padding-right: 30px
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: 64px
    &__title
      font-size: 18px
      font-weight: bold
      font-family: 'PT Sans'
    &__info
      font-size: 18px
      color: rgba(black, 0.25)

  .expose-page
    &__grid
      padding-top: 20px
      display: grid
      grid-template-columns: 810px auto
      grid-template-rows: 40px auto
      grid-gap: 20px 15px
    &__panel
      border-radius: 5px
      overflow: hidden
      display: flex
      flex-direction: row
      justify-content: flex-start
      align-items: center
      background-color: #f5f5f5
      font-size: 14px
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
