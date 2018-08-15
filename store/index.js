import Vuex from 'vuex';
import Vue from 'vue';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';
import {
  resolve
} from 'upath';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      sortTest: {},
      currentPage: 0,
      pageList: [{
          name: 'info',
          title: 'Информация'
        },
        {
          name: 'sort',
          title: 'Сортировка'
        },
        {
          name: 'edit',
          title: 'Редактирование'
        },
        {
          name: 'demo',
          title: 'Предпоказ'
        },
      ],
      modeList: [{
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
      sourceList: [{
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
      sortState: {
        struct: [{
            title: 'Название категории',
            type: 'stack',
            list: [{
                title: 'Название книги',
                source: 'Издательство книги',
                year: '2008',
                pages: '145',
                author: 'Автор книги',
                type: 'book',
              },
              {
                title: 'Название подкатегории',
                type: 'stack',
                list: [{
                  title: 'Название книги',
                  source: 'Издательство книги',
                  year: '2008',
                  pages: '145',
                  author: 'Автор книги',
                  type: 'book',
                }, ],
              },
              {
                title: 'Название подкатегории',
                type: 'stack',
                list: [{
                    title: 'Название книги',
                    source: 'Издательство книги',
                    year: '2008',
                    pages: '145',
                    author: 'Автор книги',
                    type: 'book',
                  },
                  {
                    title: 'Название книги',
                    source: 'Издательство книги',
                    year: '2008',
                    pages: '145',
                    author: 'Автор книги',
                    type: 'book',
                  },
                ],
              },
            ],
          },
          {
            title: 'Название категории',
            type: 'stack',
            list: [{
                title: 'Название книги',
                source: 'Издательство книги',
                year: '2008',
                pages: '145',
                author: 'Автор книги',
                type: 'book',
              },
              {
                title: 'Название подкатегории',
                type: 'stack',
                list: [{
                  title: 'Название книги',
                  source: 'Издательство книги',
                  year: '2008',
                  pages: '145',
                  author: 'Автор книги',
                  type: 'book',
                }, ],
              },
              {
                title: 'Название подкатегории',
                type: 'stack',
                list: [{
                    title: 'Название книги',
                    source: 'Издательство книги',
                    year: '2008',
                    pages: '145',
                    author: 'Автор книги',
                    type: 'book',
                  },
                  {
                    title: 'Название книги',
                    source: 'Издательство книги',
                    year: '2008',
                    pages: '145',
                    author: 'Автор книги',
                    type: 'book',
                  },
                ],
              },
            ],
          },
        ],
        unsorted: [{
          title: 'This is a title',
          year: 2007,
          source: 'Valve',
          author: 'inkshir',
          type: 'book',
        }, ],
      },
    },
    mutations: {
      setInfoState(state, expose) {
        state.expose = expose;
      },
      setSortState(state, sortState) {
        state.sortState = sortState;
      },
      setPage(state, page) {
        state.currentPage = page;
      },
      setUnsortedItems(state, list) {
        state.unsortedItems = list;
      },
      setCheckedHeadersList(state, list) {
        state.sortTest.checkedHeadersList = list;
      }
    },
    actions: {
      fetchInfoState({
        commit,
        state
      }) {
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
      syncInfoState({
        commit
      }, payload) {
        commit('setInfoState', payload);
        this.$axios
          .$post('/cms/info', payload)
          .catch(err => console.log(`[Error] post info: ${err}`));
      },
      fetchSortState({
        commit,
        state
      }) {
        return new Promise((resolve, reject) => {
          this.$axios
            .$get('/cms/sort')
            .then(res => {
              if (res !== '') {
                commit('setSortState', res);
                resolve(res);
              } else {
                console.log('Server is empty. Returning default state');
                resolve(state.sortState);
              }
            })
            .catch(err => {
              console.log(`[Error] Sort: get info: ${err}`);
              reject(err);
            });
        });
      },
      syncSortState({
        commit
      }, payload) {
        commit('setSortState', payload);
        this.$axios
          .$post('/cms/sort', payload)
          .catch(err => console.log(`[Error] post info: ${err}`));
      },
    },
  });
};

export default store;
