<template>
  <div class="main">
    <section class="cover-section" :style="`background-image: url(${cover})`">
      <div class="cover-section__content">
        <h1>Каталог выставок ГПНТБ СО РАН</h1>
      </div>
    </section>
    <section class="content-section">
      <slider></slider>
      <catalogue-preview v-if="catalogueList !== ''" :list="catalogueList"></catalogue-preview>
      <category-preview v-if="categoryList !== undefined" :list="categoryList"></category-preview>
    </section>
  </div>
</template>

<script>
import cover from '~/assets/images/alfons-morales-410757-unsplash.jpg';

import CataloguePreview from '~/components/expose/catalogue/CataloguePreview';
import CategoryPreview from '~/components/expose/category/CategoryPreview';
import Slider from '~/components/expose/slider/Slider';

export default {
  components: { CataloguePreview, CategoryPreview, Slider },
  name: 'Main',
  data() {
    return {
      cover,
      categoryList: undefined,
      catalogueList: undefined,
      local: false,
    };
  },
  mounted() {
    if (!this.local) {
      this.$axios.$get('/catalogue/main').then(res => {
        this.catalogueList = res.catalogueList;
        this.categoryList = res.categoryList;
      });
    } else {
      this.catalogueList = this.$store.state.local.catalogueList;
      this.categoryList = this.$store.state.local.categoryList;
    }
  },
};
</script>

<style lang="sass">
  @import '~/styles/mixins.sass'

  .main
    .cover-section
      position: relative
      // aspect ratio 375 x 120
      height: 0
      width: 100%
      padding-top: 25%
      background: #333 center center no-repeat
      background-size: cover
      color: white
      &__content
        +posa(0)
        background-color: rgba(black, 0.25)
        display: flex
        align-items: center
        flex-direction: column
        justify-content: center
        h1
          font-weight: bold
          font-size: 2.5em
    .content-section
      display: flex
      justify-content: center
      flex-direction: column

  @media only screen and (max-width : 320px)
    .main
      .cover-section
        &__content
          background-color: rgba(black, 0.5)
          h1
            font-size: 20px
</style>
