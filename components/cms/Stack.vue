<template>
  <div
    :class="compact
      ? 'es-stack'
      : 'es-stack es-stack--active'" ref="stack">
    <div class="es-stack__background es-stack__background--first"></div>
    <div class="es-stack__background es-stack__background--second"></div>
    <div
      :class="compact
        ? 'es-stack__background es-stack__background--third'
        : 'es-stack__background es-stack__background--third es-stack__background--active'">
      <div class="es-stack__top">
        <transition name="slide-fade">
          <div class="es-stack__controls" v-if="!compact">
            <div
              v-if="options.showProgress"
              ref="progress"
              class="control-progress"></div>
            <div
              v-if="options.showCheckbox"
              class="es-card__check"
              @click="check">
              <input type="checkbox" :checked="checked">
              <label></label>
            </div>
          </div>
        </transition>
        <div class="es-stack__info" @click="toggle">
          <div class="es-stack__count">{{ count }} документов</div>
          <div class="es-stack__title">{{ title }}</div>
        </div>
        <div class="es-stack__buttons">
          <button type="button" class="button button--outline">Привет мир!</button>
          <button type="button" class="button">Привет!</button>
        </div>
      </div>
      <div class="es-stack__content" ref="stackContent">
        <transition name="content"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
          v-on:after-leave="afterLeave">
          <div class="es-stack__list" v-if="!compact" ref="stackList">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="es-stack__list-item">
              <Stack
                v-if="item.type === 'stack'"
                :item="item"
                :options="{
                  showCheckbox: true
                }"></Stack>
              <ESCard
                v-if="item.type === 'book'"
                :item="item"
                :options="{
                  selectMode: false,
                  showBadges: false,
                  showLetters: false,
                  checked: checkedItems.includes(index),
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
import ESCard from '@/components/cms/ESCard';
import progressbar from 'progressbar.js';

export default {
  name: 'Stack',
  components: { ESCard },
  props: ['item', 'options'],
  data() {
    return {
      title: this.item.title || 'Измените название категории',
      list: this.item.list,
      compact: true,
      checked: false,
      checkedItems: [],
      listHeight: Number,
    };
  },
  mounted() {
    if (this.options.showProgress) {
      const p = new progressbar.Circle(this.$refs.progress, {
        strokeWidth: 16,
        easing: 'easeInOut',
        duration: 1000,
        color: '#4680ff',
      });
      p.animate(0.6);
    }
    this.$on('resize', this.resize);
  },
  computed: {
    count() {
      return this.list.length;
    },
  },
  methods: {
    resolveChecked() {
      if (this.checkedItems.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    checkItem(index) {
      const ind = this.checkedItems.indexOf(index);
      // console.log(ind);
      if (ind !== -1) {
        this.checkedItems.splice(ind, 1);
      } else {
        this.checkedItems.push(index);
      }
      this.resolveChecked();
    },
    toggle() {
      this.$parent.$emit('resize');
      this.compact = !this.compact;
    },
    check() {
      if (this.checked) {
        this.checkedItems = [];
      } else {
        this.checkedItems = this.list.map((val, ind) => ind);
      }
      this.checked = !this.checked;
    },
    beforeEnter() {
      this.$refs.stackContent.style.height = 0;
    },
    enter(el) {
      const elem = el;
      elem.style.opacity = 0;
      this.listHeight = this.$refs.stackList.offsetHeight;
      this.$refs.stackContent.velocity(
        { height: this.$refs.stackList.offsetHeight },
        {
          duration: 250,
          complete: () => {
            el.velocity({ opacity: 1 }, { duration: 250 });
          },
        },
      );
    },
    afterEnter() {
      this.listHeight = this.$refs.stackList.offsetHeight;
      this.$refs.stackContent.height = 'auto';
    },
    beforeLeave() {
      this.listHeight = this.$refs.stackList.offsetHeight;
      this.$refs.stackContent.height = this.listHeight;
    },
    leave(el, done) {
      el.velocity(
        { opacity: 0 },
        {
          duration: 250,
          complete: () => {
            this.$refs.stackContent.velocity(
              { height: 0 },
              {
                duration: 250,
                done,
              },
            );
          },
        },
      );
    },
    afterLeave(el) {
      const elem = el;
      elem.style.opacity = 0;
    },
    resize() {
      this.$refs.stackContent.velocity({ height: 'auto' }, { duration: 250 });
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'

  .list-enter-active, .list-leave-active
    transition: all 1s

  .list-enter, .list-leave-to
    opacity: 0
    transform: translateY(30px)

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
        margin-left: 10px
        &:first-child
          margin-left: 0
    &__controls
      width: 48px
      margin-left: -9px
      padding-top: 10px
      flex-grow: 0
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
      line-height: 20px
      font-weight: bold
      margin-bottom: -3px
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
      .es-stack__background--active
        background-color: #E1E2E5
        box-shadow: none

  .slide-fade-enter-active
    transition: all 0.35s ease

  .slide-fade-leave-active
    transition: all 0.35s ease

  .slide-fade-enter, .slide-fade-leave-to
    opacity: 0
    width: 10px

  .slide-fade-enter-to, .slide-fade-leave
    width: 48px

</style>
