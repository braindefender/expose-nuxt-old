<template>
  <div class="main">
    <section class="cover-section" :style="`background-image: url(${cover})`">
      <div class="cover-section__content">
        <h1>Каталог выставок ГПНТБ СО РАН</h1>
      </div>
    </section>
    <section class="content-section">
      <slider/>
      <catalogue-preview v-if="catalogueList !== ''" :list="catalogueList"/>
      <category-preview v-if="categoryList !== ''" :list="categoryList"/>
    </section>
    <section v-if="preload" class="content-section content-section--preload">
      <slider-preload/>
      <catalogue-preview-preload/>
      <!-- <category-preload/> -->
    </section>
  </div>
</template>

<script>
import cover from '~/assets/images/alfons-morales-410757-unsplash.jpg';

import CataloguePreview from '~/components/expose/catalogue/CataloguePreview';
import CataloguePreviewPreload from '~/components/expose/catalogue/CataloguePreviewPreload';
import CategoryPreview from '~/components/expose/category/CategoryPreview';
import Slider from '~/components/expose/slider/Slider';
import SliderPreload from '~/components/expose/slider/SliderPreload';

export default {
  components: {
    CataloguePreview,
    CataloguePreviewPreload,
    CategoryPreview,
    Slider,
    SliderPreload,
  },
  name: 'Main',
  data() {
    return {
      cover,
      categoryList: '',
      catalogueList: '',
      local: false,
      preload: true,
    };
  },
  mounted() {
    if (!this.local) {
      this.$axios.$get('/catalogue/main').then(res => {
        this.preload = false;
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
  @import '~/styles/main.sass'
</style>
