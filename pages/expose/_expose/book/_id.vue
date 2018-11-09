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
      .get(`/expose/${this.path.expose}/book/${this.path.book}`)
      .then(res => {
        this.$axios
          .$get('/info/return', {
            params: { _id: res.data.id },
          })
          .then(resp => {
            console.log('in book', res.data);
            console.log('in return', resp);
            this.book = res.data;
            this.book.expose = resp.expose;
          })
          .catch(err => {
            console.log('Error: cannot get return object', err);
          });
      })
      .catch(err => {
        console.log(`Error: get book named: ${this.path.book}`, err);
        // this.$router.push({ path: '/' });
      });
  },
  data() {
    return {
      exposeLink: '',
      bookLink: '',
      // book: undefined,
      book: {
        expose: {},
        cover: '',
        title:
          'Фазовый состав многокомпонентных гамма-сплавов на основе алюминидов титана: учеб. пособие',
        year: 2017,
        source: 'ВИАМ',
        authors: ['Белов Н.А.', 'Белов В.Д.', 'Дашкевич Н.И.'],
        author: 'Белов Н.А.',
        annotation:
          'В учебном пособии обобщены результаты экспериментальных и расчетных исследований авторов в области многокомпонентных гамма-сплавов на основе алюминидов титана. С использованием программы Thermo-Calc проанализировано влияние наиболее часто используемых легирующих элементов на структуру и фазовый состав. Приведены результаты экспериментальных плавок по приготовлению гамма-сплавов типа TNM. \n\nКнига рассчитана на широкий круг специалистов, которые используют для работы гамма-сплавы, а также может быть полезна аспирантам и магистрантам, обучающимся по материаловедческим специальностям, прежде всего в области легких сплавов, при выполнении диссертационных и квалификационных работ, связанных с гамма-сплавами.',
        info: [
          {
            name: 'ISBN',
            value: '8-800555-3535',
          },
        ],
      },
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
  },
};
</script>
