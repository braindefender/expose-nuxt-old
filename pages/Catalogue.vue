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
      <div class="cat-preview">
        <div class="cat-layout">
          <div class="cat-layout__panel">
            <div class="cat-layout__title">Каталог выставок</div>
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
              <expose-card
                v-for="(item, index) in list"
                :key="index"
                :item="item"/>
            </div>
          </div>
          <div class="cat-layout__panel">
            <button @click="prevPage">Prev</button>
            <button @click="nextPage">Next</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import cover from '~/assets/images/alfons-morales-410757-unsplash.jpg';

import ExposeCard from '@/components/expose/ExposeCard';

export default {
  name: 'Category',
  components: { ExposeCard },
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
      console.log(res);
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
      if (this.currentPage < this.pages) {
        this.currentPage += 1;
        this.fetchPage();
      }
    },
    fetchPage() {
      this.$axios.$get(`/catalogue?page=${this.currentPage}`).then(res => {
        this.$set(this, 'list', res.catalogueList);
      });
    },
  },
};
</script>
