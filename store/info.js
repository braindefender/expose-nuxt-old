export const state = () => ({
  mode: 0,
  source: 0,
  title: 'Измените название выставки',
  annotation: 'Измените описание выставки',
  image: '',
  email: '',
  phone: '',
  author: 'Автор выставки',
  dateFrom: '',
  dateTo: '',
  categories: [],
});

export const mutations = {
  set(state, { field, value }) {
    state[field] = value;
  },
};

export const actions = {
  syncInfoState({ commit, dispatch }, payload) {
    commit('setInfoState', payload);
    dispatch('syncState', null, { root: true });
  },
};
