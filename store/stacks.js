import Vue from 'vue';

const sortByYear = function(stack, inverse) {
  stack.list.sort((v1, v2) => {
    if (v1.kind === stack) {
      return -1;
    }
    if (v2.kind === stack) {
      return 1;
    }
    if (inverse) {
      return v1.year > v2.year;
    } else {
      return v1.year < v2.year;
    }
  });
  stack.list.forEach(item => {
    if (item.kind === 'stack') {
      sortByYear(item, inverse);
    }
  });
};

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
    list: [{
      kind: 'book',
      checked: false,
      compact: false,
      title: 'asdash sdhajfk'
    }],
  },
});

export const mutations = {
  swapPosition(state, {
    stack,
    pos1,
    pos2
  }) {
    const item1 = stack.list[pos1];
    const item2 = stack.list[pos2];
    Vue.set(stack.list, pos1, item2);
    Vue.set(stack.list, pos2, item1);
  },
  addNewStack(state, {
    stack,
    list
  }) {
    stack.list.push({
      title: 'Новая категория',
      checked: false,
      compact: false,
      kind: 'stack',
      list,
    });
  },
  renameStack(state, stack) {},
  toggleStack(state, stack) {
    stack.compact = !stack.compact;
  },
  set(state, {
    item,
    field,
    to
  }) {
    Vue.set(item, field, to);
  },
  sortStackList(state, stack) {
    stack.list.sort((el1, el2) => {
      if (el1.kind === 'stack') {
        if (el2.kind === 'stack') {
          return 0;
        } else {
          return -1;
        }
      }
      if (el2.kind === 'stack') {
        return 1;
      } else {
        const cmp1 = el1.author ? el1.author : el1.title;
        const cmp2 = el2.author ? el2.author : el2.title;
        return cmp1 < cmp2 ? -1 : cmp1 > cmp2;
      }
    });
  },
  sortByYear(state, { stack, inverse }) {
    sortByYear(stack, inverse);
  },
  updateStackList(state, { stack, list }) {
    stack.list = list;
  },
  checkItem(state, item, to) {
    item.checked = !item.checked;
  },
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
};

export const actions = {
  checkStack({
    commit,
    dispatch
  }, {
    stack,
    to
  }) {
    if (to !== undefined) {
      commit('set', {
        item: stack,
        field: 'checked',
        to
      });
    } else {
      commit('checkItem', stack);
    }
    const toChange = to !== undefined ? to : stack.checked;
    stack.list.forEach(item => {
      if (item.kind === 'stack') {
        dispatch('checkStack', {
          stack: item,
          to: toChange
        });
      } else {
        commit('set', {
          item,
          field: 'checked',
          to: toChange
        });
      }
    });
  },
  setChecked({
    commit,
    dispatch
  }, {
    item,
    to
  }) {
    if (item.kind === 'stack') {
      item.list.forEach(el => dispatch('setChecked', {
        item: el,
        to
      }));
    }
    commit('set', {
      item,
      field: 'checked',
      to
    });
  },
  setCleanup({
    commit,
    dispatch
  }, item) {
    if (item.kind === 'stack') {
      item.list.forEach(el => dispatch('setCleanup', el));
    }
    if (!item.main) {
      commit('set', {
        item,
        field: 'clean',
        to: true
      });
    }
    commit('set', {
      item,
      field: 'checked',
      to: false
    });
  },
};
