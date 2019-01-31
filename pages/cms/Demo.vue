<template>
  <div class="cms-new-page">
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <Expose :options="{
        fromcms: true
      }"></Expose>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/cms/sidebar/Sidebar';
import Expose from '@/pages/expose/_expose/index';

export default {
  name: 'Demo',
  middleware: 'auth',
  components: { Sidebar, Expose },
  mounted() {
    if (this.$route.params.fromcms !== true) {
      this.$router.push({ path: '/cms/list' });
      this.canSyncState = false;
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
