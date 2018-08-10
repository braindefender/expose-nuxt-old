<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__title">
          Категории
        </div>
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
          <category-card
            v-for="(item, index) in list"
            :key="index"
            :item="item">
          </category-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from '@/components/expose/CategoryCard';

export default {
  name: 'Category',
  components: { CategoryCard },
  props: ['list'],
  data() {
    return {};
  },
};
</script>
