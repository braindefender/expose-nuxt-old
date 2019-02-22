import Vue from 'vue';

export const state = () => ({
  _id: '',
  mode: 1,
  source: 0,
  title: '',
  image: '',
  email: '',
  phone: '',
  author: 'Автор выставки',
  dates: {
    create: '1984-01-01',
    update: '1984-01-01',
    public: '1984-01-01',
    from: undefined,
    to: undefined,
  },
  annotation: '',
  categories: [],
});

export const mutations = {
  set(state, { field, value }) {
    state[field] = value;
  },
  setDate(state, { field, value }) {
    Vue.set(state.dates, field, value);
    // state.dates[field] = value;
  },
};

export const actions = {
  changeModeTo({ rootState, state, commit, dispatch }, mode) {
    switch (mode) {
      // weekly
      case 0: {
        let sl = rootState.static.sourceList[state.source];
        commit('set', { field: 'mode', value: 0 });
        commit('set', { field: 'image', value: '' });
        commit('set', { field: 'annotation', value: '' });
        commit('set', { field: 'title', value: sl.weekly });
        commit('set', { field: 'phone', value: sl.phone });
        commit('set', { field: 'email', value: sl.email });
        break;
      }
      // thematic
      case 1: {
        commit('set', { field: 'mode', value: 1 });
        commit('set', { field: 'title', value: 'Измените название выставки' });
        commit('set', { field: 'shortLink', value: 'change-short-link' });
        break;
      }
    }
  },
  syncInfoState({ commit, dispatch }, payload) {
    commit('setInfoState', payload);
    dispatch('syncState', null, { root: true });
  },
};
