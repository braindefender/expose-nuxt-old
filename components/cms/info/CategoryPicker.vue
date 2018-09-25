<template>
  <div class="cp">
    <no-ssr>
      <multiselect
        v-model="value"
        :multiple="true"
        :options="categories"
        selectLabel=""
        deselectLabel=""
        placeholder="Выберите категорию"
        @input="onInput"
        :hideSelected="true"
        :close-on-select="false">
      </multiselect>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'CategoryPicker',
  data() {
    return {
      value: [],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categoryList;
    },
  },
  mounted() {
    this.value = this.$store.state.info.categories;
  },
  methods: {
    onInput(value) {
      this.$emit('updateCategories', value);
    },
  },
};
</script>

<style lang="sass">
  @import '~/styles/multiselect.sass'

  .cp
    position: relative
    z-index: 500
  .multiselect
    position: relative
    z-index: 500
</style>
