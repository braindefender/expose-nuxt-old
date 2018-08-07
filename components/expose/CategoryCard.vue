<template>

  <div class="cat-card">

    <div class="cat-card__inner cat-card__image-blur">
      <div class="cat-card__image-blur-container">
        <img :src="this.image" alt="">
      </div>
    </div>
    <div class="cat-card__inner cat-card__image">
      <img :src="this.image" alt="">
    </div>
    <div class="cat-card__inner cat-card__content cat-card__content--category">
      <div class="cat-card__content-title">
        Библиотечное дело
      </div>
      <div class="cat-card__content-info">
        4 выставки, 5 июля 2018
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'CategoryCard',
  props: ['image'],
  data() {
    return {};
  },
};
</script>
