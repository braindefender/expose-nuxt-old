<template>

  <div class="cat-card">

    <div class="cat-card__inner cat-card__image-blur">
      <div class="cat-card__image-blur-container">
        <img :src="this.image" alt="">
      </div>
    </div>
    <div class="cat-card__inner cat-card__image">
      <img :src="this.image" alt="">
    </div>
    <div class="cat-card__inner cat-card__content cat-card__content--catalogue">
      <div class="cat-card__content-title">
        Еженедельная выставка новых поступлений отделения ГПНТБ<br>СО РАН
      </div>
      <div class="cat-card__content-date">
        18 июля, 2018
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'CatalogueCard',
  props: ['image'],
  data() {
    return {};
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'

  .cat-card
    width: 395px
    height: 120px
    position: relative
    background-color: #333
    border-radius: 5px
    position: relative
    cursor: pointer
    border-radius: 5px
    &:hover
      .cat-card__image-blur
        opacity: 0.6
    &__inner
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    &__image
      width: 100%
      overflow: hidden
      border-radius: 5px
      display: flex
      align-items: center
      justify-content: center
      -webkit-mask-image: -webkit-radial-gradient(white, black)
      img
        animation: slide 20s alternate infinite ease-in-out
        width: 100%
      &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: rgba(black, 0.4)
    &__image-blur
      +blur-bg
      transition: all ease 0.3s
      &-container
          animation: slide 15s alternate infinite linear
    &__content
      padding: 20px
      color: white
      &--category
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .cat-card__content-title
          max-width: 265px
          font-size: 20px
          line-height: 22px
          font-weight: bold
          font-family: "PT Sans"
        .cat-card__content-info
          padding-top: 3px
          font-size: 13px
          line-height: 15px
      &--catalogue
        .cat-card__content-title
          max-width: 265px
          font-size: 16px
          line-height: 17px
          font-weight: bold
          font-family: "PT Sans"
        .cat-card__content-date
          position: absolute
          right: 20px
          bottom: 20px
          font-size: 13px
          line-height: 15px

</style>
