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
import cover from '~/assets/images/alfons-morales-410757-unsplash.jpg';

import CategoryCard from '@/components/expose/CategoryCard';

export default {
  name: 'Category',
  components: { CategoryCard },
  data() {
    return {
      cover,
      list: [],
      currentPage: 1,
      pages: null,
    };
  },
  mounted() {
    this.$axios.$get(`/catalogue`).then(res => {
      this.list = res.catalogueList;
      this.pages = res.pages;
    });
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.fetchPage();
      }
    },
    nextPage() {
      if (this.currentPage < pages) {
        this.currentPage += 1;
        this.fetchPage();
      }
    },
    fetchPage() {
      this.$axios.$get(`/catalogue?page=${currentPage}`).then(res => {
        Vue.$set(this, 'list', res.catalogueList);
      });
    },
  },
};
</script>
