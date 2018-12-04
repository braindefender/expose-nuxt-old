<template>
  <div class="sidebar__content">
    <div class="sidebar-account">
      <div class="sidebar-account__avatar-box">
        <div class="sidebar-account__avatar"></div>
      </div>
      <div class="sidebar-account__text">
        <div class="sidebar-account__name">Читальный зал</div>
        <div class="sidebar-account__mail">readinghall@gpntbsib.ru</div>
      </div>
      <div class="sidebar-account__panel">
        <p>Модерируемых выставок:</p>
        <p>3</p>
      </div>
    </div>

    <sidebar-button text="Создать выставку" icon="add" @click="create"/>

    <div class="sidebar-button-box">
      <div
        v-for="(page, index) in statusList"
        :key="index"
        @click="getPages(page.name)"
        :class="pageName === page.name
          ? 'sidebar-button sidebar-button--active'
          : 'sidebar-button'"
      >
        <div :class="`sidebar-button__icon sidebar-button__icon--${page.name.toLowerCase()}`"></div>
        <div class="sidebar-button__text">{{ page.title }}</div>
      </div>
    </div>

    <div class="sidebar-button" @click="$auth.logout()">
      <div class="sidebar-button__icon sidebar-button__icon--exit"></div>
      <div class="sidebar-button__text">Выйти из аккаунта</div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

import SidebarButton from '~/components/cms/sidebar/SidebarButton';

export default {
  name: 'SidebarAccount',
  components: { SidebarButton },
  data() {
    return {
      statusList: this.$store.state.static.statusList,
    };
  },
  computed: {
    pageName() {
      return this.$store.state.currentStatus;
    },
  },
  mounted() {},
  methods: {
    getPages(type) {
      this.$store.dispatch('fetchExposeList', type).then(res => {
        this.$store.commit('set', {
          field: 'currentStatus',
          value: type,
        });
      });
    },
    create() {
      // this.$axios.$get('/cms/new').then(res => console.log(res));
      this.$store.dispatch('createNewExpose').then(() => {
        this.$router.push({ name: 'cms-Info', params: { fromcms: true } });
      });
    },
    getPageName() {
      return $nuxt.$route.path.split('/').pop();
    },
    logout() {
      Cookie.remove('auth');
      this.$store.commit('setAuth', null);
    },
  },
};
</script>

<style lang="sass">

</style>
