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
  @import '~/styles/main.sass'
</style>
