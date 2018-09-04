import Vue from 'vue';

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
  set(state, { item, field, to }) {
    Vue.set(item, field, to);
  },
  addImage(state, payload) {
    state.selected.images.push(payload);
  },
  removeImageAt(state, payload) {
    state.selected.images.splice(payload, 1);
  },
};

export const actions = {};
