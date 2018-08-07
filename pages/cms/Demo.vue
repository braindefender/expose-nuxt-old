<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <ExposePage></ExposePage>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/cms/Navigation';
import ExposePage from '@/components/expose/ExposePage';

export default {
  name: 'Demo',
  components: { Navigation, ExposePage },
  data() {
    return {};
  },
};
</script>

<style lang="sass">

</style>
