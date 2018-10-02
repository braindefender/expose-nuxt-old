<template>
  <div class="sidebar__content">
    <div class="sidebar-account">
      <div class="sidebar-account__avatar-box">
        <div class="sidebar-account__avatar"></div>
      </div>
      <div class="sidebar-account__text">
        <div class="sidebar-account__name">Васильева Елена Семёновна</div>
        <div class="sidebar-account__mail">makakakakala@gpntbsib.ru</div>
      </div>
      <div class="sidebar-account__panel">
        <p>Модерируемых выставок:</p>
        <p>3</p>
      </div>
    </div>

    <div class="sidebar-button"
      @click="create">
      <div class="sidebar-button__icon sidebar-button__icon--create"></div>
      <div class="sidebar-button__text">Создать выставку</div>
    </div>

    <div class="sidebar-button-box">
      <div
        v-for="(page, index) in statusList"
        :key="index"
        @click="getPages(page.name)"
        :class="pageName === page.name
          ? 'sidebar-button sidebar-button--active'
          : 'sidebar-button'">
        <div :class="`sidebar-button__icon sidebar-button__icon--${page.name.toLowerCase()}`"></div>
        <div class="sidebar-button__text">{{ page.title }}</div>
      </div>
    </div>

    <div class="sidebar-button"
      @click="create">
      <div class="sidebar-button__icon sidebar-button__icon--exit"></div>
      <div class="sidebar-button__text">Выйти из аккаунта</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarAccount',
  data() {
    return {
      statusList: this.$store.state.statusList,
      pageName: '',
    };
  },
  methods: {
    getPages(type) {
      this.$store.dispatch('fetchExposeList', type);
    },
    create() {
      // this.$axios.$get('/cms/new').then(res => console.log(res));
      this.$store.dispatch('createNewExpose').then(() => {
        this.$router.push({ name: 'cms-Info', params: { cms: true } });
      });
    },
  },
};
</script>

<style lang="sass">

</style>
