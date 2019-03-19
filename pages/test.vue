<template>
  <div class="fullscreen-container">
    <category-card/>
  </div>
</template>

<script>
import CategoryCard from '~/components/expose/category/CategoryCard';

export default {
  name: 'Test',
  components: { CategoryCard },
  data() {
    return {};
  },
};
</script>

<style lang="sass">

</style>
