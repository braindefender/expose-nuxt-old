<template>
  <div class="fullscreen-container book-page">
    <div v-if="expose" class="book-page__return">
      <div class="book-page__return-image">
        <img :src="exposeImage" :alt="expose.title">
      </div>
      <a :href="`/expose/${expose.link}`" class="book-page__return-link">{{ expose.title }}</a>
    </div>

    <book-popup v-if="book" :book="book" :opened="true"/>
  </div>
</template>

<script>
import BookPopup from '~/components/expose/BookPopup';

export default {
  name: 'Item',
  components: {
    BookPopup,
  },
  mounted() {
    this.$axios
      .get(`/expose/${this.path.expose}/book/${this.path.book}`)
      .then(res => {
        this.$axios
          .$get('/info/return', {
            params: { _id: res.data.id, title: this.path.expose },
          })
          .then(resp => {
            this.book = res.data;
            this.expose = resp.expose;
          })
          .catch(err => {
            console.log('Error: cannot get return object', err);
          });
      })
      .catch(err => {
        console.log(`Error: get book named: ${this.path.book}`, err);
        this.$router.push({ path: '/' });
      });
  },
  data() {
    return {
      exposeLink: '',
      bookLink: '',
      book: undefined,
      expose: undefined,
    };
  },
  computed: {
    path() {
      const path = $nuxt.$route.path.split('/');
      return {
        expose: path[path.length - 3],
        book: path[path.length - 1],
      };
    },
    exposeImage() {
      if (this.expose) {
        if (this.expose.source !== undefined) {
          return this.expose.cover !== ''
            ? this.expose.cover
            : this.$store.state.static.sourceList[this.expose.source].image;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    },
  },
};
</script>

<style lang="sass">

@import '~/styles/mixins.sass'

.fullscreen-container
  +posa(0px)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: rgba(black, 0.1)

.book-page
  &__return
    width: 1024px
    margin-bottom: 30px
    position: relative
    z-index: 5
    border-radius: 10px
    overflow: hidden
    &::after
      +posa(0)
      content: ''
      background-color: rgba(black, 0.4)
  &__return-image
    +posa(0)
    display: flex
    align-items: center
    img
      width: 100%
  &__return-link
    +tdn
    position: relative
    z-index: 10
    display: flex
    align-items: center
    height: 60px
    padding-left: 50px
    color: white
    &::after
      +posa(0)
      left: 20px
      right: auto
      width: 15px
      content: ''
      background: url('~/assets/icon-chevron-left.svg') center center no-repeat

</style>
