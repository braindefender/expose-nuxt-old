<template>
  <div class="sidebar__content">

    <nuxt-link class="sidebar-button" :to="{ path: 'list' }">
      <div class="sidebar-button__icon sidebar-button__icon--home"></div>
      <div class="sidebar-button__text">На главный экран</div>
    </nuxt-link>

    <div class="sidebar-button-box">
      <nuxt-link
        v-for="(page, index) in pageList"
        :key="index"
        :to="{ name: `cms-${page.name}`, params: { cms: true } }"
        :class="pageName === page.name
          ? 'sidebar-button sidebar-button--active'
          : 'sidebar-button'">
        <div :class="`sidebar-button__icon sidebar-button__icon--${page.name.toLowerCase()}`"></div>
        <div class="sidebar-button__text">{{ page.title }}</div>
      </nuxt-link>
    </div>

    <div class="sidebar-button" @click="final">
      <div class="sidebar-button__icon sidebar-button__icon--save"></div>
      <div class="sidebar-button__text">Сохранить</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SidebarNavigation',
  data() {
    return {
      pageList: this.$store.state.pageList,
      pageName: '',
    };
  },
  methods: {
    getPageName() {
      return $nuxt.$route.path.split('/').pop();
    },
    final() {
      this.$store.dispatch('pushFinalState');
      this.$router.push('list');
    },
  },
  mounted() {
    this.pageName = this.getPageName();
  },
};
</script>

<style lang="sass">

</style>
