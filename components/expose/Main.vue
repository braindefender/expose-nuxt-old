<template>
  <div class="cms">
    <!-- <BookPage></BookPage> -->
    <!-- <Cover></Cover> -->
    <!-- <ExposePage></ExposePage> -->
    <!-- <Slider></Slider> -->
    <!-- <CataloguePreview></CataloguePreview> -->
    <!-- <CategoryPreview></CategoryPreview> -->
    <!-- <Category></Category> -->
    <Navigation
      :pages='tabs'
      :current='currentTab'
      @changePage="changePage"
      @nextPage="nextPage">
    </Navigation>
    <!--
    <transition name="component-fade" mode="out-in">
      <component
        @submitData="submitData"
        :is="currentTabComponent">
      </component>
    </transition> -->
    <PageOne ref="pageOne"></PageOne>
    <!-- <PageTwo></PageTwo> -->
    <!-- <PageThree></PageThree> -->
  </div>
</template>

<script>
import axios from 'axios';

import Slider from '@/components/Slider';
import CataloguePreview from '@/components/CataloguePreview';
import CategoryPreview from '@/components/CategoryPreview';
import ExposePage from '@/components/ExposePage';
import Category from '@/components/Category';
import Cover from '@/components/Cover';
import BookPage from '@/components/BookPage';
import Navigation from '@/components/CMS/Navigation';
import PageOne from '@/components/CMS/PageOne';
import PageTwo from '@/components/CMS/PageTwo';
import PageThree from '@/components/CMS/PageThree';

export default {
  name: 'Main',
  components: {
    CataloguePreview,
    CategoryPreview,
    Category,
    Slider,
    Cover,
    ExposePage,
    BookPage,
    Navigation,
    PageOne,
    PageTwo,
    PageThree,
  },
  data() {
    return {
      currentTab: 'PageTwo',
      tabs: [
        { name: 'PageOne', title: 'Информация' },
        { name: 'PageTwo', title: 'Сортировка' },
        { name: 'PageThree', title: 'Редактирование' },
        { name: 'PageFour', title: 'Предпоказ' },
      ],
    };
  },
  computed: {
    currentTabComponent() {
      return `${this.currentTab}`;
    },
  },
  mounted() {
    axios.defaults.baseURL = 'http://10.3.6.27:3333/api';
    this.$on('submitData', data => this.submitData(data));
  },
  methods: {
    changePage(page) {
      this.currentTab = page.name;
    },
    nextPage() {
      this.$refs.pageOne.submitData();
    },
    submitData(data) {
      // eslint-disable-next-line
      console.log(data);
      axios.post('/expose', data);
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'
  @import '@/styles/vars.sass'

  .bold
    font-weight: bold

  .cms
    height: 100vh
    overflow: hidden
    overflow-y: auto
    &__page
      background: $color-bg

  @mixin button($color)
    box-sizing: border-box
    margin: 0
    padding: 0
    user-select: none
    border: none
    outline: none
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: all ease 0.2s
    box-shadow: 0 3px 6px rgba($color, 0)
    position: relative
    background: $color
    border: 2px solid rgba($color, 0)
    +tdn
    &::before
      +posa(0)
      transition: all ease 0.2s
      content: ''
    &:hover
      box-shadow: 0px 3px 6px rgba($color, 0.4)
    &:active
      transform: scale(0.985)
      &::before
        background-color: rgba(black, 0.1)
    &:focus
      box-shadow: 0 0px 6px rgba($color, 0.8)

  .button
    +button($color-accent)
    font-family: 'PT Sans'
    color: white
    font-weight: bold
    font-size: 14px
    line-height: 20px
    padding-left: 13px
    padding-right: 13px
    height: 32px
    border-radius: 5px
    &--outline
      background: white
      color: $color-accent
      border: 2px solid $color-accent
      transition: all ease 0.3s
      &:active
        &::before
          background-color: rgba($color-accent, 0.25)

  .button-remove
    +button($color-error)
    width: 22px
    height: 22px
    border-radius: 5px
    &::after
      +posa(0)
      content: ''
      background: url('../assets/button-remove.svg') center center no-repeat

  .container
    width: 1170px
    padding-left: 10px
    padding-right: 10px
    margin: 0 auto

  .book-image
    min-height: 120px
    max-height: 400px
    position: relative
    border-radius: 5px
    &__image
      z-index: 10
      position: relative
      display: flex
      justify-content: center
      align-items: center
      border-radius: inherit
      overflow: hidden
      img
        width: 100%
    &__blur
      z-index: 5
      +blur-bg
      transition: all ease 0.3s

  .control-progress
    position: relative
    user-select: none
    border-radius: 50%
    background-color: rgba(black, 0.12)
    width: 22px
    height: 22px
    &::after
      +posa(3px)
      border-radius: inherit
      height: 16px
      width: 16px
      content: ''
      background-color: white

  .component-fade-enter-active, .component-fade-leave-active
    transition: all .8s ease

  .component-fade-enter
    opacity: 0
    transform: translateX(50px)
  .component-fade-leave-to
    opacity: 0
    transform: translateX(-50px)

  .component-fade-enter-to,
  .component-fade-leave
    opacity: 1
    transform: translateX(0px)

</style>
