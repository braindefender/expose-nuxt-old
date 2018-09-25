<template>
  <div class="cms-page">
    <Navigation></Navigation>
    <div class="container">
      <div class="es">
        <div class="es__side es__side--left">
          <div class="es__side-top">
            <input
              class="hidden"
              id="xml"
              type="file"
              ref="xml"
              @input="setFile"/>
            <label for="xml" class="button">Загрузить XML</label>
          </div>
          <test-stack
            :options="{
              left: true,
              compact: false,
              checkOnClick: true,
              showLetters: true,
            }">
          </test-stack>
        </div>
        <div class="es__side es__side--right">
          <test-stack
            :options="{
              right: true,
              compact: false,
              checkOnClick: true,
            }">
          </test-stack>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Navigation from '@/components/cms/Navigation';
import ESCard from '@/components/cms/ESCard';
import TestStack from '@/components/cms/TestStack';

export default {
  name: 'Sort',
  mounted() {
    if (this.$route.params.cms !== true) {
      // redirect if came from link instead of cms
      this.$router.push({ path: '/cms/list' });
      // this.fetchState();
    }
  },
  beforeDestroy() {
    this.syncState();
  },
  components: { Navigation, ESCard, TestStack },
  data() {
    return {};
  },
  computed: {},
  methods: {
    fetchState() {
      this.$store.dispatch('fetchState');
    },
    syncState() {
      this.$store.dispatch('syncState');
    },
    uploadXML() {
      this.syncState();
      let formData = new FormData();
      formData.append('file', this.file);
      this.$axios
        .$post('/cms/xml', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          this.$store.commit('setState', res);
          console.log('Uploaded XML');
        })
        .catch(err => {
          console.log(err);
        });
    },
    setFile() {
      this.file = this.$refs.xml.files[0];
      this.$refs.xml.type = 'text';
      this.$refs.xml.type = 'file';
      this.uploadXML();
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
        .es-stack
          margin-bottom: 6px
    &__side-top
      padding-left: 20px
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
