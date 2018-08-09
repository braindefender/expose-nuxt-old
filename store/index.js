import Vuex from 'vuex';
import Vue from 'vue';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      currentPage: 0,
      pageList: [
        { name: 'info', title: 'Информация' },
        { name: 'sort', title: 'Сортировка' },
        { name: 'edit', title: 'Редактирование' },
        { name: 'demo', title: 'Предпоказ' },
      ],
      modeList: [
        {
          index: 0,
          mode: 'weekly',
          title: 'Еженедельная выставка',
        },
        {
          index: 1,
          mode: 'theme',
          title: 'Тематическая выставка',
        },
      ],
      sourceList: [
        {
          index: 0,
          title: 'ГПНТБ СО РАН',
          weekly: `Еженедельная выставка новых поступлений\nГПНТБ СО РАН`,
          image: weekly0,
        },
        {
          index: 1,
          title: 'Отделение ГПНТБ СО РАН',
          weekly: `Еженедельная выставка новых поступлений\nотделения ГПНТБ СО РАН`,
          image: weekly1,
        },
      ],
      expose: {
        mode: 0,
        source: 0,
        title: 'Измените название выставки',
        annotation: 'Измените описание выставки',
        image: weekly0,
        email: '',
        phone: '',
        author: 'Автор выставки',
      },
      unsortedItems: [
        {
          author: 'Ажевникова Н.А.',
          title:
            'Материалы к словарю метафор и сравнений русской литературы XIX-XX в.',
          source: 'Языки рус. культуры',
          year: '2018',
        },
        {
          author: 'Божевникова Н.А.',
          title:
            'Материалы к словарю метафор и сравнений русской литературы XIX-XX в.',
          source: 'Языки рус. культуры',
          year: '2018',
        },
        {
          author: 'Божевникова Н.А.',
          title:
            'Материалы к словарю метафор и сравнений русской литературы XIX-XX в.',
          source: 'Языки рус. культуры',
          year: '2018',
        },
        {
          author: 'Дожевникова Н.А.',
          title:
            'Материалы к словарю метафор и сравнений русской литературы XIX-XX в.',
          source: 'Языки рус. культуры',
          year: '2018',
        },
        {
          author: 'Дожевникова Н.А.',
          title:
            'Материалы к словарю метафор и сравнений русской литературы XIX-XX в.',
          source: 'Языки рус. культуры',
          year: '2018',
        },
      ],
    },
    mutations: {
      syncInfoState(state, expose) {
        state.expose = expose;
      },
      setPage(state, page) {
        state.currentPage = page;
      },
      setUnsortedItems(state, list) {
        state.unsortedItems = list;
      },
    },
  });
};

export default store;
