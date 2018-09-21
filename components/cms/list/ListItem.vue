<template>
  <div class="cms-table__row">
    <div class="cms-table__list-item cms-table__list-item--main">
      <catalogue-card :item="item.card"></catalogue-card>
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
    return {};
  },
  computed: {
    className() {
      return `cms-table__list-item--status--${this.item.status}`;
    },
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
  },
  mounted() {
    this.log();
  },
};
</script>
