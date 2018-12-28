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
  addImage(state, image) {
    state.selected.images.push(image);
  },
  addFullImage(state, image) {
    state.selected.fullImages.push(image);
  },
  removeImageAt(state, index) {
    state.selected.images.splice(index, 1);
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
  selectOnEditScreen({ commit }, item) {
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
  updateOnEditScreen({ commit }, item) {
    this.$axios
      .$get('cms/bookupdate', {
        params: { irbis: item.irbis },
      })
      .then(res => {
        console.log(res);
        // commit('mutateObject', { source: item, patch: res[0] });
        let fullItem = { item, patch: res };
        fullItem.cover += `?_=${Date.now()}`;
        commit('selectOnEditScreen', fullItem);
      })
      .catch(err => {
        console.log(err);
      });
  },
  pushBook({ commit }, item) {
    this.$axios.$post('/cms/book', item);
  },
};
