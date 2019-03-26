<template>
  <div class="modal-preview">
    <div class="modal-preview__grid modal-preview__grid--expose">
      <expo-card v-if="expo.title" :title="expo.title" :image="expo.image"/>
      <expo-date v-if="expo.dates" :dates="expo.dates"/>
    </div>
  </div>
</template>

<script>
import ExpoCard from '~/components/common/ExpoCard';
import ExpoDate from '~/components/common/ExpoDate';

export default {
  components: { ExpoCard, ExpoDate },
  props: {
    expo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="sass">

  .modal-preview
    &__grid--expose
      grid-template-columns: 300px 1fr
      grid-template-rows: 1fr

</style>
