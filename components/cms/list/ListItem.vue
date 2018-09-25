<template>
  <div class="cms-table__row">
    <div class="cms-table__list-item cms-table__list-item--main">
      <catalogue-card :item="item.card" :options="{ cms: true }"></catalogue-card>
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
        v-for="(item, index) in pages"
        :key="index"
        @click="redirect(item.name)">{{ item.title }}
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
  computed: {
    statusText() {
      switch (this.item.status) {
        case 'hidden':
          return 'Скрыто';
        case 'waiting':
          return 'Ожидает публикации';
        case 'public':
          return 'Опубликовано';
        default:
          return '';
      }
    },
  },
  methods: {
    log() {
      console.log(this.item.image);
    },
    redirect(name) {
      this.$router.push({ name: `cms-${name}`, params: { cms: true } });
    },
  },
  mounted() {
    this.log();
  },
};
</script>
