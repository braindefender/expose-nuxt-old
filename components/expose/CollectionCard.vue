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
    <div class="e-card__layer e-card__info e-card__info--collection">
      <div class="e-card__title">{{ item.title }}</div>
      <div class="e-card__date">{{ prettyDate }}</div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'CollectionCard',
  props: {
    item: { type: Object, default: () => {} },
    options: { type: Object, default: () => undefined },
  },
  computed: {
    prettyDate() {
      const dateObj = new Date(this.item.date);
      const currentYear = new Date().getFullYear();
      const date = dateObj.getDate();
      const month = this.$store.static.months[dateObj.getMonth()];
      const year = dateObj.getFullYear();

      let output = `${date} ${month}`;

      if (currentYear != year) {
        output += ` ${year}`;
      }

      return output;
    },
    meta() {
      return `${this.item.title} - ${this.prettyDate}`;
    },
    image() {
      return this.item.image;
    },
    link() {
      return `/collections/${this.item.link}`;
    },
  },
};
</script>
