export const state = () => ({
  checkedHeadersList: [],
  checkedList: [],
  leftStack: {
    title: 'Неотсортированные',
    kind: 'stack',
    checked: false,
    compact: false,
    main: true,
    list: [],
  },
  stack: {
    title: 'Отсортированные',
    kind: 'stack',
    checked: false,
    compact: false,
    main: true,
    list: [],
  },
});

export const mutations = {
  setCheckedList(state, list) {
    state.checkedList = list;
  },
  setCheckedHeadersList(state, list) {
    state.checkedHeadersList = list;
  },
  addToUnsorted(state, items) {
    items.forEach(el => {
      state.leftStack.list.push(el);
    });
  },
  syncState(state) {
    this.$axios
      .$post('/cms/state', state)
      .catch(err => console.log(`[Error] Cannot post state to server: ${err}`));
  },
  pushFinalState(state) {
    this.$axios
      .post('/cms/final', state)
      .catch(err =>
        console.log(`[Error] Cannot post final state to server: ${err}`),
      );
  },
};

export const actions = {
  syncInfoState({ commit }, payload) {
    commit('info/setInfoState', payload, { root: true });
    commit('syncState');
  },
  syncSortState({ commit }, payload) {
    commit('sort/setSortState', payload);
    commit('syncState');
  },

  pushFinalState({ commit, state }) {
    commit('syncState');
    commit('pushFinalState');
  },
  syncState({ commit }, payload) {
    commit('setState', payload, { root: true });
    this.$axios
      .$post('/cms/state', payload)
      .catch(err => console.log(`[Error] Cannot post state to server: ${err}`));
  },
  fetchState({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('/cms/state')
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
};
