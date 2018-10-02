<template>
  <div class="cms-table__row">
    <div class="cms-table__list-item cms-table__list-item--main">
      <catalogue-card :item="item" :options="{ cms: true }"></catalogue-card>
    </div>
    <div class="cms-table__list-item cms-table__list-item--date">
      {{ item.dateCreate }}
    </div>
    <div class="cms-table__list-item cms-table__list-item--date">
      {{ item.dateUpdate }}
    </div>
    <div class="cms-table__list-item cms-table__list-item--authors">
      {{ item.authors }}
    </div>
    <div class="cms-table__list-item cms-table__list-item--actions">
      <div class="button"
        v-for="(it, index) in pages"
        :key="index"
        @click="redirect({item, it})">{{ it.title }}
      </div>
    </div>
  </div>
</template>

<script>
import CatalogueCard from '~/components/expose/CatalogueCard';

export default {
  name: 'ListItem',
  components: {
    CatalogueCard,
  },
  props: ['item'],
  data() {
    return {
      pages: this.$store.state.pageList,
    };
  },
  methods: {
    log() {
      // console.log(this.item.image);
    },
    redirect({ item, it }) {
      console.log(item);
      this.$store.dispatch('fetchState', item._id).then(() => {
        this.$router.push({ name: `cms-${it.name}`, params: { cms: true } });
      });
    },
  },
  mounted() {
    this.log();
  },
};
</script>
