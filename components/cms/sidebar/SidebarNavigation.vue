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
          : 'sidebar-button'"
      >
        <div :class="`sidebar-button__icon sidebar-button__icon--${page.name.toLowerCase()}`"></div>
        <div class="sidebar-button__text">{{ page.title }}</div>
      </nuxt-link>
    </div>

    <div class="sidebar-button-box">
      <div class="sidebar-button" @click="save">
        <div class="sidebar-button__icon sidebar-button__icon--save"></div>
        <div class="sidebar-button__text">Сохранить</div>
        <div class="sidebar-button__overlay" ref="saveButton">Сохранено</div>
      </div>

      <div class="sidebar-button" @click="final">
        <div class="sidebar-button__icon sidebar-button__icon--save"></div>
        <div class="sidebar-button__text">Опубликовать</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarNavigation',
  data() {
    return {
      pageList: this.$store.state.static.pageList,
      pageName: '',
    };
  },
  methods: {
    animateSave() {
      const el = this.$refs.saveButton;
      el.velocity(
        { opacity: 1 },
        {
          duration: 250,
          complete: () => {
            el.velocity({ opacity: 0 }, { delay: 1000, duration: 250 });
          },
        },
      );
    },
    getPageName() {
      return $nuxt.$route.path.split('/').pop();
    },
    final() {
      this.$store.dispatch('pushFinalState').then(() => {
        this.$router.push('list');
      });
    },
    save() {
      this.$store.dispatch('syncState').then(res => {
        this.animateSave();
      });
    },
  },
  mounted() {
    this.pageName = this.getPageName();
  },
};
</script>

<style lang="sass">

</style>
