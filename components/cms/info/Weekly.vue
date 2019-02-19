<template>
  <div class="ec__box ec__weekly">
    <div class="ec__row">
      <div class="ec__title">Тип выставки</div>
      <div class="ec__toggle">
        <Toggle :list="this.$store.state.static.modeList" :check="mode" :call="setModeTo"/>
      </div>
    </div>

    <div class="ec__row">
      <div class="ec__title">Место проведения</div>
      <div class="ec__toggle">
        <Toggle :list="this.$store.state.static.sourceList" :check="source" :call="setSourceTo"/>
      </div>
    </div>

    <div class="ec__row">
      <div class="ec__title">Даты проведения</div>
      <div class="ec__date-picker">
        <div class="ec__date-picker-half">
          <span>Начало</span>
          <input type="date" min="1980-01-01" max="9999-12-31" v-model="dates_from">
        </div>
        <div class="ec__date-picker-half">
          <span>Конец</span>
          <input type="date" min="1980-01-01" max="9999-12-31" v-model="dates_to">
        </div>
      </div>
    </div>

    <div class="ec__row">
      <div class="ec__title">Дата публикации</div>
      <div class="ec__date-picker">
        <div class="ec__date-picker-half">
          <span>Начало</span>
          <input type="date" min="1980-01-01" max="9999-12-31" v-model="dates_public">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from '~/components/cms/common/Toggle';

export default {
  name: 'Weekly',
  components: { Toggle },
  mounted() {},
  computed: {
    mode: {
      get() {
        return this.$store.state.info.mode;
      },
      set(value) {
        this.$store.dispatch('info/changeModeTo', value);
      },
    },
    source: {
      get() {
        return this.$store.state.info.source;
      },
      set(value) {
        this.$store.commit('info/set', { field: 'source', value });
      },
    },
    dates_from: {
      get() {
        return this.$store.state.info.dates.from;
      },
      set(value) {
        this.$store.commit('info/setDate', { field: 'from', value });
      },
    },
    dates_to: {
      get() {
        return this.$store.state.info.dates.to;
      },
      set(value) {
        this.$store.commit('info/setDate', { field: 'to', value });
      },
    },
    dates_public: {
      get() {
        return this.$store.state.info.dates.public;
      },
      set(value) {
        this.$store.commit('info/setDate', { field: 'public', value });
      },
    },
  },
  methods: {
    setModeTo(value) {
      this.$store.dispatch('info/changeModeTo', value);
    },
    setSourceTo(value) {
      this.$store.commit('info/set', { field: 'source', value });
      this.$store.dispatch('info/changeModeTo', this.mode);
    },
  },
};
</script>
