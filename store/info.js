export const state = () => ({
  mode: 0,
  source: 0,
  title: 'Измените название выставки',
  annotation: 'Измените описание выставки',
  image: '',
  email: '',
  phone: '',
  author: 'Автор выставки',
  dates: {},
});

export const mutations = {
  set(state, { field, value }) {
    state[field] = value;
  },
  setInfoState(state, payload) {
    state = payload;
  },
};
