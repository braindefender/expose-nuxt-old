import Vue from 'vue';

export const state = () => ({
  _id: '',
  mode: 1,
  source: 0,
  sourceMod: 0,
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
        let sml = rootState.static.sourceMod;
        let sm = state.sourceMod;
        if (sml[state.source] != undefined) {
          commit('set', { field: 'title', value: sl.weekly });
          commit('set', { field: 'alt', value: sml[state.source][sm].alt });
          commit('set', {
            field: 'phones',
            value: sml[state.source][sm].phones,
          });
          commit('set', {
            field: 'sourceLink',
            value: sml[state.source][sm].sourceLink,
          });
          commit('set', {
            field: 'email',
            value: sml[state.source][sm].email,
          });
        } else {
          commit('set', { field: 'title', value: sl.weekly });
          commit('set', { field: 'phones', value: sl.phone });
          commit('set', { field: 'email', value: sl.email });
        }
        commit('set', { field: 'mode', value: 0 });
        commit('set', { field: 'image', value: '' });
        commit('set', { field: 'annotation', value: '' });
        break;
      }
      // thematic
      case 1: {
        commit('set', { field: 'mode', value: 1 });
        commit('set', { field: 'title', value: 'Измените название выставки' });
        commit('set', {
          field: 'shortLink',
          value: 'izmenite-nazvanie-vystavki',
        });
        break;
      }
    }
  },
  syncInfoState({ commit, dispatch }, payload) {
    commit('setInfoState', payload);
    dispatch('syncState', null, { root: true });
  },
};
