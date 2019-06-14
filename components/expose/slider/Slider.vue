<template>
  <div class="slider">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list" :key="index">
          <slider-item :item="item"></slider-item>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
      <div class="slider__arrow slider__arrow--left" slot="button-prev"></div>
      <div class="slider__arrow slider__arrow--right" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
import SliderItem from '~/components/expose/slider/SliderItem';

export default {
  name: 'Slider',
  components: { SliderItem },
  methods: {},
  mounted() {
    this.$axios.$get('/catalogue/current').then(res => {
      console.log(res);
      if (res.current.length === 0) {
        this.show = false;
      } else {
        this.show = true;
        this.list = res.current;
        this.mySwiper.updateSlides();
      }
    });
  },
  data() {
    return {
      show: false,
      active: 0,
      list: [],
      swiperOption: {
        autoplay: {
          delay: 5000,
        },
        height: 236,
        navigation: {
          nextEl: '.slider__arrow--right',
          prevEl: '.slider__arrow--left',
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
};
</script>

<style lang="sass">

  .slider
    width: 1700px
    height: 225px
    border-radius: 5px
    grid-area: card
    &:hover
      .slider__blurbg
        opacity: 0.6
    &__content
      width: 100%
      min-height: 226px
    &__inner
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    &__blurbg
      filter: blur(15px)
      opacity: 0.4
      border-radius: inherit
      transition: all ease 0.3s
    &__blurbg-container
      overflow: hidden
      position: absolute
      top: 10px
      left: 0
      right: 0
      bottom: -10px
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      border-radius: inherit
      img
        width: 100%
    &__control
      position: absolute
      height: 100%
      width: 160px
      &--left
        left: 0
      &--right
        right: 0
    &__arrow
      position: absolute
      top: 0
      z-index: 100
      cursor: pointer
      width: 60px
      background-color: rgba(white, 0.25)
      height: 100%
      transition: opacity 0.25s ease
      opacity: 0.5
      &:hover
        opacity: 0.8
      &--left
        left: 0
        background: url('/assets/slider-arrow-left.svg') center center no-repeat
      &--right
        right: 0
        background: url('/assets/slider-arrow-right.svg') center center no-repeat

  .slider-item
    position: relative
    height: 226px
    cursor: pointer
    text-align: center
    color: white
    &__content
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
    &__inner
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    &__image
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      border-radius: 5px
      overflow: hidden
      -webkit-mask-image: -webkit-radial-gradient(white, black)
      img
        width: 100%
      &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: rgba(black, 0.4)
    &__title
      font-size: 20px
      line-height: 22px
      font-weight: bold
      white-space: pre
    &__info
      position: absolute
      bottom: 35px
    &__date
      font-size: 16px
      line-height: 20px
    &__place
      font-size: 13px
      color: rgba(white, 0.6)

</style>
