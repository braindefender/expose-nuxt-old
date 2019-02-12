import Vue from 'vue';

import weekly0 from '@/assets/images/jamie-taylor-110195-unsplash.jpg';
import weekly1 from '@/assets/images/janko-ferlic-174927-unsplash.jpg';

export const state = () => ({
  workerID: 'dummyuser',
  currentPage: 0,
  currentStatus: 'work',
  usersList: [],
  categoryList: [],
  exposeList: [],
  real: {},
});

export const mutations = {
  setState(state, { stacks, info }) {
    state.stacks = stacks;
    state.info = info;
  },
  syncState({ stacks, info }) {
    console.log(stacks.list)
    this.$axios
      .$post('/cms/state', { stacks, info })
      .catch(err => console.log(`[Error] Cannot post state to server: ${err}`));
  },
  setInfoState(state, payload) {
    state.info = payload;
  },
  setCategoryList(state, payload) {
    state.categoryList = payload;
  },
  setUsersList(state, payload) {
    state.usersList = payload;
  },
  setExposeList(state, payload) {
    Vue.set(state, 'exposeList', payload);
  },
  // unified setter
  set(state, { field, value }) {
    state[field] = value;
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
    console.log('in sync state')
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('/cms/state', {
          info: state.info,
          stacks: state.stacks,
        })
        .then(() => {
          resolve();
          console.log('in sync state resolve')
        })
        .catch(err => {
          console.log(`[Error] Cannot post state to server: ${err}`);
          reject();
        });
    });
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
  fetchUsersList({ commit }) {
    this.$axios.get('/cms/users').then(res => {
      commit('setUsersList', res.data);
    });
  },
  pushFinalState({ commit, state }) {
    // commit('syncState');
    // commit('pushFinalState', { root: true });
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/cms/final', {
          stacks: state.stacks,
          info: state.info,
        })
        .then(res => {
          resolve();
        })
        .catch(err => {
          console.log(`[Error] Cannot post final state to server: ${err}`);
          reject();
        });
    });
  },
  removeExpose({ commit, dispatch, state }, { _id, status }) {
    // console.log(payload);
    this.$axios
      .post('/cms/list/delete', {}, { params: { _id, status } })
      .then(res => {
        dispatch('fetchExposeList', status);
        console.log('Got list from server after delete:', res);
      });
  },
};
