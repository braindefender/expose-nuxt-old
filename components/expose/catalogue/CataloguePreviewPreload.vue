<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__title preloader-mask">Каталог выставок</div>
        <nuxt-link to="catalogue" class="cat-layout__action preloader-mask">Смотреть все</nuxt-link>
      </div>
      <div class="cat-layout__content">
        <div class="cat-layout__grid">
          <expose-card-preload v-for="(item, index) in [1,2,3,4,5,6]" :key="index" :item="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExposeCardPreload from '@/components/expose/ExposeCardPreload';

export default {
  name: 'CataloguePreviewPreload',
  components: { ExposeCardPreload },
  props: ['list'],
  data() {
    return {};
  },
};
</script>
