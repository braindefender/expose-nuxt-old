<template>
  <div class="container-test">
    <modal
      :show="true"
      header="Test Header"
      body="Произошла ошибка"
      type="warning"
      :showcancel="true"
    />
  </div>
</template>

<script>
import Modal from '~/components/common/Modal';

export default {
  name: 'Test',
  components: {
    Modal,
  },
  props: ['options'],
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="sass">
  .container-test
    width: 100%
</style>
