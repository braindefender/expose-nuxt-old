<template>
  <div class="cms-new-page">
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <div class="cms-table">
        <div class="cms-table__row cms-table__headers">
          <div
            class="cms-table__header cms-table__header--main cms-table__header--title"
          >Модерируемые выставки</div>
          <div class="cms-table__toggle">
            <sort-menu
              :list="listSortTypes"
              :check="sortType"
              :callback="setSortType"
              :fields="{
                check: 'mode',
                title: 'title',
              }"
            />
          </div>
        </div>
        <div v-if="items.length !== 0" class="cms-table__list">
          <list-item-new
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            @prompt="showModal"
          />
        </div>
      </div>
    </div>
    <modal v-show="modal" :show="modal" :options="modalOptions"/>
  </div>
</template>

<script>
import ListItemNew from '~/components/cms/list/ListItemNew';
import Sidebar from '~/components/cms/sidebar/Sidebar';
import Toggle from '~/components/cms/common/Toggle';
import SortMenu from '~/components/cms/common/SortMenu';
import Modal from '~/components/common/Modal';

export default {
  name: 'List',
  middleware: 'auth',
  components: {
    ListItemNew,
    Sidebar,
    Toggle,
    SortMenu,
    Modal,
  },
  data() {
    return {
      modal: false,
      modalOptions: {
        okcallback: () => undefined,
        cancelcallback: () => undefined,
      },
    };
  },
  computed: {
    items() {
      return this.$store.state.exposeList;
    },
    sortType() {
      return this.$store.state.sortType;
    },
    currentStatus() {
      return this.$store.state.currentStatus;
    },
    listSortTypes() {
      return this.$store.state.static.listSortTypes;
    },
  },
  mounted() {
    this.$store.dispatch('fetchExposeList', {
      type: this.currentStatus,
      sort: this.sortType.mode,
      direction: -1,
    });
    this.$store.dispatch('fetchUsersList');
    this.$store.dispatch('fetchCategoryList');
  },
  methods: {
    setSortType(option) {
      this.$store.dispatch('setSortType', option);
    },
    showModal(options) {
      this.modalOptions = { oktext: 'Ок', canceltext: 'Отменить', ...options };
      let self = this;
      this.modalOptions.cancelcallback = () => (self.modal = false);
      this.modalOptions.okcallback = () => {
        options.okcallback();
        self.modal = false;
      };
      this.modal = true;
    },
  },
};
</script>

<style lang="sass">
  @import '~/styles/vars.sass'
  @import '~/styles/mixins.sass'

  .cms-table
    display: flex
    flex-direction: column
    flex-grow: 1
    overflow-y: auto
    background-color: #f5f5f5
    &__row
      display: flex
      width: 100%
      align-items: center
      flex: 0 0 auto
      position: relative
      &--blocked
        pointer-events: none
        user-select: none
    &__headers
      height: 60px
      box-shadow: 0 1px 0 rgba(black, 0.1)
      background-color: white
      padding-right: 15px
      display: flex
      justify-content: space-between
    &__toggle
      max-width: 50%
    &__header, &__list-item
      font-size: 15px
      color: rgba(black, 0.8)
      margin-right: 20px
      flex-grow: 1
      &:last-child
        margin-right: 0
      &--main
        padding-left: 20px
        margin-right: 40px
        width: 395px
        flex: 0 0 auto
      &--title
        font-size: 18px
        font-weight: bold
        color: black
      &--date
        width: 160px
        flex: 0 0 auto
      &--authors
        font-size: 14px
    &__header
      &--actions
        padding-right: 20px
        width: 360px
        flex: 0 0 auto
    &__list
      padding: 15px
      > div
        margin-bottom: 15px
        &:last-child
          margin-bottom: 0
    &__list-item
      position: relative
      &--action-panel
        min-width: 400px
        max-width: 550px
        display: flex
        justify-content: flex-end
        padding-right: 20px
        padding-left: 20px
        .cms-icon-big
          margin-right: 20px
          &:last-child
            margin-right: 0
      &--blocked
        min-width: 400px
        max-width: 550px
        padding-left: 20px
        padding-right: 20px
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        padding-right: 20px
        min-height: 80px
        border-radius: 5px
        &::after
          border-radius: inherit
          position: absolute
          top: 0
          left: 30px
          right: 30px
          bottom: 0
          content: ''
          background-color: rgba(black, 0.1)

  .cms-icon-big
    width: 80px
    height: 80px
    border-radius: 50%
    cursor: pointer
    position: relative
    display: flex
    justify-content: center
    align-items: flex-end
    font-size: 12px
    font-weight: bold
    &::after
      position: absolute
      top: 4px
      left: 10px
      right: 10px
      bottom: 16px
      content: ''
      opacity: 0.5
      border-radius: inherit
      background: center no-repeat
      background-size: 24px 24px
      transition: all ease-in-out 0.15s
    &::before
      position: absolute
      top: 6px
      left: 12px
      right: 12px
      bottom: 18px
      content: ''
      border-radius: inherit
      border: 2px solid rgba(black, 0.15)
      transition: all ease-in-out 0.15s
    &:hover
      color: $color-accent
      &::after
        opacity: 0.8
      &::before
        border: 5px solid rgba($color-accent, 1)
    &--info
      &::after
        background-image: url(~/assets/icons/info.svg)
    &--sort
      &::after
        background-image: url(~/assets/icons/sort.svg)
    &--edit
      &::after
        background-image: url(~/assets/icons/edit.svg)
    &--demo
      &::after
        background-image: url(~/assets/icons/demo.svg)
    &--remove
      color: rgba(black, 0.5)
      &:hover
        color: $color-error
        &::before
          border: 5px solid rgba($color-error, 1)
      &::after
        opacity: 1
        background-image: url(~/assets/icons/remove--color.svg)

  .cms-icon-big-divider
    width: 2px
    height: 80px
    margin-right: 20px
    position: relative
    &::after
      +posa(0)
      content: ''
      background-color: rgba(black, 0.15)
      border-radius: 5px

</style>
