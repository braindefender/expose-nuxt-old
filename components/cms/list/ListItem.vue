<template>
  <div class="cms-table__row">
    <div class="cms-table__list-item cms-table__list-item--main">
      <CMSCard :item="item" :options="{ fromcms: true }"/>
    </div>
    <div class="cms-table__list-item cms-table__list-item--date">{{ item.dates.create }}</div>
    <div class="cms-table__list-item cms-table__list-item--date">{{ item.dates.update }}</div>
    <div class="cms-table__list-item cms-table__list-item--authors"></div>
    <div role="button" class="cms-icon-big cms-icon-big--info" @click="share">Поделиться</div>
    <div v-if="shareMode">
      <multiselect
        selectLabel
        deselectLabel
        placeholder="Выберите пользователя"
        v-model="sharedUsers"
        :options="usersList"
        :multiple="true"
        :hideSelected="true"
        :close-on-select="false"
        track-by="_id"
        label="username"
        @input="onShare"
      ></multiselect>
    </div>
    <div v-if="!item.blocked" class="cms-table__list-item cms-table__list-item--action-panel">
      <div
        role="button"
        class="cms-icon-big cms-icon-big--info"
        @click="redirect('Info')"
      >Информация</div>
      <div
        role="button"
        class="cms-icon-big cms-icon-big--sort"
        @click="redirect('Sort')"
      >Сортировка</div>
      <div
        role="button"
        class="cms-icon-big cms-icon-big--edit"
        @click="redirect('Edit')"
      >Редактирование</div>
      <div
        role="button"
        class="cms-icon-big cms-icon-big--demo"
        @click="redirect('Demo')"
      >Предпоказ</div>
      <div class="cms-icon-big-divider"/>
      <div role="button" class="cms-icon-big cms-icon-big--remove" @click="remove">Удаление</div>
    </div>
    <div
      v-else
      class="cms-table__list-item cms-table__list-item--blocked"
    >Редактирование недоступно.
      <br>Выставка находится в работе.
    </div>
  </div>
</template>

<script>
import CMSCard from '~/components/cms/CMSCard';

export default {
  name: 'ListItem',
  components: {
    CMSCard,
  },
  props: ['item'],
  watch: {
    item(oldVal, newVal) {
      this.sharedUsers = this.item.ownerID;
      this.shareMode = false;
    },
  },
  data() {
    return {
      shareMode: false,
      sharedUsers: [],
    };
  },
  computed: {
    usersList() {
      return this.$store.state.usersList;
    },
    blocked() {
      return this.item.blocked || this.item.workerID !== '';
    },
  },
  methods: {
    onShare(value) {
      this.$axios.$post('/cms/users', {
        id: this.item._id,
        users: this.sharedUsers.map(el => el._id),
      });
    },
    share() {
      this.shareMode = !this.shareMode;
    },
    redirect(to) {
      this.$store.dispatch('fetchState', this.item._id).then(() => {
        this.$router.push({ name: `cms-${to}`, params: { fromcms: true } });
      });
    },
    remove() {
      this.$store.dispatch('removeExpose', {
        _id: this.item._id,
        status: this.$store.state.currentStatus,
      });
    },
  },
  mounted() {
    this.sharedUsers = this.item.ownerID;
  },
};
</script>
