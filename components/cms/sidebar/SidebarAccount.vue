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

    <div class="sidebar-button-box">
      <div
        v-for="(page, index) in statusList"
        :key="index"
        :class="pageName === page.name
          ? 'sidebar-button sidebar-button--active'
          : 'sidebar-button'">
        <div :class="`sidebar-button__icon sidebar-button__icon--${page.name.toLowerCase()}`"></div>
        <div class="sidebar-button__text">{{ page.title }}</div>
      </div>
    </div>

    <div class="sidebar-button"
      @click="test">
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
    test() {
      this.$axios.$get('/cms/new').then(res => console.log(res));
    },
  },
};
</script>

<style lang="sass">

</style>
