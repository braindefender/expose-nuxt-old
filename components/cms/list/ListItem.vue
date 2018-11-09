<template>
  <div class="cms-table__row" :class="item.blocked ? 'cms-table__row--blocked' : ''">
    <div class="cms-table__list-item cms-table__list-item--main">
      <expose-card :item="item" :options="{ cms: true }"/>
    </div>
    <div class="cms-table__list-item cms-table__list-item--date">
      {{ item.dates.create }}
    </div>
    <div class="cms-table__list-item cms-table__list-item--date">
      {{ item.dates.update }}
    </div>
    <div class="cms-table__list-item cms-table__list-item--authors"></div>
    <div
      v-if="!item.blocked"
      class="cms-table__list-item cms-table__list-item--action-panel">
        <div
          role="button"
          class="cms-icon-big cms-icon-big--info"
          @click="redirect({ item, to: 'Info' })">Информация</div>
        <div
          role="button"
          class="cms-icon-big cms-icon-big--sort"
          @click="redirect({ item, to: 'Sort' })">Сортировка</div>
        <div
          role="button"
          class="cms-icon-big cms-icon-big--edit"
          @click="redirect({ item, to: 'Edit' })">Редактирование</div>
        <div
          role="button"
          class="cms-icon-big cms-icon-big--demo"
          @click="redirect({ item, to: 'Demo' })">Предпоказ</div>
        <div class="cms-icon-big-divider"/>
        <div
          role="button"
          class="cms-icon-big cms-icon-big--remove"
          @click="remove">Удаление</div>
    </div>
    <div
      v-else
      class="cms-table__list-item cms-table__list-item--blocked">
      Редактирование недоступно. <br> Выставка находится в работе.
    </div>
  </div>
</template>

<script>
import ExposeCard from '~/components/expose/ExposeCard';

export default {
  name: 'ListItem',
  components: {
    ExposeCard,
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
    redirect({ item, to }) {
      console.log(item);
      this.$store.dispatch('fetchState', item._id).then(() => {
        this.$router.push({ name: `cms-${to}`, params: { cms: true } });
      });
    },
  },
  mounted() {
    this.log();
  },
};
</script>
