<template>
  <div class="cat-layout">
    <div class="cat-layout__panel">
      <div class="cat-layout__title">Демонстрируемые</div>
    </div>
    <div class="cat-layout__content">
      <div class="cat-layout__slider slider">
        <div class="slider__content">
          <div class="slider__inner slider__blurbg">
            <div class="slider__blurbg-container">
              <img :src="list[0]" alt="">
            </div>
          </div>
          <div class="slider__inner slider__wrapper">
            <div class="slider__container">
              <div class="slider-item">
                <div class="slider-item__inner slider-item__image">
                  <img :src="list[0]" alt="">
                </div>
                <div class="slider-item__inner slider-item__content">
                  <div class="slider-item__title">
                    Книги с автографами из фонда Отделения
                  </div>
                  <div class="slider-item__info">
                    <div class="slider-item__date">
                      с 5 июля 2018
                    </div>
                    <div class="slider-item__place">
                      Отделение ГПНТБ СО РАН
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-item">
                <div class="slider-item__inner slider-item__image">
                  <img :src="list[0]" alt="">
                </div>
                <div class="slider-item__inner slider-item__content">
                  <div class="slider-item__title">
                    Книги с автографами из фонда Отделения
                  </div>
                  <div class="slider-item__info">
                    <div class="slider-item__date">
                      с 5 июля 2018
                    </div>
                    <div class="slider-item__place">
                      Отделение ГПНТБ СО РАН
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slider__controls">
          <div class="slider__control slider__control--left">
            <div class="slider__arrow slider__arrow--left"></div>
          </div>
          <div class="slider__control slider__control--right" v-on:mousemove="updateRightControl">
            <div class="slider__arrow slider__arrow--right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';
import image2 from '@/assets/images/chad-kirchoff-202730-unsplash.jpg';
import image3 from '@/assets/images/ren-ran-232078-unsplash.jpg';
import image4 from '@/assets/images/stock-1863880_1920.jpg';

export default {
  name: 'Slider',
  methods: {
    updateRightControl() {
      // let left = document.querySelector('slider__control--left');
      // const right = document.querySelector('.slider__control--right');
      // const mouseX = e.pageX - right.getBoundingClientRect().left;
      // const item = this.divlist[this.active + 1];
      // item.left = `${parseInt(item.getComputedStyle().left, 10) + mouseX}px`;
      // console.log(item);
    },
    next() {
      if (this.active < this.divlist.length - 1) {
        this.active += 1;
      } else {
        this.active = 0;
      }
    },
    prev() {
      if (this.active < this.divlist.length - 1) {
        this.active -= 1;
      } else {
        this.active = this.divlist.length - 1;
      }
    },
  },
  mounted() {
    this.divlist = document.querySelectorAll('.slider-item');
    // console.log(this.divlist);
  },
  data() {
    return {
      active: 0,
      divlist: [],
      list: [image1, image2, image3, image4, image1],
    };
  },
};
</script>

<style lang="sass">

  .slider
    position: relative
    width: 100%
    height: 100%
    &:hover
      .slider__blurbg
        opacity: 0.6
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
    &__content
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    &__wrapper
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
    &__container
      position: absolute
      top: 0
      left: 0
      right: -1620px
      bottom: 0
      display: grid
      grid-template-columns: repeat(25,810px)
      grid-template-rows: 226px
    &__controls
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    &__control
      position: absolute
      height: 100%
      width: 160px
      &--left
        left: 0
      &--right
        right: 0
    &__arrow
      cursor: pointer
      position: absolute
      width: 60px
      background-color: rgba(white, 0.25)
      height: 100%
      transition: opacity 0.25s ease
      opacity: 0.4
      &:hover
        opacity: 0.8
      &--left
        left: 0
        background: url('/assets/slider-arrow-left.svg') center center no-repeat
      &--right
        right: 0
        background: url('/assets/slider-arrow-right.svg') center center no-repeat

  .slider-item
    color: white
    text-align: center
    height: 100%
    position: relative
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
