<template>
  <div class="cards-container" :class="preload ? 'cards-container--preload' : ''">
    <h2 class="cards-container__title">{{ title }}</h2>
    <nuxt-link :to="action.link || '#'" class="cards-container__action">{{ action.title }}</nuxt-link>
    <div class="cards-container__grid">
      <slot :preload="preload"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    action: Object,
    preload: { type: Boolean, default: false },
  },
};
</script>

<style lang="sass">

@import '~/styles/mixins.sass'

.cards-container
  display: grid
  grid-template-rows: 72px 1fr
  grid-template-columns: 400px 100px
  grid-template-areas: "heading action" "content content"
  align-items: center
  justify-content: space-between

  &__title
    +heading-2
    grid-area: heading

  &__action
    +link
    font-size: 14px
    text-align: right
    grid-area: action

  &__grid
    display: grid
    grid-template-columns: repeat(3, min-content)
    grid-template-areas: "card"
    grid-auto-flow: row
    grid-area: content
    grid-gap: calc((1700px - 540px * 3) / 2)

  &--preload
    .cards-container__title,
    .cards-container__action
      +preloader-mask

@media only screen and (max-width : 1720px)
  .cards-container
    &__grid
      grid-template-columns: repeat(2, max-content)
      grid-gap: calc((1120px - 540px * 2))


</style>
