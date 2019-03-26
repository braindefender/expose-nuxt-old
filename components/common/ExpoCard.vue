<template>
  <div class="expo-card" :style="`background-image: url('${image}');`" @click="atClick">
    <p class="expo-card__title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    atClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="sass">
  @import '~/styles/mixins.sass'

  .expo-card
    flex: 0 0 auto

    display: flex
    align-items: center
    justify-content: flex-start

    min-height: 100px
    width: 300px

    background: #333 center no-repeat
    background-size: cover
    border-radius: 5px
    color: white
    cursor: pointer

    font-weight: bold
    font-size: 16px
    line-height: 18px

    position: relative
    margin: -1px
    padding: 0 20px

    &::after
      +posa(0)
      content: ''
      background-color: rgba(black, 0.5)
      border-radius: inherit

    &__title
      position: relative
      z-index: 1
      margin: 0
      padding: 0
      white-space: pre-wrap

  @media only screen and (max-width : 1024px)
    .expo-card
      width: 240px
      font-size: 14px

</style>
