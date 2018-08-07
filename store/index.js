import Vuex from 'vuex';
import Vue from 'vue';

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
      setPage(page) {
        state.currentPage = page;
      },
    },
  });
};

export default store;
