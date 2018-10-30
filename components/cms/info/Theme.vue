<template>
  <div class="ec__box ec__theme">

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

      <div class="ec__row">
        <div class="ec__title">Название</div>
        <textarea
          placeholder="Измените название выставки"
          class="ec__textarea ec__textarea--title"
          name="title" cols="30" rows="2"
          :value="title" v-autosize="title"
          @input="set('title', $event.target.value)"/>
      </div>

      <div class="ec__row">
        <div class="ec__title">Обложка</div>
        <div class="ec__loader">
          <no-ssr>
            <picture-input
              ref="piCover" button-class="button"
              size="2" height="36" width="370"
              accept="image/jpeg,image/jpg,image/png"
              :zIndex=20 :plain="true" :hideChangeButton="true"
              @change="onPICoverChange">
            </picture-input>
          </no-ssr>
          <p class="ec__loader-comment">
            Рекомендуемое разрешение не менее 1150x320px
          </p>
        </div>
      </div>

      <div class="ec__row">
        <div class="ec__title">Email</div>
        <input
          placeholder="Не указан"
          type="email" class="ec__input"
          :value="email" @change="changeEmailTo"/>
      </div>

      <div class="ec__row">
        <div class="ec__title">Телефон</div>
        <the-mask
          placeholder="+7 (999) 999 9999"
          type="tel" class="ec__input"
          :masked="true"
          mask="+7 (###) ###-####"
          :value="phone" @input="changePhoneTo"/>
      </div>

      <div class="ec__row">
        <div class="ec__title">Категория</div>
        <category-picker @updateCategories="changeCategories"></category-picker>
      </div>
      <div class="ec__row">
        <div class="ec__title">Описание</div>
        <textarea
          placeholder="Измените описание выставки"
          class="ec__textarea ec__textarea--description"
          name="description"
          cols="30" rows="1"
          :value="annotation"
          v-autosize="annotation"
          @input="set('annotation', $event.target.value)">
        </textarea>
      </div>


  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';

import Select from '~/components/cms/Select';
import Toggle from '~/components/cms/common/Toggle';
import CategoryPicker from '~/components/cms/info/CategoryPicker';

export default {
  name: 'Theme',
  props: ['mode', 'source', 'dates', 'title', 'email', 'phone', 'annotation'],
  components: { CategoryPicker, Select, Toggle, TheMask },
  data() {
    return {};
  },
  methods: {
    set(field, value) {
      this.$emit('set', field, value);
    },
    setDate(field, value) {
      this.$emit('setDate', field, value);
    },
    setModeTo(id) {
      this.$emit('set', 'mode', id);
    },
    setSourceTo(id) {
      this.$emit('set', 'source', id);
    },
    changeTitle(e) {
      console.log(e);
    },
    changeEmailTo(e) {
      this.$emit('set', 'email', e.target.value);
    },
    changePhoneTo(e) {
      this.$emit('set', 'phone', e);
    },
    changeCategories(value) {
      this.$emit('set', 'categories', value);
    },
    onImageChange(e) {
      const file = e.target.files[0];
    },
    onPICoverChange(image) {
      if (image) {
        console.log('Picture loaded.');
        this.$emit('set', 'image', image);
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
  },
};
</script>
