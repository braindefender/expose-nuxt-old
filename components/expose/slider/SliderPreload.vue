<template>
  <div class="cat-layout">
    <div class="cat-layout__panel">
      <div class="cat-layout__title preloader-mask">Демонстрируемые</div>
    </div>
    <div class="cat-layout__content">
      <div class="cat-layout__slider slider-preloader preloader-mask"></div>
    </div>
  </div>
</template>

<style lang="sass">
  .slider-preloader
    position: relative
    width: 100%
    height: 100%
    min-height: 226px
    background-color: rgba(black, 0.1)
</style>
