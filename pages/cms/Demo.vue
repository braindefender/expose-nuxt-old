<template>
  <div class="cms-new-page">
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <Expose :options="{
        cms: true
      }"></Expose>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/cms/sidebar/Sidebar';
import Expose from '@/pages/expose/_expose/index';

export default {
  name: 'Demo',
  components: { Sidebar, Expose },
  mounted() {
    if (this.$route.params.cms !== true) {
      this.$router.push({ path: '/cms/list' });
      this.canSyncState = false;
    } else {
      // this.fetchState();
    }
  },
  beforeDestroy() {
    if (this.canSyncState) {
      // this.syncState();
    }
  },
  data() {
    return {
      canSyncState: true,
    };
  },
  methods: {
    fetchState() {
      this.$store.dispatch('fetchState');
    },
  },
};
</script>

<style lang="sass">

</style>
