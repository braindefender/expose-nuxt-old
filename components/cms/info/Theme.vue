<template>
  <div class="ec__box ec__theme">

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

      <div class="ec__item">
        <div class="ec__title">Название:</div>
        <textarea
          placeholder="Измените название выставки"
          class="ec__textarea ec__textarea--bold ec__textarea--title"
          name="title" cols="30" rows="1"
          :value="title" v-autosize="title"
          @input="changeTitleTo">
        </textarea>
      </div>

      <div class="ec__item">
        <div class="ec__title">Обложка:</div>
        <div class="ec__loader">

          <picture-input
            ref="piCover" button-class="button"
            width="172" height="36" size="2"
            accept="image/jpeg,image/jpg,image/png"
            :zIndex=200 :plain="true" :hideChangeButton="true"
            @change="onPICoverChange">
          </picture-input>

          <p class="ec__loader-comment">
            Рекомендуемое разрешение
            <br>
            не менее 1150x320px
          </p>
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

      <div class="ec__item">
        <div class="ec__title">Email:</div>
        <input
          placeholder="Не указан"
          type="email" class="ec__input"
          :value="email" @change="changeEmailTo"/>
      </div>

      <div class="ec__item">
        <div class="ec__title">Телефон:</div>
        <the-mask
          placeholder="+7 (999) 999 9999"
          type="tel" class="ec__input"
          :masked="true"
          mask="+7 (###) ###-####"
          :value="phone" @input="changePhoneTo"/>
      </div>

    </div>

    <div class="ec__column">
      <div class="ec__item">
        <div class="ec__title">Описание:</div>
        <textarea
          placeholder="Измените описание выставки"
          class="ec__textarea ec__textarea--description"
          name="description" cols="30" rows="1"
          :value="annotation" v-autosize="annotation"
          @input="changeAnnotationTo">
        </textarea>
      </div>
    </div>

  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';
import Select from '~/components/cms/Select';

export default {
  name: 'Theme',
  props: [
    'mode',
    'source',
    'dateFrom',
    'dateTo',
    'title',
    'email',
    'phone',
    'annotation',
  ],
  components: { Select, TheMask },
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
      this.$emit('changeDateFrom', e.target.value);
    },
    changeDateTo(e) {
      this.$emit('changeDateTo', e.target.value);
    },
    changeEmailTo(e) {
      this.$emit('set', 'email', e.target.value);
    },
    changePhoneTo(e) {
      this.$emit('set', 'email', e);
    },
    changeTitleTo(e) {
      this.$emit('set', 'title', e.target.value);
    },
    changeAnnotationTo(e) {
      this.$emit('set', 'annotation', e.target.value);
    },
    onPICoverChange(image) {
      if (image) {
        console.log('Picture loaded.');
        this.$emit('changeImage', image);
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
  },
};
</script>
