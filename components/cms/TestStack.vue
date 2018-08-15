<template>
  <div class="stack">
    <div class="top">
      <div
        class="checkbox"
        :class="this.innerStack.checked ? 'checked' : ''"
        @click="checkStack">
      </div>
      <div class="title" @click="innerStack.title = 'ASDASD'">{{this.innerStack.title}}</div>
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
      <button class="button" type="button" @click="!innerStack.checked ? moveItems() : ''">Move</button>
      <button class="button" type="button" @click="!innerStack.checked ? copyTo() : ''">Copy</button>
      <button class="button" type="button" @click="remove()">Delete</button>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in innerStack.list" :key="index"
        v-if="item.clean !== true"
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
        <ESCard
          v-if="item.type === 'book'"
          :item="item"
          :options="{
            checkOnClick: true
          }"
          @check="checkItem(index)">
        </ESCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TestStack from '~/components/cms/TestStack';
import ESCard from '~/components/cms/ESCard';

export default {
  name: 'TestStack',
  components: { TestStack, ESCard },
  props: ['stack', 'options'],
  data() {
    return {};
  },
  watch: {
    'stack.list'() {},
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
    checkedList() {
      if (this.options.main) {
        const checkedList = this.getChecked(this.innerStack);
        this.$store.commit('setCheckedList', checkedList);
        return checkedList;
      } else {
        return this.$store.state.sortTest.checkedList;
      }
    },
    innerStack() {
      return this.options.main ? this.$store.state.sortTest.stack : this.stack;
    },
  },
  methods: {
    setChecked(item, to) {
      if (item.type === 'stack') {
        item.list.forEach(el => this.setChecked(el, to));
      }
      item.checked = to;
    },
    setCleanup(item) {
      if (item.type === 'stack') {
        item.list.forEach(el => this.setCleanup(el));
      }
      item.clean = true;
    },
    remove() {
      const checkedList = this.checkedList.slice();
      const checkedHeadersList = this.checkedHeadersList.slice();
      checkedList.forEach(el => this.setChecked(el, false));
      this.$store.commit('addToUnsorted', checkedList);
      if (this.innerStack.checked) {
        this.setCleanup(this.innerStack);
      } else {
        checkedHeadersList.forEach(item => this.setCleanup(item));
      }
      this.updateCheckState();
    },
    copyTo() {
      const list = this.checkedList;
      this.checkedHeadersList.forEach(item => {
        this.setChecked(item, false);
      });
      const newList = JSON.parse(JSON.stringify(list));
      this.innerStack.list = this.innerStack.list.concat(newList);
      this.updateCheckState();
    },
    moveTo() {
      const list = this.checkedHeadersList;
      list.forEach(item => {
        this.setChecked(item, false);
      });
      const newList = JSON.parse(JSON.stringify(list));
      this.innerStack.list = this.innerStack.list.concat(newList);
      list.forEach(item => this.setCleanup(item));
      this.updateCheckState();
    },
    moveItems() {
      const list = this.checkedList.slice();
      const checkedHeadersList = this.checkedHeadersList.slice();
      list.forEach(item => {
        this.setChecked(item, false);
      });
      const newList = JSON.parse(JSON.stringify(list));
      this.innerStack.list = this.innerStack.list.concat(newList);
      checkedHeadersList.forEach(item => this.setCleanup(item));
      this.updateCheckState();
    },
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
    cleanup() {
      this.innerStack.list = this.innerStack.list.filter(item => !item.clean);
    },
    updateCheckState() {
      this.cleanup();
      let list = this.innerStack.list;
      const number = list.reduce(
        (acc, item) => (item.checked ? (acc += 1) : acc),
        0,
      );
      this.innerStack.checked = number === list.length;
      this.$set(this.innerStack, 'list', list);
      this.$emit('updateCheckState');
      if (this.options.main) {
        this.$store.commit(
          'setCheckedHeadersList',
          this.getCheckedHeaders(this.innerStack),
        );
        this.$store.commit('setCheckedList', this.getChecked(this.innerStack));
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
      let checkedList = [];
      stack.list.forEach(item => {
        if (item.type === 'stack') {
          checkedList = checkedList.concat(this.getChecked(item));
        } else {
          if (item.checked) {
            checkedList.push(item);
          }
        }
      });
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
        margin-bottom: 6px
        &:last-child
          margin-bottom: 0
        .stack
          background-color: #666
          .list
            .list-item
              .stack
                background-color: #999
</style>
