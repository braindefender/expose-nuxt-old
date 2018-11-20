<template>

  <div class="cat-card">

    <div class="cat-card__inner cat-card__image-blur">
      <div class="cat-card__image-blur-container">
        <img :src="this.item.image" :alt="meta">
      </div>
    </div>
    <div class="cat-card__inner cat-card__image">
      <img :src="this.item.image" :alt="meta">
    </div>
    <div class="cat-card__inner cat-card__content cat-card__content--category">
      <div class="cat-card__content-title">
        {{this.item.title}}
      </div>
      <div class="cat-card__content-info">
        {{ `Выставок:${this.item.count}, ${this.item.date}`}}
      </div>
    </div>

  </div>

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
    object() {
      return {
        categoryItem: {
          title: 'Название категории',
          date: 'Дата обновления',
          count: 'Число выставок в категории',
          image: 'Обложка категории',
        },
        catalogueItem: {
          title: 'Название выставки',
          date: 'Дата создания',
          image: 'Обложка выставки',
        },
      };
    },
  },
};
</script>

<style lang="sass">
  @import '@/styles/mixins.sass'
  @import '@/styles/expose-card.sass'

  .e-card
    &__info--catalogue
      .e-card__title
        max-width: 75%
        font-size: 1em
        line-height: 1.1em
        font-weight: bold
        white-space: pre
      .e-card__date
        position: absolute
        right: 20px
        bottom: 20px
        font-size: 0.8em
        line-height: 0.9em
</style>
