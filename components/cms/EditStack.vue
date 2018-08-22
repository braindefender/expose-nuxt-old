<template>
  <div
  ref="stack"
  :class="className">
    <div
      v-if="!isMain"
      class="ee-stack__background ee-stack__background--first"></div>
    <div
      v-if="!isMain"
      class="ee-stack__background ee-stack__background--second"></div>
    <div
      :class="this.innerStack.compact
        ? 'ee-stack__background ee-stack__background--third'
        : 'ee-stack__background ee-stack__background--third ee-stack__background--active'">
      <div class="ee-stack__top">
        <div class="ee-stack__controls">
          <div ref="progress" class="control-progress"></div>
        </div>
        <div class="ee-stack__info" @click="toggle">
          <div class="ee-stack__count">{{ count }} документов</div>
          <div class="ee-stack__title">{{this.innerStack.title}}</div>
        </div>
      </div>
      <div
        :class="this.options.left
          ? 'ee-stack-main__content'
          : 'ee-stack__content'"
        ref="stackContent">
        <transition name="content">
          <div class="ee-stack__list" v-if="!this.innerStack.compact" ref="stackList">
            <div
              v-for="(item, index) in innerStack.list" :key="index"
              v-if="item.clean !== true"
              class="ee-stack__list-item">
              <edit-stack
                v-if="item.kind === 'stack'"
                :stack="item"
                :options="{
                  left: false,
                  right: false,
                  checkOnClick: false,
                }">
              </edit-stack>
              <ESCard
                v-if="item.kind === 'book'"
                :item="item"
                :options="{
                  selectMode: true,
                  showBadges: true,
                  showLetters: false,
                  checkOnClick: false,
                }"
                @select="select(index)">
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

import ESCard from '~/components/cms/ESCard';

export default {
  name: 'EditStack',
  components: { ESCard },
  props: ['stack', 'options'],
  data() {
    return {
      progressbar: Object,
    };
  },
  mounted() {
    this.progressbar = new progressbar.Circle(this.$refs.progress, {
      strokeWidth: 16,
      easing: 'easeInOut',
      duration: 1000,
      color: '#4680ff',
    });
    this.progressbar.animate(this.progress);
  },
  updated() {
    // this.updateProgress();
  },
  watch: {
    progress(prev, next) {
      this.progressbar.animate(this.progress);
    },
  },
  computed: {
    count() {
      return this.countList(this.innerStack);
    },
    isMain() {
      return this.options.left || this.options.right;
    },
    className() {
      if (this.isMain) {
        return 'ee-stack-main';
      } else {
        if (this.innerStack.compact) {
          return 'ee-stack';
        } else {
          return 'ee-stack ee-stack--active';
        }
      }
    },
    innerStack() {
      if (this.options.left) {
        return this.$store.state.sortTest.stack;
      }
      return this.stack;
    },
    progress() {
      return (
        this.innerStack.list.reduce((acc, item) => {
          if (item.kind === 'stack') {
            return (acc += this.countProgress(item));
          } else {
            return item.progress ? (acc += item.progress) : acc;
          }
        }, 0) / this.count
      );
    },
  },
  methods: {
    countList(stack) {
      return stack.list.reduce((acc, item) => {
        if (item.kind === 'stack') {
          return (acc += this.countList(item));
        } else {
          return (acc += 1);
        }
      }, 0);
    },
    countProgress(stack) {
      return stack.list.reduce((acc, item) => {
        if (item.kind === 'stack') {
          return (acc += this.countProgress(item));
        } else {
          return item.progress ? (acc += item.progress) : acc;
        }
      }, 0);
    },
    toggle() {
      const canTogggle =
        !this.options.left && !this.options.right && !this.renameMode;
      if (canTogggle) {
        this.innerStack.compact = !this.innerStack.compact;
        // this.$emit('resize');
      }
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'

  .ee-stack-main
    display: flex
    flex-direction: column
    position: relative
    >.ee-stack__background
      &--third
        background: none
        box-shadow: none
        padding-left: 0
        padding-right: 0
        &:hover
          box-shadow: none
      >.ee-stack__top
        padding-left: 9px
    &__content
      .ee-stack__background--active
        background-color: rgba(black, 0.05)
        // background-color: #FD583B
        box-shadow: none
        &:hover
          box-shadow: none
        .ee-stack__background--active
          background-color: rgba(black, 0.1)
          // background-color: #FD7D54
          box-shadow: none
          &:hover
            box-shadow: none

  .ee-stack
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
      > .ee-stack__background--first,
      > .ee-stack__background--second,
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
      .ee-card-wrapper
        margin-bottom: 6px
        &:last-child
          margin-bottom: 0
</style>
