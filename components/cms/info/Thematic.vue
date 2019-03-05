<template>
  <div class="ec__box ec__theme">
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

    <div v-if="sourceModList" class="ec__row">
      <div class="ec__title">Читальный зал</div>
      <div class="ec__toggle">
        <Toggle :list="sourceModList" :check="sourceMod" :call="setSourceModTo"/>
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

    <div class="ec__row">
      <div class="ec__title">Название</div>
      <textarea
        placeholder="Измените название выставки"
        class="ec__textarea ec__textarea--title"
        name="title"
        cols="30"
        rows="2"
        v-model="title"
        v-autosize="title"
      />
    </div>

    <div class="ec__row">
      <div class="ec__title">Короткая ссылка</div>
      <input
        placeholder="latin-symbols-only"
        class="ec__textarea ec__textarea--title"
        name="shortLink"
        @input="changeShortLink($event.target.value)"
        :value="shortLink"
      >
    </div>

    <div class="ec__row">
      <div class="ec__title">Обложка</div>
      <div class="ec__loader">
        <no-ssr>
          <picture-input
            ref="piCover"
            button-class="button"
            size="2"
            height="36"
            width="370"
            accept="image/jpeg, image/jpg, image/png"
            :zIndex="20"
            :plain="true"
            :hideChangeButton="true"
            @change="onPICoverChange"
          ></picture-input>
        </no-ssr>
        <p class="ec__loader-comment">Рекомендуемое разрешение не менее 1150x320px</p>
      </div>
    </div>

    <div class="ec__row">
      <div class="ec__title">Email</div>
      <input placeholder="Не указан" type="email" class="ec__input" v-model="email">
    </div>

    <div class="ec__row">
      <div class="ec__title">Телефон</div>
      <the-mask
        placeholder="+7 (999) 999 9999"
        type="tel"
        class="ec__input"
        :masked="true"
        mask="+7 (###) ###-####"
        v-model="phone"
        @input="changePhoneTo"
      />
    </div>

    <div class="ec__row">
      <div class="ec__title">Категория</div>
      <category-picker @updateCategories="changeCategories"/>
    </div>
    <div class="ec__row">
      <div class="ec__title">Описание</div>
      <textarea
        placeholder="Измените описание выставки"
        class="ec__textarea ec__textarea--description"
        name="description"
        cols="30"
        rows="1"
        :value="annotation"
        v-autosize="annotation"
        @input="set('annotation', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { slugify } from 'transliteration';
import { TheMask } from 'vue-the-mask';

import Toggle from '~/components/cms/common/Toggle';
import CategoryPicker from '~/components/cms/info/CategoryPicker';

export default {
  name: 'Thematic',
  components: { CategoryPicker, Toggle, TheMask },
  data() {
    return {
      shortLink: this.$store.state.info.shortLink,
    };
  },
  computed: {
    sourceModList() {
      return this.$store.state.static.sourceMod[this.source];
    },
    mode: {
      get() {
        return this.$store.state.info.mode;
      },
      set(value) {
        this.$store.commit('info/set', { field: 'mode', value });
      },
    },
    title: {
      get() {
        return this.$store.state.info.title;
      },
      set(value) {
        let self = this;
        self.$store.commit('info/set', {
          field: 'title',
          value: value.trim(),
        });
        this.changeShortLink(value);
      },
    },
    annotation: {
      get() {
        return this.$store.state.info.annotation;
      },
      set(value) {
        this.$store.commit('info/set', { field: 'annotation', value });
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
    sourceMod: {
      get() {
        return this.$store.state.info.sourceMod;
      },
      set(value) {
        this.$store.commit('info/set', { field: 'sourceMod', value });
      },
    },
    email: {
      get() {
        return this.$store.state.info.email;
      },
      set(value) {
        this.$store.commit('info/set', { field: 'email', value });
      },
    },
    phone: {
      get() {
        return this.$store.state.info.phone;
      },
      set(value) {
        this.$store.commit('info/set', { field: 'phone', value });
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
    changeShortLink(value) {
      let mod = slugify(value);
      console.log(mod);
      mod.replace(/\s/, '-');
      console.log(mod);
      mod.trim();
      // .replace(/[^(\\x00-\\xFF)]+(?:$|\\s*)/, '');
      this.shortLink = mod;
      this.$store.commit('info/set', {
        field: 'shortLink',
        value: mod,
      });
    },
    set(field, value) {
      this.$store.commit('info/set', { field, value });
    },
    setModeTo(value) {
      this.$store.dispatch('info/changeModeTo', value);
    },
    setSourceTo(value) {
      this.$store.commit('info/set', { field: 'source', value });
      this.$store.dispatch('info/changeModeTo', this.mode);
    },
    setSourceModTo(value) {
      this.$store.commit('info/set', { field: 'sourceMod', value });
      this.$store.dispatch('info/changeModeTo', this.mode);
    },
    changePhoneTo(value) {
      this.$store.commit('info/set', { field: 'phone', value });
    },
    changeCategories(value) {
      this.$store.commit('info/set', { field: 'categories', value });
    },
    onImageChange(e) {
      const file = e.target.files[0];
    },
    onPICoverChange(image) {
      if (image) {
        console.log('Picture loaded.');
        this.$store.commit('info/set', { field: 'image', value: image });
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
  },
};
</script>
