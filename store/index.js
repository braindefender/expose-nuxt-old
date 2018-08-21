import Vuex from 'vuex';
import Vue from 'vue';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';
import { resolve } from 'upath';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      editState: {
        selected: {
          selected: false,
        },
      },
      sortTest: {
        checkedList: [],
        checkedHeadersList: [],
        leftStack: {
          title: 'Неотсортированные',
          kind: 'stack',
          checked: false,
          compact: false,
          main: true,
          list: [
            {
              title: 'This is a title',
              year: 2007,
              source: 'Valve',
              author: 'inkshir',
              kind: 'book',
            },
          ],
        },
        stack: {
          title: 'Отсортированные',
          kind: 'stack',
          checked: false,
          compact: false,
          main: true,
          list: [
            {
              title: 'Категория',
              kind: 'stack',
              checked: false,
              compact: true,
              list: [
                {
                  title: 'Book Title',
                  author: 'Пупкин Вася',
                  authors: ['Пупкин Вася'],
                  kind: 'book',
                  checked: false,
                  progress: 0.33,
                },
                {
                  title: 'Book Title 2',
                  author: 'Вася Пупкин',
                  kind: 'book',
                  checked: false,
                  progress: 0.33,
                },
                {
                  title: 'Book Title 3',
                  kind: 'book',
                  checked: false,
                  progress: 0.33,
                },
                {
                  title: 'Подкатегория',
                  kind: 'stack',
                  checked: false,
                  compact: false,
                  list: [
                    {
                      title: 'Book Title 4',
                      kind: 'book',
                      checked: false,
                      progress: 0.33,
                    },
                    {
                      title: 'Book Title 5',
                      kind: 'book',
                      checked: false,
                      progress: 0.33,
                    },
                  ],
                },
                {
                  title: 'Подкатегория 2',
                  kind: 'stack',
                  checked: false,
                  compact: false,
                  list: [
                    {
                      title: 'Book Title 4',
                      kind: 'book',
                      checked: false,
                      progress: 0.33,
                    },
                    {
                      title: 'Book Title 5',
                      kind: 'book',
                      checked: false,
                      progress: 0.33,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      currentPage: 0,
      pageList: [
        {
          name: 'info',
          title: 'Информация',
        },
        {
          name: 'sort',
          title: 'Сортировка',
        },
        {
          name: 'edit',
          title: 'Редактирование',
        },
        {
          name: 'demo',
          title: 'Предпоказ',
        },
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
    },
    mutations: {
      setInfoState(state, expose) {
        state.expose = expose;
      },
      setSortState(state, sortTest) {
        console.log(state.sortTest);
        console.log(sortTest);
        state.sortTest = { ...state.sortTest, ...sortTest };
      },
      setPage(state, page) {
        state.currentPage = page;
      },
      setUnsortedItems(state, list) {
        state.unsortedItems = list;
      },
      setLeftCheckedList(state, list) {
        state.sortTest.checkedLeft = list;
      },
      setCheckedList(state, list) {
        state.sortTest.checkedList = list;
      },
      setCheckedHeadersList(state, list) {
        state.sortTest.checkedHeadersList = list;
      },
      addToUnsorted(state, items) {
        items.forEach(el => {
          state.sortTest.leftStack.list.push(el);
          console.log(state.sortTest.leftStack.list.length);
        });
      },
      selectOnEditScreen(state, item) {
        state.editState.selected.selected = false;
        state.editState.selected = item;
        state.editState.selected.selected = true;
      },
    },
    actions: {
      fetchInfoState({ commit, state }) {
        return new Promise((resolve, reject) => {
          this.$axios
            .$get('/cms/info')
            .then(res => {
              if (res !== '') {
                commit('setInfoState', res);
                resolve(res);
              } else {
                resolve(state.expose);
              }
            })
            .catch(err => {
              console.log(`[Error] Info: get info: ${err}`);
              reject(err);
            });
        });
      },
      syncInfoState({ commit }, payload) {
        commit('setInfoState', payload);
        this.$axios
          .$post('/cms/info', payload)
          .catch(err => console.log(`[Error] post info: ${err}`));
      },
      fetchSortState({ commit, state }) {
        return new Promise((resolve, reject) => {
          this.$axios
            .$get('/cms/sort')
            .then(res => {
              if (res !== '') {
                console.log('Server state: ', res);
                commit('setSortState', res);
                resolve(res);
              } else {
                console.log('Server is empty. Returning default state');
                resolve(state.sortTest);
              }
            })
            .catch(err => {
              console.log(`[Error] Sort: get info: ${err}`);
              reject(err);
            });
        });
      },
      syncSortState({ commit }, payload) {
        commit('setSortState', payload);
        this.$axios
          .$post('/cms/sort', payload)
          .catch(err => console.log(`[Error] post info: ${err}`));
      },
    },
  });
};

export default store;
