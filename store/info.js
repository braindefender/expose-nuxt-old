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
    Vue.$set(state.dates, field, value);
    // state.dates[field] = value;
  },
};

export const actions = {
  syncInfoState({ commit, dispatch }, payload) {
    commit('setInfoState', payload);
    dispatch('syncState', null, { root: true });
  },
  weeklyUpdate({ rootState, state, commit }) {
    // get sourceList
    let sl = rootState.static.sourceList;
    // set Title
    commit('set', {
      field: 'title',
      value: sl[state.source].weekly,
    });

    // set Phone
    commit('set', {
      field: 'phone',
      value: sl[state.source].phone,
    });

    // set Email
    commit('set', {
      field: 'email',
      value: sl[state.source].email,
    });
  },
};
