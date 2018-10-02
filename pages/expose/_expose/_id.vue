<template>
  <book-page
    v-if="book !== undefined"
    :book="book"/>
</template>

<script>
import BookPage from '~/components/expose/BookPage';

export default {
  name: 'Item',
  components: {
    BookPage,
  },
  mounted() {
    this.$axios
      .get(`/expose/${this.path.expose}/${this.path.book}`)
      .then(res => {
        this.book = res;
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
    path() {
      const path = $nuxt.$route.path.split('/');
      return {
        expose: path[path.length - 2],
        book: path[path.length - 1],
      };
    },
  },
};
</script>
