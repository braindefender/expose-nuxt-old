<template>
  <div class="modal-preview">
    <div class="modal-preview__grid modal-preview__grid--expose">
      <expo-card/>
      <expo-desc/>
    </div>
  </div>
</template>

<script>
import ExpoCard from '~/components/common/ExpoCard';
import ExpoDesc from '~/components/common/ExpoDesc';

export default {
  components: { ExpoCard, ExpoDesc },
  props: {},
};
</script>

<style lang="sass">

  .modal-preview
    &__grid--expose
      grid-template-columns: 1fr, 

</style>
