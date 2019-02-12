<template>
  <div class="sidebar__content">
    <div class="sidebar-account">
      <div class="sidebar-account__avatar-box">
        <div class="sidebar-account__avatar"></div>
      </div>
      <div class="sidebar-account__text">
        <div class="sidebar-account__name">{{user.username}}</div>
        <div class="sidebar-account__mail">{{user.email}}</div>
      </div>
    </div>

    <sidebar-button
      text="Создать выставку"
      icon="add"
      @click="create"
      v-tooltip.left="{content:  'Создать выставку', classes: 'popover'}"
    />
    <div class="sidebar-button-box">
      <div
        v-for="(page, index) in statusList"
        :key="index"
        @click="getPages(page.name)"
        v-tooltip.left="{content: page.title, classes: 'popover'}"
        :class="pageName === page.name
          ? 'sidebar-button sidebar-button--active'
          : 'sidebar-button'"
      >
        <div :class="`sidebar-button__icon sidebar-button__icon--${page.name.toLowerCase()}`"></div>
        <div class="sidebar-button__text">{{ page.title }}</div>
      </div>
    </div>

    <div
      class="sidebar-button"
      @click="logout"
      v-tooltip.left="{content: 'Выйти из аккаунта', classes: 'popover'}"
    >
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
    user() {
      return this.$store.state.auth.user;
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
      this.$auth.logout().then(() => {
        Cookie.remove('auth');
        this.$router.push('/cms');
      });
    },
  },
};
</script>
