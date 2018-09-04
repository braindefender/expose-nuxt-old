<template>
  <div class="cms-nav">
    <div class="container">
      <div class="cms-nav__box">
        <div class="cms-nav__title">
          Создание выставки
        </div>
        <div class="cms-nav__menu">
          <nuxt-link
            v-for="(page, index) in pageList"
            :key="index"
            :to="{ name: `cms-${page.name}`, params: { cms: true } }"
            :class="$nuxt.$route.path.split('/').pop() === page.name
              ? 'cms-nav__menu-item cms-nav__menu-item--active'
              : 'cms-nav__menu-item'">
            {{page.title}}
          </nuxt-link>
        </div>
        <div class="cms-nav__action">
          <button
            type="button"
            class="button button--outline"
            @click="final">
              Готово
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Navigation',
  data() {
    return {
      pageList: this.$store.state.pageList,
    };
  },
  methods: {
    final() {
      this.$store.dispatch('pushFinalState');
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'
  @import '@/styles/vars.sass'

  .cms-nav
    position: relative
    z-index: 5000
    width: 100%
    height: 48px
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    box-shadow: 0px 5px 20px rgba(black, 0.05)
    background-color: white
    &__box
      padding-left: 20px
      padding-right: 20px
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
    &__title
      font-size: 16px
      line-height: 20px
      font-weight: bold
    &__menu
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
    &__menu-item
      +tdn
      color: black
      box-sizing: border-box
      cursor: pointer
      display: flex
      align-items: center
      padding-left: 8px
      padding-right: 8px
      height: 20px
      font-size: 12px
      line-height: 16px
      margin-right: 12px
      font-weight: bold
      border-radius: 5em
      border: 2px solid rgba(#4680ff, 0)
      transition: all ease 0.15s
      user-select: none
      &:last-child
        margin-right: 0
      &--active
        background-color: #4680ff
        color: white
      &:hover
        border: 2px solid #4680ff
      &:active
        border: 2px solid #4680ff
        transform: scale(0.975)


</style>
