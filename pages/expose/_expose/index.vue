<template>
  <div class="container">
    <div class="expose-page">

      <Cover :options="coverOptions"></Cover>

      <div class="expose-page__grid">
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
        <div class="expose-page__content-selector">
          <no-ssr>
            <affix
              class="expose-page__menu"
              relative-element-selector=".expose-page__content-selector"
              :offset="{ top: 10, bottom: 0 }">
              <ContentSelector :stack="stack"></ContentSelector>

              <div class="expose-page__info">
                <div class="expose-page__info-title">Информация</div>
                <div v-if="this.expose.maker"
                  class="expose-page__info-text">
                  Составитель: {{ this.expose.maker }}
                </div>
                <div v-if="this.expose.phone"
                  class="expose-page__info-text">
                  Телефон: <a :href="`tel:${this.phone}`">{{ this.expose.phone }}</a>
                </div>
                <div v-if="this.expose.email"
                  class="expose-page__info-text">
                  Email: <a :href="`mailto:${this.expose.email}`">{{ this.expose.email }}</a>
                </div>
              </div>
            </affix>
          </no-ssr>
        </div>

      </div>
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
          this.real = res;
        })
        .catch(err => {
          console.log(`Error: get expose named: ${this.path}`, err);
          this.$router.push({ path: '/' });
        });
    }
  },
  data() {
    return {
      mode: 0,
      source: 0,
      maker: 'this.maker',
      list: [],
      real: {
        info: { source: 0 },
        stacks: {},
      },
      inverse: false,
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
      return {
        nav: true,
        title: this.expose.title,
        image,
        source:
          this.expose.mode !== 0 ? sourceList[this.expose.source].title : '',
        date: {
          from: this.date(this.expose.dateFrom),
          to: this.date(this.expose.dateTo),
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
