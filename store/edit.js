import Vue from 'vue';

export const state = () => ({
  selected: {
    selected: false,
    images: [],
  },
  original: {},
});

export const mutations = {
  selectOnEditScreen(state, { item, patch }) {
    state.original.selected = false;
    state.original = item;
    state.original.selected = true;
    state.selected = { ...item, ...patch };
  },
  updateSelected(state, item) {
    state.selected = item;
  },
  set(state, { item, field, to }) {
    if (field === 'cover') {
      Vue.set(state.original, 'hasCover', to !== undefined);
    }
    if (field === 'annotation') {
      Vue.set(state.original, 'hasAnnotation', to !== '');
    }
    Vue.set(item, field, to);
  },
  addImage(state, payload) {
    state.selected.images.push(payload);
  },
  removeImageAt(state, payload) {
    state.selected.images.splice(payload, 1);
  },
  mutateObject(state, { source, patch }) {
    console.log('source', source);
    console.log('patch', patch);
    Object.keys(patch).forEach(key => {
      source[key] = patch[key];
    });
    state.selected.selected = false;
    state.selected = source;
    state.selected.selected = true;
  },
};

export const actions = {
  selectOnEditScreen({ state, dispatch, commit }, item) {
    this.$axios
      .$get('book', {
        params: { irbis: item.irbis },
      })
      .then(res => {
        // commit('mutateObject', { source: item, patch: res[0] });
        commit('selectOnEditScreen', { item, patch: res[0] });
      })
      .catch(err => {
        console.log(err);
      });
  },
};
