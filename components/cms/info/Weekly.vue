<template>
  <div class="ec__box ec__weekly">

    <div class="ec__column">
      <div class="ec__item">
        <div class="ec__title">Тип выставки:</div>
        <div class="ec__toggle">
          <Select
            :list="this.$store.state.modeList"
            :check="mode"
            :call="setModeTo"></Select>
        </div>
      </div>
    </div>

    <div class="ec__column">
      <div class="ec__item">
        <div class="ec__title">Место проведения:</div>
        <div class="ec__toggle">
          <Select
            :list="this.$store.state.sourceList"
            :check="source"
            :call="setSourceTo">
          </Select>
        </div>
      </div>
    </div>

    <div class="ec__column">
      <div class="ec__item">
        <div class="ec__title">Даты проведения:</div>
        <div class="ec__date-picker">
          <span>от</span>
          <input
            @change="changeDateFrom" :value="dateFrom"
            type="date" max="9999-12-31">
          <span>до</span>
          <input
            @change="changeDateTo" :value="dateTo"
            type="date" max="9999-12-31">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Select from '~/components/cms/Select';

export default {
  name: 'Weekly',
  props: ['mode', 'source', 'dateFrom', 'dateTo'],
  components: { Select },
  data() {
    return {};
  },
  methods: {
    setModeTo(id) {
      this.$emit('set', 'mode', id);
    },
    setSourceTo(id) {
      this.$emit('set', 'source', id);
    },
    changeDateFrom(e) {
      this.$emit('set', 'dateFrom', e.target.value);
    },
    changeDateTo(e) {
      this.$emit('set', 'dateTo', e.target.value);
    },
  },
};
</script>
