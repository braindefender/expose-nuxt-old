<template>
  <div class="cms-page cms-page--white">
    <Navigation></Navigation>
    <Expose :options="{
      cms: true
    }"></Expose>
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
  mounted() {
    this.fetchState();
  },
  beforeDestroy() {},
  methods: {
    fetchState() {
      this.$store.dispatch('fetchSortState');
    },
  },
};
</script>

<style lang="sass">

</style>
