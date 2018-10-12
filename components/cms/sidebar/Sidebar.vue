<template>
  <div class="sidebar">
    <div class="sidebar__panel">{{ title }}</div>

    <sidebar-account
      v-if="$nuxt.$route.path.split('/').pop() === 'list'">
    </sidebar-account>

    <sidebar-navigation v-else></sidebar-navigation>
  </div>
</template>

<script>
import SidebarAccount from '~/components/cms/sidebar/SidebarAccount';
import SidebarNavigation from '~/components/cms/sidebar/SidebarNavigation';

export default {
  name: 'Sidebar',
  components: { SidebarAccount, SidebarNavigation },
  data() {
    return {
      pageList: this.$store.state.pageList,
    };
  },
  computed: {
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
};
</script>

<style lang="sass">
  @import 'styles/mixins.sass'
  @import 'styles/vars.sass'

  .sidebar
    background-color: #262640
    color: white
    height: 100vh
    max-width: 360px
    min-width: 360px
    overflow: auto
    &__content
      padding-top: 30px
      padding-left: 30px
      padding-right: 30px
      padding-bottom: 30px
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
    padding-top: 20px
    padding-left: 20px
    padding-right: 20px
    padding-bottom: 20px
    background-color: rgba(white, 0.05)
    display: flex
    flex-direction: row
    border-radius: 10px
    transition: all ease 0.15s
    cursor: pointer
    color: rgba(white, 0.5)
    position: relative
    +tdn
    &:hover
      background-color: rgba(white, 0.1)
    &--active
      background-color: rgba(white, 0.25)
      color: white
      &:hover
        background-color: rgba(white, 0.3)
    &__text
      font-weight: bold
      font-size: 18px
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
      margin-right: 20px
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
</style>
