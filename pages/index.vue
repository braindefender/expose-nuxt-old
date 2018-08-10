<template>
  <div class="expose-main">
    <div class="container">

      <div class="expose-main__cover">
        <div class="expose-main__cover-inner expose-main__cover-image">
          <img :src="cover" alt="">
        </div>
        <div class="expose-main__cover-inner expose-main__cover-content">
          <div class="expose-main__cover-title">Каталог выставок ГПНТБ СО РАН</div>
        </div>
      </div>

      <!-- <Slider></Slider> -->

      <CataloguePreview
        v-if="catalogueList !== ''"
        :list="catalogueList">
      </CataloguePreview>
      <CategoryPreview
        v-if="categoryList !== undefined"
        :list="categoryList">
      </CategoryPreview>

    </div>
  </div>
</template>

<script>
import cover from '~/assets/images/alfons-morales-410757-unsplash.jpg';

import CataloguePreview from '~/components/expose/CataloguePreview';
import CategoryPreview from '~/components/expose/CategoryPreview';
import Slider from '~/components/expose/Slider';

export default {
  components: { CataloguePreview, CategoryPreview, Slider },
  data() {
    return {
      cover,
      categoryList: undefined,
      catalogueList: undefined,
    };
  },
  mounted() {
    this.$axios.$get('/main').then(res => {
      this.catalogueList = res.catalogueList;
      this.categoryList = res.categoryList;
    });
  },
};
</script>

<style lang="sass">

  @import '~/styles/mixins.sass'

  .expose-main
    &__cover
      width: 100%
      height: 320px
      position: relative
      color: white
      background-color: #333
      &-inner
        +posa(0)
        pointer-events: none
      &-content
        display: flex
        justify-content: center
        align-items: center
        pointer-events: auto
      &-title
        text-align: center
        max-width: 680px
        font-weight: bold
        font-size: 32px
        line-height: 36px
        white-space: pre
      &-image
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        &::after
          +posa(0)
          content: ''
          background-color: rgba(black, 0.4)
        img
          width: 100%

</style>
