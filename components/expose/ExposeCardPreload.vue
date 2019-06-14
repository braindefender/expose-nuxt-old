<template>
  <a class="e-card e-card--preloader" href="#"></a>
</template>

<script>
export default {
  name: 'ExposeCardPreload',
};
</script>

<style lang="sass">

  @import '@/styles/expose-card.sass'

  .e-card
    &--preloader
      +preloader-mask

</style>
