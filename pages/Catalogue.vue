<template>
  <div class="main">
    <section class="cover-section" :style="`background-image: url(${cover})`">
      <div class="cover-section__content">
        <h1>Каталог выставок ГПНТБ СО РАН</h1>
      </div>
    </section>
    <section class="content-section">
      <div class="cat-preview">
        <div class="cat-layout">
          <div class="cat-layout__panel">
            <div class="cat-layout__title">Каталог выставок</div>
            <div class="cat-layout__sort">
              <button type="button" class="cat-layout__sort-button">по алфавиту</button>
              <button
                type="button"
                class="cat-layout__sort-button cat-layout__sort-button--active"
              >по дате обновления</button>
            </div>
          </div>
          <div class="cat-layout__content">
            <div class="cat-layout__grid">
              <expose-card v-for="(item, index) in list" :key="index" :item="item"/>
            </div>
          </div>
          <div class="cat-layout__panel">
            <button @click="prevPage">Prev</button>
            <button @click="nextPage">Next</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import cover from '~/assets/images/alfons-morales-410757-unsplash.jpg';

import ExposeCard from '@/components/expose/ExposeCard';

export default {
  name: 'Catalogue',
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
    this.$axios.$get(`/catalogue/catalogue`).then(res => {
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
      this.$axios
        .$get(`/catalogue/catalogue?page=${this.currentPage}`)
        .then(res => {
          this.$set(this, 'list', res.catalogueList);
        });
    },
  },
};
</script>

<style lang="sass">
  @import '~/styles/main.sass'
</style>
