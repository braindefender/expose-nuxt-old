<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__title">Категории</div>
        <div class="cat-layout__action">Смотреть все</div>
      </div>
      <div class="cat-layout__content">
        <div class="cat-layout__grid">
          <CategoryCard v-for="item in list" :key="item.title" :item="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from '@/components/expose/category/CategoryCard';

export default {
  name: 'CategoryPreview',
  components: { CategoryCard },
  props: ['list'],
  data() {
    return {
      // list: this.$store.state.local.categoryList,
    };
  },
};
</script>
