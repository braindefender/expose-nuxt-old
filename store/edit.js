import Vue from 'vue';

export const state = () => ({
  selected: {
    selected: false,
    images: [],
    fullImages: [],
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
    state.original = item;
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
  addFullImage(state, payload) {
    state.selected.fullImages.push(payload);
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
      .$get('cms/book', {
        params: { irbis: item.irbis },
      })
      .then(res => {
        // commit('mutateObject', { source: item, patch: res[0] });
        let fullItem = { item, patch: res[0] };
        fullItem.cover += `?_=${Date.now()}`;
        commit('selectOnEditScreen', fullItem);
      })
      .catch(err => {
        console.log(err);
      });
  },
  pushBook({ state, dispatch, commit }, item) {
    this.$axios.$post('/cms/book', item);
  },
};
