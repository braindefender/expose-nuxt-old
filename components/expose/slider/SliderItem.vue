<template>
  <div class="slider-item" @click="redirect">
    <div
      v-if="image"
      class="slider-item__inner slider-item__image">
      <img :src="image" :alt="meta">
    </div>
    <div class="slider-item__inner slider-item__content">
      <div class="slider-item__title">{{ item.title }}</div>
      <div class="slider-item__info">
        <div
          v-if="item.dates.from"
          class="slider-item__date">
          {{ prettyDate }}
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
    image() {
      return this.item.image
        ? this.item.image
        : this.$store.state.sourceList[this.item.source].image;
    },
    meta() {
      return `${this.item.title}, ${this.item.dateFrom}, ${this.item.source}`;
    },
    source() {
      switch (this.item.source) {
        case 0:
          return 'ГПНТБ СО РАН';
        case 1:
          return 'Отделение ГПНТБ СО РАН';
      }
    },
    prettyDate() {
      const date = new Date(this.item.dates.from);
      const months = this.$store.state.months;
      return `${date.getDate()} ${
        months[date.getMonth()]
      }, ${date.getFullYear()}`;
    },
  },
  methods: {
    redirect() {
      const name = this.item.title
        .split('\n')
        .join('~')
        .split(' ')
        .join('_');
      this.$router.push({
        path: `/expose/${name}-${this.item.dates.create}`,
      });
    },
  },
};
</script>
