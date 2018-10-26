<template>

  <div class="cat-card">

    <div class="cat-card__inner cat-card__image-blur">
      <div class="cat-card__image-blur-container">
        <img :src="this.image" :alt="meta">
      </div>
    </div>
    <div class="cat-card__inner cat-card__image">
      <img :src="this.image" :alt="meta">
    </div>
    <div @click="redirect"
      class="cat-card__inner cat-card__content cat-card__content--catalogue">
      <div class="cat-card__content-title">{{ this.item.title }}</div>
      <div class="cat-card__content-date">{{ prettyDate }}</div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'CatalogueCard',
  props: ['item', 'options'],
  data() {
    return {};
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
      return `${this.item.title} - ${this.item.dateFrom}`;
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
          this.$router.push({ name: 'cms-Info', params: { cms: true } });
        });
      } else {
        this.$router.push({
          path: `/expose/${this.item.title.split(' ').join('_')}-${
            this.item.dates.public
          }`,
        });
      }
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'

  .cat-card
    width: 395px
    height: 120px
    position: relative
    background-color: #333
    border-radius: 5px
    cursor: pointer
    &:hover
      .cat-card__image-blur
        opacity: 0.6
    &__inner
      +posa(0)
    &__image
      width: 100%
      overflow: hidden
      border-radius: 5px
      display: flex
      align-items: center
      justify-content: center
      -webkit-mask-image: -webkit-radial-gradient(white, black)
      img
        animation: slide 20s alternate infinite ease-in-out
        width: 100%
      &::after
        +posa(0)
        content: ''
        background-color: rgba(black, 0.4)
    &__image-blur
      +blur-bg
      transition: all ease 0.3s
      &-container
        img
          animation: slide 20s alternate infinite linear
    &__content
      padding: 20px
      color: white
      &--category
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .cat-card__content-title
          max-width: 265px
          font-size: 20px
          line-height: 22px
          font-weight: bold
          font-family: "PT Sans"
          white-space: pre
        .cat-card__content-info
          padding-top: 3px
          font-size: 13px
          line-height: 15px
      &--catalogue
        .cat-card__content-title
          max-width: 265px
          font-size: 16px
          line-height: 17px
          font-weight: bold
          font-family: "PT Sans"
          white-space: pre
        .cat-card__content-date
          position: absolute
          right: 20px
          bottom: 20px
          font-size: 13px
          line-height: 15px

</style>
