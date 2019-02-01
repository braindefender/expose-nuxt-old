<template>
  <a class="e-card" :href="link">
    <div class="e-card__layer e-card__shadow-blur">
      <div class="e-card__shadow-blur-container">
        <img :src="image" :alt="meta">
      </div>
    </div>
    <div class="e-card__layer e-card__image">
      <img :src="image" :alt="meta">
    </div>
    <div class="e-card__layer e-card__info e-card__info--category" @click="redirect">
      <div class="e-card__title">{{ item.title }}</div>
      <div class="e-card__info">{{ `Выставок: ${item.count}, ${item.date}`}}</div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: ['item'],
  data() {
    return {};
  },
  computed: {
    meta() {
      return `${this.item.title} - ${this.item.date}`;
    },
    image() {
      return this.item.image;
    },
    object() {
      return {
        categoryItem: {
          title: 'Название категории',
          date: 'Дата обновления',
          count: 'Число выставок в категории',
          image: 'Обложка категории',
        },
      };
    },
  },
};
</script>

<style lang="sass">
  @import '@/styles/expose-card.sass'
  @import '@/styles/category-card.sass'
</style>
