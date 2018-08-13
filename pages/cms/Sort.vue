<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <div class="es">
        <div class="es__side es__side--left">
          <div class="es__list">
            <Stack
              :item="this.unsortedStack"
              :options="{
                compact: false,
                showCheckbox: true,
                showLetters: true,
                editable: false,
                toggle: false,
                checkOnClick: true,
              }"
              @upload="uploadXML">
            </Stack>
            <input type="file" ref="xml" @change="setFile">
          </div>
        </div>
        <div class="es__side es__side--right">
          <Stack
            v-for="(item, index) in struct"
            :key="index"
            :item="item"
            :options="{
              showCheckbox: true,
              checkOnClick: true,
            }">
          </Stack>
          <sort-stack></sort-stack>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

import Navigation from '@/components/cms/Navigation';
import Stack from '@/components/cms/Stack';
import ESCard from '@/components/cms/ESCard';
import SortStack from '@/components/cms/SortStack';

export default {
  name: 'PageTwo',
  mounted() {
    this.fetchState();
  },
  beforeDestroy() {
    // this.syncState();
  },
  components: { Navigation, Stack, ESCard, SortStack },
  data() {
    return {};
  },
  computed: {
    unsortedStack() {
      return {
        title: 'Неотсортированные',
        list: this.unsorted,
      };
    },
    ...mapState({
      unsorted: state => state.sortState.unsorted,
      struct: state => state.sortState.struct,
    }),
  },
  methods: {
    fetchState() {
      this.$store.dispatch('fetchSortState').then(res => {
        this.sortState = this.$store.state.sortState;
      });
    },
    syncState() {
      this.$store.dispatch('syncSortState', this.sortState);
    },
    uploadXML() {
      let formData = new FormData();
      formData.append('file', this.file);
      this.$axios
        .$post('/expose/xml', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function() {
          console.log('SUCCESS!!');
          this.$axios.$get('/cms/sort');
        })
        .catch(function() {
          console.log('FAILURE!!');
        });
    },
    setFile() {
      this.file = this.$refs.xml.files[0];
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'
  @import '@/styles/mixins.sass'

  .es
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
    .es-card-wrapper
      margin-bottom: 6px

  .list-enter-active, .list-leave-active
    transition: all 1s

  .list-enter, .list-leave-to
    opacity: 0
    transform: translateY(30px)

  .list-move
    transition: transform 1s

  .es-stack-view
    box-sizing: border-box
    background-color: #EBECF0
    border-radius: 10px
    padding-top: 8px
    padding-bottom: 10px
    overflow: hidden
    position: relative
    z-index: 1
    margin-bottom: 10px
    .es-stack-view
      background-color: #E1E2E5
    &__info
      padding-left: 48px
    &__count
      font-size: 14px
      line-height: 20px
      color: rgba(black, 0.4)


</style>
