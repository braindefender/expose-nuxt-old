<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <div class="ee">
        <div class="ee__side ee__side--left">
          <edit-stack
          :options="{
            left: true,
            compact: false,
          }"></edit-stack>
        </div>
        <div class="ee__side ee__side--right">
          <EECard :item="selectedItem"></EECard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Navigation from '@/components/cms/Navigation';
import EECard from '@/components/cms/EECard';
import EditStack from '@/components/cms/EditStack';

export default {
  name: 'Edit',
  components: { Navigation, EECard, EditStack },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedItem: state => state.editState.selected,
    }),
  },
  methods: {},
};
</script>

<style lang="sass">
  .ee
    position: relative
    z-index: 1
    display: flex
    flex-direction: row
    padding-top: 10px
    &__side
      width: 50%
      overflow-y: scroll
      height: calc(100vh - 58px)
      &--left
        padding-right: 5px
        margin-right: 5px
      &--right
        padding-right: 5px
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
