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
import CategoryCard from '@/components/CategoryCard';

import image1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';
import image2 from '@/assets/images/chad-kirchoff-202730-unsplash.jpg';
import image3 from '@/assets/images/ren-ran-232078-unsplash.jpg';
import image4 from '@/assets/images/stock-1863880_1920.jpg';

export default {
  name: 'CategoryPreview',
  components: { CategoryCard },
  data() {
    return {
      list: [image1, image2, image3, image4],
    };
  },
};
</script>
