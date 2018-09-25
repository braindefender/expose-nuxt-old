export const state = () => ({
  mode: 1,
  source: 0,
  title: '',
  annotation: '',
  image: '',
  email: '',
  phone: '',
  author: 'Автор выставки',
  dateFrom: '1984-01-01',
  dateTo: '1984-01-01',
  categories: [],
  _id: '',
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
