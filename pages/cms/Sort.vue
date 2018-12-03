<template>
  <div class="cms-new-page">
    <sidebar></sidebar>
    <div class="cms-new-page__content">
      <div class="cms-new-page__rows">
        <div class="cms-new-page__panel">
          <nuxt-link class="button" :to="{ name: `cms-Info`, params: { cms: true } }">Назад</nuxt-link>
          <input class="hidden" accept="text/xml" id="xml1" type="file" ref="xml1" @input="setFile">
          <label for="xml1" class="button">Загрузить XML</label>
          <nuxt-link class="button" :to="{ name: `cms-Edit`, params: { cms: true } }">Далее</nuxt-link>
        </div>
        <div v-if="!isEmpty" class="es">
          <div class="es__side es__side--left">
            <div class="es__side-top"></div>
            <stack-edit
              :options="{
                left: true,
                compact: false,
                checkOnClick: true,
                showLetters: true,
              }"
            />
          </div>
          <div class="es__side es__side--right">
            <stack-edit
              :options="{
                right: true,
                compact: false,
                checkOnClick: true,
              }"
            />
          </div>
        </div>

        <div v-else class="es-empty">
          <div class="es-empty__text">
            Пока здесь ничего нет. Пожалуйста, загрузите
            <input
              class="hidden"
              type="file"
              id="xml2"
              ref="xml2"
              accept="text/xml"
              @input="setFile($event)"
            >
            <label for="xml2" class="button">XML файл</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/cms/sidebar/Sidebar';

import StackEdit from '@/components/cms/stack/StackEdit';

export default {
  name: 'Sort',
  mounted() {
    // redirect if came from link instead of cms
    if (this.$route.params.cms !== true) {
      this.$router.push({ path: '/cms/list' });
      this.canSyncState = false;
    }
  },
  beforeDestroy() {
    if (this.canSyncState) {
      this.syncState();
    }
  },
  components: { Sidebar, StackEdit },
  data() {
    return {
      canSyncState: true,
      file: '',
    };
  },
  computed: {
    isEmpty() {
      return (
        this.$store.state.stacks.leftStack.list.length === 0 &&
        this.$store.state.stacks.stack.list.length === 0
      );
    },
  },
  methods: {
    syncState() {
      this.$store.dispatch('syncState');
    },
    uploadXML() {
      this.$store.dispatch('syncState').then(() => {
        const _id = this.$store.state.info._id;
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('exposeid', _id);
        this.$axios
          .$post('/cms/xml', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            console.log('Uploaded XML');
            this.$axios
              .$get('/cms/xmlready', { params: { exposeid: _id } })
              .then(res => {
                this.$store.commit('setState', res);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    setFile(event) {
      this.file = event.target.files[0];
      if (this.$refs.xml1) {
        this.$refs.xml1.type = 'text';
        this.$refs.xml1.type = 'file';
      }
      if (this.$refs.xml2) {
        this.$refs.xml2.type = 'text';
        this.$refs.xml2.type = 'file';
      }
      this.uploadXML();
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/vars.sass'
  @import '@/styles/mixins.sass'

  .es-empty
    width: 600px
    padding: 40px
    margin: 0 auto
    margin-top: 80px
    background-color: rgba(black, 0.05)
    border-radius: 5px
    height: 120px
    display: flex
    flex-direction: column
    align-items: center
    &__text
      display: flex
      align-items: center
      .button
        margin-left: 10px

  .es
    position: relative
    z-index: 1
    flex-grow: 1
    display: flex
    flex-direction: row
    width: 100%
    &__side
      width: 50%
      overflow-y: scroll
      flex-grow: 100
      flex-shrink: 0
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

  .list-enter-active, .list-leave-active
    transition: all 1s

  .list-enter, .list-leave-to
    opacity: 0
    transform: translateY(30px)

  .list-move
    transition: transform 1s

</style>
