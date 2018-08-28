export const state = () => ({
  selected: {
    selected: false,
    images: [],
  },
});

export const mutations = {
  selectOnEditScreen(state, item) {
    state.selected.selected = false;
    state.selected = item;
    state.selected.selected = true;
  },
  updateSelected(state, item) {
    state.selected = item;
  },
};

export const actions = {
  removeImageAt({ commit, state }, payload) {
    state.selected.images.splice(payload, 1);
  },
  addImage({ commit, state }, payload) {
    state.selected.images.push(payload);
  },
};
