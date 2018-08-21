<template>
  <div
    ref="stack"
    :class="className">
    <div
      v-if="!isMain"
      class="es-stack__background es-stack__background--first"></div>
    <div
      v-if="!isMain"
      class="es-stack__background es-stack__background--second"></div>
    <div
      :class="this.innerStack.compact
        ? 'es-stack__background es-stack__background--third'
        : 'es-stack__background es-stack__background--third es-stack__background--active'">
      <div class="es-stack__top">
        <div class="es-stack__controls">
          <div
            class="es-card__check"
            @click="checkStack">
            <input type="checkbox" :checked="this.innerStack.checked">
            <label></label>
          </div>
        </div>
        <div class="es-stack__info" @click="toggle">
          <div
            v-if="!this.renameMode"
            class="es-stack__count">{{ count }} документов</div>
          <div
            v-if="!this.renameMode"
            class="es-stack__title">
            {{this.innerStack.title}}
          </div>
          <input
            type="text"
            v-if="this.renameMode"
            class="es-stack__title-input"
            v-model="innerStack.title"
            @keyup.enter="rename">
        </div>
        <transition name="slide-fade" mode="out-in">
          <div
            v-if="this.checkedList.length === 0"
            key="es-stack-buttons-1"
            class="es-stack__buttons">
            <button
              v-if="!isMain && !this.renameMode"
              class="button-small button-small--rename"
              type="button" @click="rename">
            </button>
            <button
              v-if="!isMain && this.renameMode"
              class="button-small button-small--ok"
              type="button" @click="rename">
            </button>
            <button
              v-if="!isMain"
              class="button-small button-small--up"
              type="button" @click="moveUp">
            </button>
            <button
              v-if="!isMain"
              class="button-small button-small--down"
              type="button" @click="moveDown">
            </button>
          </div>
          <div
            v-else
            key="es-stack-buttons-2"
            class="es-stack__buttons">
            <button
              v-if="!innerStack.checked && !options.left"
              class="button-small button-small--add"
              type="button" @click="!innerStack.checked ? addStack() : ''"></button>
            <button
              v-if="!innerStack.checked && !isMain"
              class="button-small button-small--move"
              type="button" @click="!innerStack.checked ? moveItems() : ''"></button>
            <button
              v-if="!innerStack.checked && !isMain"
              class="button-small button-small--copy"
              type="button" @click="!innerStack.checked ? copyTo() : ''"></button>
            <button
              class="button-small button-small--remove"
              type="button" @click="remove()"></button>
          </div>
        </transition>
      </div>
      <div
        :class="this.options.right
          ? 'es-stack-main__content'
          : 'es-stack__content'"
        ref="stackContent">
        <transition name="content"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave">
          <div class="es-stack__list" v-if="!this.innerStack.compact" ref="stackList">
            <div
              v-for="(item, index) in innerStack.list" :key="index"
              v-if="item.clean !== true"
              class="es-stack__list-item">
              <test-stack
                v-if="item.kind === 'stack'"
                :stack="item"
                :options="{
                  left: false,
                  right: false,
                  checkOnClick,
                }"
                @checkItem="checkItem(index)"
                @moveUp="handleMoveUp(index)"
                @moveDown="handleMoveDown(index)"
                @updateCheckState="updateCheckState">
              </test-stack>
              <ESCard
                v-if="item.kind === 'book'"
                :item="item"
                :options="{
                  selectMode: false,
                  showLetters: false || showLetters,
                  showLetter: letters[index],
                  checkOnClick
                }"
                @check="checkItem(index)">
              </ESCard>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import progressbar from 'progressbar.js';
import { mapState } from 'vuex';

import TestStack from '~/components/cms/TestStack';
import ESCard from '~/components/cms/ESCard';

export default {
  name: 'TestStack',
  components: { TestStack, ESCard },
  props: ['stack', 'options'],
  data() {
    return {
      listHeight: Number,
      renameMode: false,
      showLetters: false || this.options.showLetters,
    };
  },
  watch: {
    innerStack() {
      // this.cleanup();
    },
  },
  mounted() {
    this.$on('resize', this.resize);
  },
  updated() {
    this.cleanup();
  },
  computed: {
    count() {
      return this.countList(this.innerStack);
    },
    stacks() {
      return this.countStacks(this.innerStack);
    },
    isMain() {
      return this.options.left || this.options.right;
    },
    className() {
      if (this.isMain) {
        return 'es-stack-main';
      } else {
        if (this.innerStack.compact) {
          return 'es-stack';
        } else {
          return 'es-stack es-stack--active';
        }
      }
    },
    letters() {
      return this.innerStack.list
        .map(el => (el.author ? el.author[0] : el.title[0]))
        .map((val, ind, arr) => val !== arr[ind - 1]);
    },
    checkOnClick() {
      return this.options.checkOnClick !== undefined
        ? this.options.checkOnClick
        : false;
    },
    innerStack(state) {
      if (this.options.left) {
        return this.$store.state.sortTest.leftStack;
      }
      if (this.options.right) {
        return this.$store.state.sortTest.stack;
      }
      return this.stack;
    },
    ...mapState({
      checkedList: state => state.sortTest.checkedList,
      checkedHeadersList: state => state.sortTest.checkedHeadersList,
    }),
  },
  methods: {
    toggle() {
      const canTogggle =
        !this.options.left && !this.options.right && !this.renameMode;
      if (canTogggle) {
        this.innerStack.compact = !this.innerStack.compact;
        this.$emit('resize');
      }
    },
    rename() {
      this.renameMode = !this.renameMode;
    },
    setChecked(item, to) {
      if (item.kind === 'stack') {
        item.list.forEach(el => this.setChecked(el, to));
      }
      item.checked = to;
    },
    setCleanup(item) {
      if (item.kind === 'stack') {
        item.list.forEach(el => this.setCleanup(el));
      }
      if (!item.main) {
        item.clean = true;
      }
      item.checked = false;
    },
    remove() {
      const newList = JSON.parse(JSON.stringify(this.checkedList));
      newList.forEach(item => {
        this.setChecked(item, false);
      });
      this.$store.commit('addToUnsorted', newList);
      if (this.innerStack.checked) {
        this.setCleanup(this.innerStack);
      } else {
        this.checkedHeadersList.forEach(item => this.setCleanup(item));
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
      const newList = JSON.parse(JSON.stringify(this.checkedList));
      newList.forEach(item => {
        this.setChecked(item, false);
      });
      this.innerStack.list = this.innerStack.list.concat(newList);
      this.checkedHeadersList.forEach(item => this.setCleanup(item));
      this.updateCheckState();
    },
    addStack() {
      const list = this.checkedList.slice();
      const checkedHeadersList = this.checkedHeadersList.slice();
      list.forEach(item => this.setChecked(item, false));
      const newList = JSON.parse(JSON.stringify(list));
      this.innerStack.list.push({
        title: 'Новая категория',
        checked: false,
        compact: false,
        kind: 'stack',
        list: newList,
      });
      list.forEach(item => this.setCleanup(item));
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
      if (position < this.stacks - 1) {
        const item = this.innerStack.list[position];
        this.innerStack.list[position] = this.innerStack.list[position + 1];
        this.$set(this.innerStack.list, position + 1, item);
      }
    },
    cleanup() {
      const clean = this.innerStack.list.filter(item => !item.clean);
      if (clean.length !== this.innerStack.list.length) {
        this.innerStack.list = clean;
      }
    },
    sortList() {
      this.innerStack.list.sort((el1, el2) => {
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
    countStacks(stack) {
      return stack.list.reduce(
        (acc, item) => (item.kind === 'stack' ? (acc += 1) : acc),
        0,
      );
    },
    countList(stack) {
      return stack.list.reduce((acc, item) => {
        if (item.kind === 'stack') {
          return (acc += this.countList(item));
        } else {
          return (acc += 1);
        }
      }, 0);
    },
    updateCheckState() {
      this.cleanup();
      this.sortList();
      let list = this.innerStack.list;
      const number = list.reduce(
        (acc, item) => (item.checked ? (acc += 1) : acc),
        0,
      );
      if (this.innerStack.list.length > 0) {
        this.innerStack.checked = number === list.length;
      } else {
        this.innerStack.checked = false;
      }
      this.$set(this.innerStack, 'list', list);
      this.getChecked(this.innerStack);
      this.getCheckedHeaders(this.innerStack);
      this.$emit('updateCheckState');
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
        if (item.kind === 'stack') {
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
        if (item.kind === 'stack') {
          checkedList = checkedList.concat(this.getChecked(item));
        } else {
          if (item.checked) {
            checkedList.push(item);
          }
        }
      });
      if (this.isMain) {
        this.$store.commit('setCheckedList', checkedList);
      }
      return checkedList;
    },
    getCheckedHeaders(stack) {
      let checkedHeadersList = [];
      if (stack.checked) {
        checkedHeadersList.push(stack);
      } else {
        stack.list.forEach(item => {
          if (item.checked) {
            checkedHeadersList.push(item);
          } else {
            if (item.kind === 'stack') {
              checkedHeadersList = checkedHeadersList.concat(
                this.getCheckedHeaders(item),
              );
            }
          }
        });
      }
      if (this.isMain) {
        this.$store.commit('setCheckedHeadersList', checkedHeadersList);
      }
      return checkedHeadersList;
    },
    beforeEnter() {},
    enter() {},
    afterEnter() {},
    beforeLeave() {},
    leave() {},
    afterLeave() {},
    resize() {
      // this.$refs.stackContent.velocity({ height: 'auto' }, { duration: 250 });
    },
  },
};
</script>

<style lang="sass" scoped>

  @import '@/styles/mixins.sass'

  .list-enter-active, .list-leave-active
    transition: all 1s

  .list-enter, .list-leave-to
    opacity: 0
    transform: translateY(30px)

  .es-stack-main
    display: flex
    flex-direction: column
    position: relative
    >.es-stack__background
      &--third
        background: none
        box-shadow: none
        padding-left: 0
        padding-right: 0
        &:hover
          box-shadow: none
      >.es-stack__top
        padding-left: 9px
    &__content
      .es-stack__background--active
        background-color: rgba(black, 0.05)
        // background-color: #FD583B
        box-shadow: none
        &:hover
          box-shadow: none
        .es-stack__background--active
          background-color: rgba(black, 0.1)
          // background-color: #FD7D54
          box-shadow: none
          &:hover
            box-shadow: none


  .es-stack
    position: relative
    border-radius: 10px
    cursor: pointer
    display: flex
    flex-direction: column
    min-height: 54px
    transition: all ease 0.25s
    padding-bottom: 12px
    &--active
      padding-bottom: 0
      > .es-stack__background--first,
      > .es-stack__background--second,
        bottom: 16px
        opacity: 0
    &__background
      border-radius: 10px
      transition: all ease 0.25s
      &--first
        position: absolute
        top: 0
        left: 10px
        right: 10px
        bottom: 6px
        background-color: rgba(black, 0.15)
        clip-path: inset(calc(100% - 6px) 0 0 0)
      &--second
        position: absolute
        top: 0
        left: 20px
        right: 20px
        bottom: 0px
        clip-path: inset(calc(100% - 6px) 0 0 0)
        background-color: rgba(black, 0.3)
      &--third
        position: relative
        width: 100%
        padding-top: 4px
        padding-left: 8px
        padding-right: 8px
        padding-bottom: 8px
        background-color: white
        border: 2px solid rgba($color-accent, 0)
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.05)
        &:hover
          box-shadow: 0px 2px 5px rgba(black, 0.1), 0px 4px 16px rgba(black, 0.05)
      &--active
        background-color: #EBECF0
    &__top
      display: flex
      flex-direction: row
    &__buttons
      display: flex
      flex-direction: row
      align-items: center
      padding-top: 5px
      button
        margin-left: 13px
        &:first-child
          margin-left: 0
    &__controls
      width: 48px
      min-height: 36px
      margin-left: -9px
      padding-top: 10px
      flex: 0 0 auto
      display: flex
      flex-direction: column
      align-items: center
    &__info
      flex-grow: 1
      padding-top: 2px
    &__count
      font-size: 14px
      line-height: 20px
      color: rgba(black, 0.4)
    &__title
      margin-top: -3px
      font-size: 16px
      line-height: 16px
      font-weight: bold
      margin-bottom: -3px
      max-width: 280px
    &__title-input
      display: flex
      resize: none
      width: 280px
      padding: 0
      margin: 0
      font-weight: bold
      border: none
      outline: none
      font-size: 16px
      line-height: 16px
      font-family: 'PT Sans'
      min-height: 32px
      background-color: rgba(black, 0.1)
      border-radius: 5px
      overflow: hidden
      padding-left: 8px
      padding-right: 8px
      margin-left: -8px
      margin-top: 2px
    &__list
      padding-top: 10px
    &__list-item
      margin-bottom: 6px
      &:last-child
        margin-bottom: 0
      .es-card-wrapper
        margin-bottom: 6px
        &:last-child
          margin-bottom: 0

  .slide-fade-enter-active
    transition: all 0.15s ease-in-out

  .slide-fade-leave-active
    transition: all 0.15s ease-in-out

  .slide-fade-enter, .slide-fade-leave-to
    opacity: 0
    margin-right: 3px

  .slide-fade-enter-to, .slide-fade-leave
    opacity: 1
</style>
