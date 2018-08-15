<template>
  <div class="stack">
    <div class="top">
      <div
        class="checkbox"
        :class="this.stack.checked ? 'checked' : ''"
        @click="checkStack">
      </div>
      <div class="title">{{this.stack.title}}</div>
      <button
        v-if="!this.options.main"
        class="button"
        type="button"
        @click="moveUp">
        Вверх
      </button>
      <button
        v-if="!this.options.main"
        class="button"
        type="button"
        @click="moveDown">
        Вниз
      </button>
      <button class="button" type="button" @click="moveTo">Сюда</button>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in innerStack.list" :key="index"
        class="list-item">
        <test-stack
          v-if="item.type === 'stack'"
          :stack="item"
          :options="{
            main: false
          }"
          @checkItem="checkItem(index)"
          @moveUp="handleMoveUp(index)"
          @moveDown="handleMoveDown(index)"
          @updateCheckState="updateCheckState">
        </test-stack>
        <book-card
          v-if="item.type === 'book'"
          :item="item"
          @check="checkItem(index)">
        </book-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TestStack from '~/components/cms/TestStack';
import BookCard from '~/components/cms/BookCard';

export default {
  name: 'TestStack',
  components: { TestStack, BookCard },
  props: ['stack', 'options'],
  data() {
    return {
      innerStack: this.stack,
    };
  },
  computed: {
    checkedHeadersList() {
      if (this.options.main) {
        const checkedHeadersList = this.getCheckedHeaders(this.innerStack);
        this.$store.commit('setCheckedHeadersList', checkedHeadersList);
        return checkedHeadersList;
      } else {
        return this.$store.state.sortTest.checkedHeadersList;
      }
    },
  },
  methods: {
    setChecked(item, to) {
      console.log(item.title);
      if (item.type === 'stack') {
        item.list.forEach(el => this.setChecked(el, to));
      }
      item.checked = to;
    },
    removeItem(index) {
      this.innerStack.list.splice(index, 1);
    },
    moveTo(position) {
      let items = [];
      this.checkedHeadersList.forEach(item => {
        const el = item;
        this.setChecked(el, false);
        items.push(el);
      });
      console.log(items);
      items = JSON.parse(JSON.stringify(items));
      this.innerStack.list = this.innerStack.list.concat(items);
    },
    handleMoveTo() {},
    moveUp() {
      this.$emit('moveUp');
    },
    handleMoveUp(position) {
      if (position > 0) {
        const item = this.innerStack.list[position];
        this.$set(
          this.innerStack.list,
          position,
          this.innerStack.list[position - 1],
        );
        this.$set(this.innerStack.list, position - 1, item);
      }
    },
    moveDown() {
      this.$emit('moveDown');
    },
    handleMoveDown(position) {
      if (position < this.innerStack.list.length - 1) {
        const item = this.innerStack.list[position];
        this.innerStack.list[position] = this.innerStack.list[position + 1];
        this.$set(this.innerStack.list, position + 1, item);
      }
    },
    updateCheckState() {
      let number = 0;
      this.innerStack.list.forEach(item => {
        if (item.checked) {
          number += 1;
        }
      });
      if (number === this.innerStack.list.length) {
        this.innerStack.checked = true;
      } else {
        this.innerStack.checked = false;
      }
      this.$emit('updateCheckState');
      if (this.options.main) {
        this.$store.commit(
          'setCheckedHeadersList',
          this.getCheckedHeaders(this.innerStack),
        );
      }
    },
    checkItem(index) {
      const item = this.innerStack.list[index];
      item.checked = !item.checked;
      this.updateCheckState();
      this.$emit('updateCheckState');
    },
    checkStack(e, st, to) {
      const stack = st || this.innerStack;
      if (to !== undefined) {
        stack.checked = to;
      } else {
        stack.checked = !stack.checked;
      }
      const toChange = to !== undefined ? to : stack.checked;
      stack.list.forEach(item => {
        if (item.type === 'stack') {
          this.checkStack(e, item, toChange);
        } else {
          item.checked = toChange;
        }
      });
      this.updateCheckState();
      this.$emit('updateCheckState');
    },
    getChecked(stack) {
      return checkedList;
    },
    showChecked() {
      this.getChecked(this.innerStack).forEach(item => console.log(item.title));
    },
    getCheckedHeaders(stack) {
      let checkedHeadersList = [];
      stack.list.forEach(item => {
        if (item.checked) {
          checkedHeadersList.push(item);
        } else {
          if (item.type === 'stack') {
            checkedHeadersList = checkedHeadersList.concat(
              this.getCheckedHeaders(item),
            );
          }
        }
      });
      return checkedHeadersList;
    },
    showCheckedHeaders() {
      this.getCheckedHeaders(this.innerStack).forEach(item =>
        console.log(item.title),
      );
    },
  },
};
</script>

<style lang="sass" scoped>
  .stack
    border-radius: 5px
    background-color: #333
    color: white
    padding: 15px
    padding-top: 10px
    .top
      display: flex
      align-items: center
      margin-bottom: 10px
    .button
      margin-right: 10px
      padding-left: 5px
      padding-right: 5px
      height: 24px
      font-size: 12px
    .title
      font-weight: bold
      padding: 0 10px
    .checkbox
      position: relative
      width: 16px
      height: 16px
      border-radius: 5px
      background-color: #4680ff
      &.checked
        background-color: #FB616F
    .list
      .list-item
        margin-bottom: 10px
        &:last-child
          margin-bottom: 0
        .stack
          background-color: #666
          .list
            .list-item
              .stack
                background-color: #999
</style>
