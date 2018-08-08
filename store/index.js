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
