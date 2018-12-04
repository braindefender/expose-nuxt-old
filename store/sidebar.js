export const state = () => ({
  open: false,
});

export const mutations = {
  open(state) {
    state.open = true;
  },
  close(state) {
    state.open = false;
  },
  toggle(state) {
    state.open = !state.open;
  },
};

export const actions = {
  toggleSidebar({ commit, state }) {
    commit('open');
  },
};
