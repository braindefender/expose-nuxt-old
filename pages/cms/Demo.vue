<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <Expose></Expose>
  </div>
</template>

<script>
import Navigation from '@/components/cms/Navigation';
import Expose from '@/pages/expose/_expose';

export default {
  name: 'Demo',
  components: { Navigation, Expose },
  data() {
    return {};
  },
};
</script>

<style lang="sass">

</style>
