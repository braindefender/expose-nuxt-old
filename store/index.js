import Vue from 'vue';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export const state = () => ({
  currentPage: 0,
  categoryList: [],
  exposeList: [],
  statusList: [
    { name: 'public', title: 'Опубликованные' },
    { name: 'waiting', title: 'Ожидающие публикации' },
    { name: 'hidden', title: 'Скрытые' },
  ],
  pageList: [
    { name: 'Info', title: '1. Информация' },
    { name: 'Sort', title: '2. Сортировка' },
    { name: 'Edit', title: '3. Редактирование' },
    { name: 'Demo', title: '4. Предпоказ' },
  ],
  modeList: [
    { index: 0, mode: 'weekly', title: 'Еженедельная' },
    { index: 1, mode: 'theme', title: 'Тематическая' },
  ],
  sourceList: [
    {
      index: 0,
      title: 'ГПНТБ СО РАН',
      weekly: `Еженедельная выставка новых поступлений\nГПНТБ СО РАН`,
      image: weekly0,
      email: 'abonement@gpntbsib.ru',
      phone: '+7 (913) 001-4485',
    },
    {
      index: 1,
      title: 'Отделение ГПНТБ СО РАН',
      weekly: `Еженедельная выставка новых поступлений\nотделения ГПНТБ СО РАН`,
      image: weekly1,
      email: 'abonement@gpntbsib.ru',
      phone: '+7 (913) 001-4485',
    },
  ],
});

export const mutations = {
  setState(state, { stacks, info }) {
    state.stacks = stacks;
    state.info = info;
  },
  syncState(state) {
    this.$axios
      .$post('/cms/state', { stacks: state.stacks, info: state.info })
      .catch(err => console.log(`[Error] Cannot post state to server: ${err}`));
  },
  setInfoState(state, payload) {
    state.info = payload;
  },
  setCategoryList(state, payload) {
    state.categoryList = payload;
  },
  setExposeList(state, payload) {
    Vue.set(state, 'exposeList', payload);
  },
  pushFinalState(state) {
    this.$axios
      .post('/cms/final', { stacks: state.stacks, info: state.info })
      .catch(err =>
        console.log(`[Error] Cannot post final state to server: ${err}`),
      );
  },
};

export const actions = {
  createNewExpose({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('/cms/new')
        .then(res => {
          commit('setState', res, { root: true });
          console.log('Got response from server:', res);
          resolve(res);
        })
        .catch(err => {
          console.log(`[Error] Cannot create new expose: ${err}`);
          reject(err);
        });
    });
  },
  fetchExposeList({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/cms/list/${payload}`)
        .then(res => {
          commit('setExposeList', res);
          console.log(`Got ${payload} expose list from server:`, res);
          resolve(res);
        })
        .catch(err => {
          console.log(
            `[Error] Cannot get ${payload} expose list from server:`,
            err,
          );
          reject(err);
        });
    });
  },
  fetchState({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('/cms/state', { params: { _id: payload } })
        .then(res => {
          if (res !== '') {
            commit('setState', res, { root: true });
            console.log('Got response from server:', res);
            resolve(res);
          } else {
            console.log('Got empty response from server');
            resolve(state);
          }
        })
        .catch(err => {
          console.log(`[Error] Cannot get state from server: ${err}`);
          reject(err);
        });
    });
  },
  syncState({ state }) {
    this.$axios
      .$post('/cms/state', {
        stacks: state.stacks,
        info: state.info,
      })
      .catch(err => console.log(`[Error] Cannot post state to server: ${err}`));
  },
  syncInfoState({ commit, dispatch }, payload) {
    commit('setInfoState', payload);
    dispatch('syncState', null, { root: true });
  },
  fetchCategoryList({ commit }) {
    this.$axios.get('/cms/categories').then(res => {
      commit('setCategoryList', res.data);
    });
  },
  pushFinalState({ commit }) {
    commit('syncState');
    commit('pushFinalState', { root: true });
  },
};
