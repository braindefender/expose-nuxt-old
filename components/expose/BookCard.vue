<template>
    <div class="book-card" v-if="this.item.image">
      <div class="book-card__image">{{ this.item.image }}</div>
      <div class="book-card__content">
        <div
          :class="this.item.author
            ? 'book-card__author'
            : 'book-card__author book-card__author--gray'">
          {{ author }}
        </div>
        <div class="book-card__title">{{ this.item.title }}</div>
        <div class="book-card__info">{{ info }}</div>
        <div class="book-card__annotation">{{ this.item.annotation || 'Информация отсутствует' }}</div>
      </div>
    </div>
    <div class="book-card book-card--small" v-else>
      <div class="book-card__line">
        <div
          :class="this.item.author
            ? 'book-card__author'
            : 'book-card__author book-card__author--gray'">
          {{ author }}
        </div>
        <div class="book-card__info">{{ info }}</div>
      </div>
      <div class="book-card__line">
        <div class="book-card__title book-card__title--small">
          {{ this.item.title }}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: ['item'],
  data() {
    return {
      source: this.item.source || '',
      year: this.item.year || '',
      pages: this.item.pages ? `${this.item.pages} с.` : '',
      author: this.item.author || 'Автор не указан',
    };
  },
  computed: {
    info() {
      return [this.source, this.year, this.pages]
        .filter(el => el !== '')
        .join(', ');
    },
  },
};
</script>

<style lang="sass" scoped>

  @import '@/styles/vars.sass'




</style>
