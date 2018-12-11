<template>
  <div class="sidebar" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="sidebar__panel">{{ title }}</div>
    <sidebar-account v-if="$nuxt.$route.path.split('/').pop() === 'list'"/>
    <sidebar-navigation v-else/>
  </div>
</template>

<script>
import { TweenMax, Power4 } from 'gsap';

import SidebarAccount from '~/components/cms/sidebar/SidebarAccount';
import SidebarNavigation from '~/components/cms/sidebar/SidebarNavigation';

export default {
  name: 'Sidebar',
  components: { SidebarAccount, SidebarNavigation },
  data() {
    return {
      minWidth: 86,
      maxWidth: 250,
      pageList: this.$store.state.static.pageList,
    };
  },
  mounted() {},
  watch: {
    open: function(open) {
      // console.log(this.$el);
      if (open) {
        TweenMax.to(this.$el, 0.6, {
          width: this.maxWidth,
          ease: Power4.easeOut,
        });
      } else {
        TweenMax.to(this.$el, 0.6, {
          width: this.minWidth,
          ease: Power4.easeOut,
        });
      }
    },
  },
  computed: {
    open() {
      return this.$store.state.sidebar.open;
    },
    title() {
      const currentPage = this.$route.path.split('/').pop();
      if (currentPage === 'list') {
        return 'Конструктор выставок';
      }
      if (this.pageList.map(page => page.name).includes(currentPage)) {
        return 'Создание выставки';
      }
    },
  },
  methods: {
    onMouseEnter() {
      // this.$store.commit('sidebar/open');
    },
    onMouseLeave() {
      // this.$store.commit('sidebar/close');
    },
  },
};
</script>

<style lang="sass">
  @import 'styles/mixins.sass'
  @import 'styles/vars.sass'

  .sidebar
    background-color: #262640
    color: white
    height: 100vh
    width: 360px
    flex: 0 0 auto
    overflow: hidden
    &__content
      padding: 30px
      display: flex
      flex-direction: column
      justify-content: space-between
      flex-grow: 1
      height: calc(100% - 60px)
    &__panel
      height: 60px
      display: flex
      justify-content: flex-start
      align-items: center
      font-weight: bold
      font-size: 18px
      padding-left: 30px
      padding-right: 30px
      box-shadow: 0 1px 0 rgba(white, 0.1)

  .sidebar-button-box
    display: flex
    flex-direction: column
    .sidebar-button
      margin-bottom: 20px
      &:last-child
        margin-bottom: 0

  .sidebar-button
    padding: 20px
    background-color: rgba(white, 0.05)
    display: flex
    flex: 0 0 auto
    flex-direction: row
    border-radius: 10px
    transition: all ease 0.15s
    cursor: pointer
    color: rgba(white, 0.5)
    position: relative
    align-items: center
    transition: all ease-in-out 0.15s
    +tdn
    &:hover
      background-color: rgba(white, 0.1)
    &--active
      background-color: rgba(white, 0.25)
      color: white
      &:hover
        background-color: rgba(white, 0.3)
    &--mini
      padding: 10px
      align-items: center
      .sidebar-button__text
        transform: translate(-15px)
        opacity: 0
        margin-left: 0
        font-size: 0
    &__text
      font-weight: bold
      font-size: 18px
      margin-left: 20px
      user-select: none
    &__overlay
      +posa(0)
      display: flex
      align-items: center
      justify-content: center
      background-color: $color-accent
      border-radius: inherit
      color: white
      font-weight: bold
      opacity: 0
      font-size: 18px
    &__icon
      width: 24px
      height: 24px
      opacity: 0.6
      background: center center no-repeat
      &--add
        background-image: url('~/assets/sidebar/sidebar-icon-add.svg');
      &--home
        background-image: url('~/assets/sidebar/sidebar-icon-home.svg');
      &--info
        background-image: url('~/assets/sidebar/sidebar-icon-info.svg');
      &--sort
        background-image: url('~/assets/sidebar/sidebar-icon-sort.svg');
      &--edit
        background-image: url('~/assets/sidebar/sidebar-icon-edit.svg');
      &--demo
        background-image: url('~/assets/sidebar/sidebar-icon-demo.svg');
      &--public
        background-image: url('~/assets/sidebar/sidebar-icon-check.svg');
      &--waiting
        background-image: url('~/assets/sidebar/sidebar-icon-wait.svg');
      &--hidden
        background-image: url('~/assets/sidebar/sidebar-icon-eye.svg');
      &--exit
        background-image: url('~/assets/sidebar/sidebar-icon-exit.svg');
      &--save
        background-image: url('~/assets/sidebar/sidebar-icon-save.svg');
      &--work
        background-image: url('~/assets/sidebar/sidebar-icon-work.svg');

  .sidebar-account
    padding-top: 30px
    padding-left: 20px
    padding-right: 20px
    padding-bottom: 20px
    border-radius: 10px
    background-color: rgba(white, 0.05)
    &__avatar-box
      margin-bottom: 20px
      display: flex
      align-items: center
      justify-content: center
    &__avatar
      border-radius: 50%
      overflow: hidden
      width: 96px
      height: 96px
      background-color: rgba(white, 0.1)
      img
        width: 96px
        height: 96px
    &__text
      margin-bottom: 20px
      text-align: center
    &__name
      font-weight: bold
      font-size: 18px
      color: white
    &__mail
      font-size: 16px
      color: rgba(white, 0.5)
    &__panel
      padding-left: 20px
      padding-right: 20px
      min-height: 48px
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 16px
      color: rgba(white, 0.5)
      background-color: rgba(white, 0.05)
      border-radius: 5px

  @media only screen and (max-width : 1600px)
    .sidebar
      width: 320px

  @media only screen and (max-width : 1400px)
    .sidebar
      width: 250px
      &__content
        padding: 10px
        height: calc(100% - 48px)
      &__panel
        padding-left: 20px
        padding-right: 20px
        height: 48px
        font-size: 16px

    .sidebar-button-box
      .sidebar-button
        margin-bottom: 10px

    .sidebar-button
      padding: 15px
      &__text
        font-size: 16px
        line-height: 18px
        margin-left: 15px
      &__overlay
        font-size: 16px

</style>
