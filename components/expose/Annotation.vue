<template>
  <div class="expose-annotation">
      <div class="expose-annotation__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'Annotation',
  props: ['text'],
  data() {
    return {};
  },
};
</script>

<style lang="sass">

  .expose-annotation
    width: 100%
    background-color: white
    &__text
      margin: 0 auto
      padding-top: 40px
      padding-bottom: 40px
      font-size: 16px
      line-height: 22px
      font-style: italic
      width: 640px
      white-space: pre-wrap
      text-align: justify

</style>
