<template>
  <div class="slider-item">
    <div class="slider-item__inner slider-item__image">
      <img :src="item.image" :alt="meta">
    </div>
    <div class="slider-item__inner slider-item__content">
      <div class="slider-item__title">
        {{ item.title }}
      </div>
      <div class="slider-item__info">
        <div class="slider-item__date">
          {{ item.date }}
        </div>
        <div class="slider-item__place">
          {{ source }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderItem',
  props: ['item'],
  data() {
    return {};
  },
  computed: {
    meta() {
      return `${this.item.title}, ${this.item.date}, ${this.item.source}`;
    },
    source() {
      switch (this.item.source) {
        case 0:
          return 'ГПНТБ СО РАН';
        case 1:
          return 'Отделение ГПНТБ СО РАН';
      }
    },
  },
};
</script>

<style lang="sass">

</style>
