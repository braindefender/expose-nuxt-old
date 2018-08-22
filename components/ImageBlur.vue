<template>
  <div class="image-blur" :style="{
    width
  }">
    <div class="image-blur__bg" ref="bg">
      <img :src="image" :alt="meta">
    </div>
    <div class="image-blur__fg" ref="fg">
      <img :src="image" :alt="meta">
    </div>
  </div>
</template>

<script>
export default {
  name: 'image-blur',
  props: ['image', 'meta', 'options'],
  data() {
    return {};
  },
  computed: {
    width() {
      return this.options.width ? `${this.options.width}px` : '125px';
    },
  },
};
</script>

<style lang="sass" scoped>
  .image-blur
    display: flex
    flex: 0 0 auto
    min-height: 120px
    max-height: 400px
    position: relative
    border-radius: 5px
    border: 2px solid rgba(black, 0.15)
    &__bg
      position: absolute
      top: 10px
      bottom: -10px
      opacity: 0.4
      z-index: 5
      display: flex
      justify-content: center
      align-items: center
      filter: blur(10px)
      img
        width: 100%
    &__fg
      border-radius: 3px
      position: relative
      z-index: 10
      display: flex
      justify-content: center
      align-items: center
      overflow: hidden
      img
        width: 100%
</style>
