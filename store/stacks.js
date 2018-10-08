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

const sortByAuthor = function(stack, inverse) {
  stack.list.sort((v1, v2) => {
    if (v1.kind === stack) {
      return 0;
    }
    if (v2.kind === stack) {
      return 0;
    }
    if (v1.author === undefined) {
      return 1;
    }
    if (v2.author === undefined) {
      return -1;
    }
    if (inverse) {
      return v1.author > v2.author;
    } else {
      return v1.author < v2.author;
    }
  });
  stack.list.forEach(item => {
    if (item.kind === 'stack') {
      sortByAuthor(item, inverse);
    }
  });
};

const cleanup = function(item) {
  if (item.kind === 'stack') {
    // item.list.forEach(el => console.log(el.title));
    item.list = item.list.filter(item => !item.clean);
    item.list.forEach(item => cleanup(item));
  }
};

const getCheckedListOf = function(stack) {
  let checkedList = [];
  // console.log('checked!', stack);
  stack.list.forEach(el => {
    if (el.kind === 'stack') {
      checkedList = checkedList.concat(getCheckedListOf(el));
    } else {
      if (el.checked) {
        checkedList.push(el);
      }
    }
  });
  return checkedList;
};

const getCheckedHeadersListOf = function(stack) {
  let checkedHeadersList = [];
  if (stack.checked) {
    checkedHeadersList.push(stack);
  } else {
    stack.list.forEach(el => {
      if (el.checked) {
        checkedHeadersList.push(el);
      } else {
        if (el.kind === 'stack') {
          checkedHeadersList = checkedHeadersList.concat(
            getCheckedHeadersListOf(el),
          );
        }
      }
    });
  }
  return checkedHeadersList;
};

const sort = function(item) {
  if (item.kind === 'stack') {
    item.list.forEach(el => sort(el));
    const stacks = item.list.filter(el => el.kind === 'stack');
    const nonStacks = item.list.filter(el => el.kind !== 'stack');
    nonStacks.sort((v1, v2) => {
      const cmp1 = v1.author ? v1.author : v1.title;
      const cmp2 = v2.author ? v2.author : v2.title;
      return cmp1 < cmp2 ? -1 : cmp1 > cmp2;
    });
    item.list = stacks.concat(nonStacks);
  }
};

const update = function(item) {
  if (item.kind === 'stack') {
    // Очистка удалённых
    // console.log('l1: ', item.list.length);
    cleanup(item);
    // console.log('l2: ', item.list.length);
    // Если пустой, то ставим маркер удаления
    if (item.list.length === 0) {
      item.checked = false;
      if (!item.main) {
        item.clean = true;
      }
    } else {
      // Сортировка
      item.list.forEach(el => sort(el));
      // Рекурсивный вызов для внутренностей
      item.list.forEach(el => update(el));
      // Количество отмеченных
      const checkedCount = item.list.reduce(
        (acc, el) => (el.checked ? (acc += 1) : acc),
        0,
      );
      if (checkedCount === item.list.length) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    }
  }
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
    list: [],
  },
});

export const mutations = {
  swapPosition(state, { stack, pos1, pos2 }) {
    const item1 = stack.list[pos1];
    const item2 = stack.list[pos2];
    Vue.set(stack.list, pos1, item2);
    Vue.set(stack.list, pos2, item1);
  },
  addNewStack(state, { stack, list }) {
    stack.list.push({
      title: 'Новая категория',
      checked: false,
      compact: false,
      kind: 'stack',
      list,
    });
  },
  set(state, { item, field, to }) {
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
  sortByAuthor(state, { stack, inverse }) {
    sortByAuthor(stack, inverse);
  },
  updateStackList(state, { stack, list }) {
    stack.list = list;
  },
  checkItem(state, item) {
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
      el.position = 0;
      state.leftStack.list.push(el);
    });
  },
  toggleStack(state, stack) {
    stack.compact = !stack.compact;
  },
  update(state) {
    update(state.stack);
    update(state.leftStack);
  },
};

export const actions = {
  checkStack({ commit, dispatch }, { stack, to }) {
    if (to !== undefined) {
      commit('set', { item: stack, field: 'checked', to });
    } else {
      commit('checkItem', stack);
    }
    const toChange = to !== undefined ? to : stack.checked;
    stack.list.forEach(item => {
      if (item.kind === 'stack') {
        dispatch('checkStack', { stack: item, to: toChange });
      } else {
        commit('set', { item, field: 'checked', to: toChange });
      }
    });
  },
  setChecked({ commit, dispatch }, { item, to }) {
    if (item.kind === 'stack') {
      item.list.forEach(el =>
        dispatch('setChecked', {
          item: el,
          to,
        }),
      );
    }
    commit('set', { item, field: 'checked', to });
  },
  setCleanup({ commit, dispatch }, item) {
    if (item.kind === 'stack') {
      item.list.forEach(el => dispatch('setCleanup', el));
    }
    if (!item.main) {
      commit('set', { item, field: 'clean', to: true });
    }
    commit('set', { item, field: 'checked', to: false });
  },
  remove({ state, dispatch, commit }) {
    let checked = JSON.parse(JSON.stringify(state.checkedList));
    state.checkedHeadersList.forEach(item => dispatch('setCleanup', item));
    checked = checked.filter(item => item.position !== 0);
    checked.forEach(item => {
      dispatch('setChecked', { item, to: false });
      item.position = 0;
    });
    commit('addToUnsorted', checked);
    dispatch('update');
    commit('sortStackList', state.leftStack);
  },
  update({ commit, dispatch, state }) {
    commit('update');
    commit(
      'setCheckedList',
      getCheckedListOf(state.stack).concat(getCheckedListOf(state.leftStack)),
    );
    commit(
      'setCheckedHeadersList',
      getCheckedHeadersListOf(state.stack).concat(
        getCheckedHeadersListOf(state.leftStack),
      ),
    );
  },
};
