<template>
  <div class="ec__box ec__weekly">

    <div class="ec__row">
      <div class="ec__title">Тип выставки</div>
      <div class="ec__toggle">
        <Toggle
          :list="this.$store.state.modeList"
          :check="mode"
          :call="setModeTo"></Toggle>
      </div>
    </div>

    <div class="ec__row">
      <div class="ec__title">Место проведения</div>
      <div class="ec__toggle">
        <Toggle
          :list="this.$store.state.sourceList"
          :check="source"
          :call="setSourceTo">
        </Toggle>
      </div>
    </div>

    <div class="ec__row">
        <div class="ec__title">Даты проведения</div>
        <div class="ec__date-picker">
          <div class="ec__date-picker-half">
            <span>Начало</span>
            <input
              @change="changeDateFrom" :value="dateFrom"
              type="date" max="9999-12-31">
          </div>
          <div class="ec__date-picker-half">
            <span>Конец</span>
            <input
              @change="changeDateTo" :value="dateTo"
              type="date" max="9999-12-31">
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import Toggle from '~/components/cms/common/Toggle';

export default {
  name: 'Weekly',
  props: ['mode', 'source', 'dateFrom', 'dateTo'],
  components: { Toggle },
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
