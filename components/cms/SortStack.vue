<template>
<div>
  <ul class="plain-list">
    <b>Неотсортированные</b>
    <li
      class="plain-list__item"
      v-for="(item, index) in items"
      :key="index"
      v-if="item.position === 0">
      {{ item.title }}
      <button @click="checkItem(item)" class="button">Check</button>
      <button @click="removeItems([item])" class="button">Delete</button>
    </li>
  </ul>
  <ul class="plain-list">
    <b>Отсортированные</b>
    <li
      class="plain-list__item"
      v-for="(item, index) in items.filter(a => a.position !== 0)"
      :key="index">
      {{ item.title }}
      <button @click="checkItem(item)" class="button"
      :class="checkedTree.includes(item.position) ? 'button--outline' : ''">Check</button>
      <button @click="removeItems([item])" class="button">Delete</button>
    </li>
  </ul>
  <ul>
    <test-stack
      :options="{ main: true }">
    </test-stack>
  </ul>
</div>
</template>

<script>
import TestStack from '~/components/cms/TestStack';

export default {
  name: 'SortStack',
  components: { TestStack },
  props: [],
  data() {
    return {
      items: [
        {
          title: 'This is a title 6',
          position: 0,
        },
      ],
      checkedTree: [],
      stackTree: [],
    };
  },
  computed: {
    tree() {
      const tree = [];
      this.items.forEach(item => {
        if (tree[item.position] === undefined) {
          tree[item.position] = [];
        }
        tree[item.position].push(item);
      });
      return tree;
    },
  },
  methods: {
    checkItem(item) {
      this.checkedTree.push(item.position);
    },
    moveStack(stack, to) {
      // todo
    },
    // 1.2
    duplicateItems(items) {
      items.forEach(item => {
        const newItem = item;
        newItem.position = -1;
        this.items.push(item);
      });
    },
    moveItems(items, to) {
      items.forEach(item => {
        item.position = to;
      });
    },
    removeItems(items) {
      items.forEach(item => {
        item.position = -1;
      });
    },
  },
};
</script>

<style lang="sass">

  .plain-list
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: flex-start
    &__item
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      margin-bottom: 5px
      button
        margin-left: 10px

</style>
