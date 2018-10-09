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
            type="date"
            min="1980-01-01"
            max="9999-12-31"
            :value="dates.from"
            @change="setDate('from', $event.target.value)"
            >
        </div>
        <div class="ec__date-picker-half">
          <span>Конец</span>
          <input
            type="date"
            min="1980-01-01"
            max="9999-12-31"
            :value="dates.to"
            @change="setDate('to', $event.target.value)"
            >
        </div>
      </div>
    </div>

    <div class="ec__row">
      <div class="ec__title">Дата публикации</div>
      <div class="ec__date-picker">
        <div class="ec__date-picker-half">
          <span>Начало</span>
          <input
            type="date"
            min="1980-01-01"
            max="9999-12-31"
            :value="dates.public"
            @change="setDate('public', $event.target.value)"
            >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Toggle from '~/components/cms/common/Toggle';

export default {
  name: 'Weekly',
  props: ['mode', 'source', 'dates'],
  components: { Toggle },
  data() {
    return {};
  },
  methods: {
    setDate(field, value) {
      this.$emit('setDate', field, value);
    },
    setModeTo(id) {
      this.$emit('set', 'mode', id);
    },
    setSourceTo(id) {
      this.$emit('set', 'source', id);
    },
  },
};
</script>
