<template>
  <div class="cms-card">
    <div class="cms-card__layer cms-card__shadow-blur">
      <div class="cms-card__shadow-blur-container">
        <img :src="image" :alt="meta">
      </div>
    </div>
    <div class="cms-card__layer cms-card__image">
      <img :src="image" :alt="meta">
    </div>
    <div class="cms-card__layer cms-card__info" @click="redirect">
      <div class="cms-card__title">{{ item.title }}</div>
      <div class="cms-card__date">{{ prettyDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CMSCard',
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

  .cms-card
    position: relative
    background-color: #333
    border-radius: 0.5em
    cursor: pointer
    width: 375px
    height: 120px
    &:hover
      .cms-card__shadow-blur
        opacity: 0.8
    &__layer
      +posa(0)
    &__info
      padding: 20px
      color: white
      display: flex
      flex-direction: column
      justify-content: space-between
      .cms-card__title
        max-width: 90%
        font-size: 16px
        line-height: 18px
        font-weight: bold
      .cms-card__date
        text-align: right
        font-size: 13px
    &__image
      width: 100%
      overflow: hidden
      border-radius: inherit
      display: flex
      align-items: center
      justify-content: center
      -webkit-mask-image: -webkit-radial-gradient(white, black)
      img
        width: 100%
      &::after
        +posa(0)
        content: ''
        background-color: rgba(black, 0.45)
    &__shadow-blur
      +blur-bg
      transition: all ease 0.25s

</style>
