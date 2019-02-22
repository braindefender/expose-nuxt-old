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
    <div class="e-card__layer e-card__info e-card__info--catalogue" @click="redirect">
      <div class="e-card__title">{{ item.title }}</div>
      <div class="e-card__date">{{ prettyDate }}</div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'ExposeCard',
  props: {
    item: { type: Object, default: () => {} },
    options: { type: Object, default: () => undefined },
  },
  computed: {
    prettyDate() {
      const date = new Date(this.item.dates.public);
      const months = this.$store.state.static.months;
      return `${date.getDate()} ${
        months[date.getMonth()]
      }, ${date.getFullYear()}`;
    },
    meta() {
      return `${this.item.title} - ${this.item.dates.from}`;
    },
    image() {
      return this.item.image
        ? this.item.image
        : this.$store.state.static.sourceList[this.item.source].image;
    },
    link() {
      if (this.options && this.options.fromcms) {
        return '#';
      } else {
        const name = this.item.mode ? `ВНП` : this.item.shortLink;
        // const name = this.item.title
        //   .split('\n')
        //   .join('~')
        //   .split(' ')
        //   .join('_');
        return `/expose/${name}-${this.item.source}-${this.item._id.slice(-8)}`;
      }
    },
  },
  methods: {
    redirect() {
      if (this.options && this.options.fromcms) {
        this.$store.dispatch('fetchState', this.item._id).then(res => {
          // если не дали загрузить, то обновить экран
          this.$router.push({ name: 'cms-Info', params: { fromcms: true } });
        });
      }
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/expose-card.sass'

</style>
