<template>
  <div class="cms-table__row">
    <div class="cms-table__list-item cms-table__list-item--main">
      <catalogue-card :item="item" :options="{ cms: true }"></catalogue-card>
    </div>
    <div class="cms-table__list-item cms-table__list-item--date">
      {{ item.dates.create }}
    </div>
    <div class="cms-table__list-item cms-table__list-item--date">
      {{ item.dates.update }}
    </div>
    <div class="cms-table__list-item cms-table__list-item--authors">
      <button class="button" @click="remove">Удалить</button>
    </div>
    <div
      v-if="!item.blocked"
      class="cms-table__list-item cms-table__list-item--actions">
      <div class="button"
        v-for="(it, index) in pages"
        :key="index"
        @click="redirect({item, it})">{{ it.title }}
      </div>
    </div>
    <div
      v-else
      class="cms-table__list-item">
      Редактирование недоступно. <br> Выставка находится в работе.
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
    remove() {
      this.$store.dispatch('removeExpose', {
        _id: this.item._id,
        status: this.$store.state.currentStatus,
      });
    },
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
