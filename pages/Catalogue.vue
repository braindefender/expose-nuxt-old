<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__titl">Каталог выставок</div>
        <div class="cat-layout__sort">
          <button type="button"
            class="cat-layout__sort-button">
            по алфавиту</button>
          <button type="button"
            class="cat-layout__sort-button cat-layout__sort-button--active">
            по дате обновления</button>
        </div>
      </div>
      <div class="cat-layout__content">
        <div class="cat-layout__grid">
          <catalogue-card
            v-for="(item, index) in list"
            :key="index"
            :item="item">
          </catalogue-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogueCard from '@/components/expose/CatalogueCard';

export default {
  name: 'Category',
  components: { CatalogueCard },
  props: ['list'],
  data() {
    return {};
  },
};
</script>
