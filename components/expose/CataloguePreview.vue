<template>
  <div class="cat-preview">
    <div class="cat-layout">
      <div class="cat-layout__panel">
        <div class="cat-layout__title">
          Каталог выставок
        </div>
        <nuxt-link
          to="catalogue"
          class="cat-layout__action">
          Смотреть все
        </nuxt-link>
      </div>
      <div class="cat-layout__content">
        <div class="cat-layout__grid">
          <catalogue-card
            v-for="(item, index) in list"
            :key="index"
            :item="item">
          </catalogue-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogueCard from '@/components/expose/CatalogueCard';

export default {
  name: 'CataloguePreview',
  components: { CatalogueCard },
  props: ['list'],
  data() {
    return {};
  },
};
</script>


<style lang="sass">

  @import '~/styles/mixins.sass'

  

</style>
