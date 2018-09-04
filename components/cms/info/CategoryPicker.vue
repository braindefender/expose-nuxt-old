<template>
  <div class="cp">
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
  </div>
</template>

<script>
export default {
  name: 'CategoryPicker',
  data() {
    return {
      value: [],
      categories: [],
    };
  },
  mounted() {
    this.fetchCategoryList();
    this.value = this.$store.state.info.categories;
  },
  methods: {
    fetchCategoryList() {
      this.$axios.get('/cms/categories').then(res => {
        // console.log(res.data);
        this.categories = res.data;
      });
    },
    onInput(value) {
      this.$emit('updateCategories', value);
    },
  },
};
</script>

<style lang="sass">
  @import '~/styles/multiselect.sass'
</style>
