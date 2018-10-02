<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__title">
          Категории
        </div>
        <div class="cat-layout__action">
          Смотреть все
        </div>
      </div>
      <div class="cat-layout__content">
        <div class="cat-layout__grid">
          <CategoryCard
            v-for="image in list"
            :key='image+list.indexOf(image)'
            :image="image"></CategoryCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from '@/components/expose/CategoryCard';

export default {
  name: 'CategoryPreview',
  components: { CategoryCard },
  data() {
    return {
      list: [],
    };
  },
};
</script>
