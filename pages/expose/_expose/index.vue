<template>
  <div class="container">
    <div class="expose-page">
      <cover :options="coverOptions"/>
      <annotation v-if="expose.mode != 0" :text="expose.annotation"/>
      <div class="expose-page__grid">
        <div class="expose-page__panel expose-page__sort">
          <span class="expose-page__sort-title">Сортировка:</span>
          <button
            type="button"
            class="expose-page__sort-button expose-page__sort-button--active"
          >по названию</button>
          <button type="button" class="expose-page__sort-button" @click="sortByAuthor">по автору</button>
          <button type="button" class="expose-page__sort-button" @click="sortByYear">по году</button>
        </div>
        <div class="expose-page__panel expose-page__search">
          <span class="expose-page__search-icon"></span>
          <input class="expose-page__search-input" type="text" placeholder="Поиск по странице">
        </div>
        <div class="expose-page__content">
          <expose-stack v-for="(item, index) in stack.list" :key="index" :stack="item"/>
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
              }"
            >
              <ContentSelector :stack="stack"/>

              <div class="expose-page__info">
                <div class="expose-page__info-title">Информация</div>
                <div
                  v-if="expose.maker"
                  class="expose-page__info-text"
                >Составитель: {{ expose.maker }}</div>
                <div v-if="expose.phones" class="expose-page__info-text">
                  Телефон:
                  <a
                    v-for="(phone, index) in expose.phones"
                    :key="index"
                    :href="`tel:${linkPhone(phone)}`"
                    class="expose-page__phone"
                  >{{ phone }}</a>
                </div>
                <div v-if="expose.email" class="expose-page__info-text">
                  Email:
                  <a :href="`mailto:${expose.email}`">{{ expose.email }}</a>
                </div>
                <div v-if="expose.alt" class="expose-page__info-text">
                  Ссылка:
                  <a :href="`mailto:${expose.sourceLink}`">{{ expose.alt }}</a>
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
import ContentSelector from '@/components/expose/ContentSelector';
import Cover from '@/components/expose/Cover';
import Annotation from '@/components/expose/Annotation';
import ExposeStack from '@/components/expose/ExposeStack';

export default {
  name: 'Expose',
  components: { Annotation, Cover, ContentSelector, ExposeStack },
  props: ['options'],
  mounted() {
    if (!this.options) {
      this.$axios
        .get(`/expose/${this.path}`)
        .then(res => {
          console.log(res.data);
          this.real = res.data;
          this.$store.commit('set', { field: 'real', value: this.real });
        })
        .catch(err => {
          console.log(`Error: get expose named: ${this.path}`, err);
          this.$router.push({ path: '/' });
        });
    }
  },
  data() {
    return {
      real: {
        info: {
          source: 1,
          dates: {
            to: '',
            create: '',
            public: '',
            update: '',
          },
          image:
            'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
          mode: 1,
          maker: '',
        },
        stacks: { stack: {} },
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
    linkPhone(phone) {
      return `+${phone.replace(/\D/g, '')}`;
    },
    prettyPhone(phone) {
      const clean = phone.replace(/\D/g, '');
      const match = clean.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
      }
    },
  },
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
        return this.real.stacks.stack;
      }
    },
    path() {
      return $nuxt.$route.path.split('/').pop();
    },
    coverOptions() {
      return {
        cms: this.options ? this.options.fromcms : false,
        ...this.expose,
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

    &__phone
      display: block

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
