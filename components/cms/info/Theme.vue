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

      <div class="ec__row">
        <div class="ec__title">Название</div>
        <textarea
          placeholder="Измените название выставки"
          class="ec__textarea ec__textarea--title"
          name="title" cols="30" rows="1"
          :value="title" v-autosize="title"
          @input="changeTitleTo">
        </textarea>
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
          <!-- <input
            class="ec__loader-input"
            type="file"
            name="image-cover"
            @change="onImageChange">
          <label
            class="ec__loader-label"
            for="image-cover"></label> -->
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
          name="description" cols="30" rows="1"
          :value="annotation" v-autosize="annotation"
          @input="changeAnnotationTo">
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
  components: { CategoryPicker, Select, Toggle, TheMask },
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
    changeEmailTo(e) {
      this.$emit('set', 'email', e.target.value);
    },
    changePhoneTo(e) {
      this.$emit('set', 'phone', e);
    },
    changeTitleTo(e) {
      this.$emit('set', 'title', e.target.value);
    },
    changeAnnotationTo(e) {
      this.$emit('set', 'annotation', e.target.value);
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
  mounted() {},
};
</script>
