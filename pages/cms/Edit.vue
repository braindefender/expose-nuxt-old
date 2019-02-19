<template>
  <div class="cms-new-page">
    <sidebar/>
    <div class="cms-new-page__content">
      <div class="cms-new-page__rows">
        <div class="cms-new-page__panel">
          <nuxt-link class="button" :to="{ name: `cms-Sort`, params: { fromcms: true } }">Назад</nuxt-link>
          <!-- <nuxt-link class="button" :to="{ name: `cms-Demo`, params: { fromcms: true } }">Далее</nuxt-link> -->
        </div>
        <div class="ee">
          <div class="ee__side ee__side--left">
            <stack-view
              :options="{
              left: true,
              compact: false,
            }"
            />
          </div>
          <div class="ee__side ee__side--right">
            <edit-item/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/cms/sidebar/Sidebar';

import StackView from '@/components/cms/stack/StackView';
import EditItem from '@/components/cms/EditItem';

export default {
  name: 'Edit',
  middleware: 'auth',
  components: { Sidebar, EditItem, StackView },
  mounted() {
    // redirect if came from link instead of cms
    if (this.$route.params.fromcms !== true) {
      this.$router.push({ path: '/cms/list' });
    }
  },
  beforeDestroy() {
    if (this.$route.params.fromcms === true) {
      this.$store.commit('edit/updateSelected', { selected: false });
      this.$store.commit('syncState');
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="sass">
  @import '@/styles/vars.sass'

  .ee
    position: relative
    z-index: 1
    display: flex
    flex-direction: row
    width: 100%
    flex-grow: 1
    &__side
      width: 50%
      overflow-y: scroll
      background-color: $color-bg
      padding-left: 3%
      padding-right: 3%
      &--right
        .es-stack
          margin-bottom: 6px
    &__side-top
      padding-left: 20px
      margin-bottom: 10px
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
    &__side-title
      font-size: 16px
      font-weight: bold
      line-height: 20px
    &__side-controls
      display: flex
      flex-direction: row
      .button
        margin-right: 10px
        &:last-child
          margin-right: 0
</style>
