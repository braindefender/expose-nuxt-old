<template>
  <div class="e-card">
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
  </div>
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
      const months = this.$store.state.months;
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
        : this.$store.state.sourceList[this.item.source].image;
    },
  },
  methods: {
    redirect() {
      if (this.options && this.options.cms) {
        this.$store.dispatch('fetchState', this.item._id).then(res => {
          // если не дали загрузить, то обновить экран
          this.$router.push({ name: 'cms-Info', params: { cms: true } });
        });
      } else {
        const name = this.item.title
          .split('\n')
          .join('~')
          .split(' ')
          .join('_');
        this.$router.push({
          path: `/expose/${name}-${this.item.dates.create}`,
        });
      }
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
