<template>
  <div class="dates-block">
    <div class="dates-block__grid">
      <p class="dates-block__name">Создано:</p>
      <p class="dates-block__value">{{pretty(dates.create)}}</p>
      <p class="dates-block__name">Обновлено:</p>
      <p class="dates-block__value">{{pretty(dates.update)}}</p>
      <p class="dates-block__name">Опубликовано:</p>
      <p class="dates-block__value">{{pretty(dates.public)}}</p>
    </div>
  </div>
</template>

<script>
import { prettyDate } from '~/assets/scripts/util';

export default {
  props: {
    dates: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pretty(date) {
      return prettyDate(date);
    },
  },
};
</script>

<style lang="sass">

  .dates-block
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding-left: 15px
    color: rgba(black, 0.8)

    &__grid
      display: grid
      justify-content: center
      align-content: center
      align-items: center
      grid-template-columns: auto auto
      grid-gap: 5px 10px

    &__name
      font-weight: bold
      font-size: 14px
      text-align: right

    &__value
      font-size: 14px

</style>
