<template>
  <div class="book-contents">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="sass">

  .book-contents
    text-align: justify
    width: 100%
    white-space: pre-wrap
    font-size: 15px
    font-family: PT Mono

</style>
