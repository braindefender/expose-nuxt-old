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

      <slider></slider>

      <catalogue-preview
        v-if="catalogueList !== ''"
        :list="catalogueList">
      </catalogue-preview>

      <category-preview
        v-if="categoryList !== undefined"
        :list="categoryList">
      </category-preview>

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
