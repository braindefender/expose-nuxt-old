<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__title">
          Каталог выставок
        </div>
        <nuxt-link
          to="catalogue"
          class="cat-layout__action">
          Смотреть все
        </nuxt-link>
      </div>
      <div class="cat-layout__content">
        <div class="cat-layout__grid">
          <expose-card
            v-for="(item, index) in list"
            :key="index"
            :item="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExposeCard from '@/components/expose/ExposeCard';

export default {
  name: 'CataloguePreview',
  components: { ExposeCard },
  props: ['list'],
  data() {
    return {};
  },
};
</script>
