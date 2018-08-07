<template>

<div class="card">
  <div class="card__content">

    <div class="card__left">
      <div class="card__image"></div>
      <div class="card__button">Перейти в каталог</div>
    </div>

    <div class="card__right">
      <div class="card__text card__text--author">{{ this.item.author }}</div>
      <div class="card__text card__text--title">{{ this.item.title }}</div>
      <div class="card__text card__text--description">{{ this.item.description }}</div>
      <div class="card__info">{{ this.item.info }}</div>
    </div>

  </div>
</div>

</template>

<script>
export default {
  name: 'BookCard',
  props: ['item'],
  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped>
  .card
    border-radius: 10px
    overflow: hidden
    &__content
      padding: 20px
      display: flex
    &__left
      display: flex
      flex-direction: column
    &__right
      display: flex
      flex-direction: column
    &__image
      border-radius: 10px
      margin-bottom: 20px
    &__button
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 100%
      height: 32px
      border-radius: 10px
      font-weight: bold
      font-size: 14px
      line-height: 20px
      text-align: center
      color: #1861f2
    &__text
      font-weight: normal
      font-size: 16px
      line-height: 20px
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
    &__title
      font-weight: bold
    &__author
      font-size: 16px
    &__description
      font-size: 14px
      color: rgba(black, 0.8)
</style>
