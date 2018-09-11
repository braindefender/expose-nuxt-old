<template>
  <div class="cms-page">
    <book-page></book-page>
  </div>
</template>

<script>
import BookPage from '~/components/expose/BookPage';

export default {
  name: 'Test',
  components: {
    BookPage,
  },
  data() {
    return {};
  },
};
</script>
