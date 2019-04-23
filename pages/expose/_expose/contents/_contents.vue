<template>
  <div class="contents">
    <div v-if="book" class="contents__wrapper">
      <a
        :href="`/expose/${path.expose}/book/${path.book}`"
        class="contents__return"
      >Вернуться к книге</a>
      <div class="contents__title">{{ book.title }}</div>
      <div class="contents__body">{{ contents }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contents',
  mounted() {
    this.$axios
      .get(`/expose/${this.path.expose}/contents/${this.path.book}`)
      .then(res => {
        this.book = res.data;
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
    };
  },
  computed: {
    contents() {
      const c = this.book.contents.replace(
        /[ ]/g,
        String.fromCharCode('U+2007'),
      );
      return c;
    },
    path() {
      const path = this.$route.path.split('/');
      return {
        expose: path[path.length - 3],
        book: path[path.length - 1],
      };
    },
  },
};
</script>


<style lang="sass">

@import '~/styles/vars.sass'
@import '~/styles/mixins.sass'

.contents
  display: flex
  justify-content: center

  &__wrapper
    width: 1024px
    padding: 20px
    display: flex
    flex-direction: column
    word-wrap: break-word
    white-space: pre-wrap

  &__title
    width: 80%
    font-weight: bold
    margin-bottom: 15px

  &__body
    width: 100%
    font-size: 16px
    font-family: monospace

  &__return
    +tdn
    color: $color-accent
    margin-bottom: 15px



</style>
