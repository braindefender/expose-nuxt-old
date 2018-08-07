<template>
  <div class="hello">
    <ContentSelector :list="this.list"></ContentSelector>
    <BookCard :item="this.item"></BookCard>
  </div>
</template>

<script>
import ContentSelector from '@/components/ContentSelector';
import BookCard from '@/components/BookCard';

export default {
  name: 'HelloWorld',
  components: { ContentSelector, BookCard },
  data() {
    return {
      list: [
        'Item 1 with long naming that cannot be placed in one row',
        'Item 2 with long naming that cannot be placed in one row',
        'Item 3 with long naming that cannot be placed in one row',
      ],
      item: {
        title: 'Эй ты опять нажрался',
        author: 'Мемчес',
        description: 'Дед с батей сцепились не на шутку, каждый день одно и то же нахой',
        info: '<KBASFAKK<>>',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
