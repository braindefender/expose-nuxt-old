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
    state.dates[field] = value;
  },
};

export const actions = {
  syncInfoState({ commit, dispatch }, payload) {
    commit('setInfoState', payload);
    dispatch('syncState', null, { root: true });
  },
};
