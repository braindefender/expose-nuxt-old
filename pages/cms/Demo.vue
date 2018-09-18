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
import Expose from '@/pages/expose/_expose/index';

export default {
  name: 'Demo',
  components: { Navigation, Expose },
  data() {
    return {};
  },
  mounted() {
    // if (this.$route.params.cms !== true) {
    // }
    this.fetchState();
  },
  beforeDestroy() {},
  methods: {
    fetchState() {
      this.$store.dispatch('fetchState');
    },
  },
};
</script>

<style lang="sass">

</style>
