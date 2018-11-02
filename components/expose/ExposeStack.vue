<template>
  <div class="expose-stack">

    <div class="expose-stack__top" :id="stack.title.replace(/\s+/g, '-')">
      <div class="expose-stack__title">{{ stack.title }}</div>
      <div class="expose-stack__info">{{ info }}</div>
    </div>

    <div class="expose-stack__bot">
      <div v-for="(item, index) in stack.list" :key="index"
        v-if="item.clean !== true"
        class="expose-stack__item">

        <expose-stack
          v-if="item.kind === 'stack'"
          :stack="item">
        </expose-stack>

        <book-card
          v-if="item.kind === 'book'"
          :item="item">
        </book-card>

      </div>
    </div>

  </div>
</template>

<script>
import BookCard from '~/components/expose/BookCard';

export default {
  name: 'ExposeStack',
  props: ['stack'],
  components: { BookCard },
  data() {
    return {};
  },
  computed: {
    info() {
      return `Документов: ${this.count}`;
    },
    count() {
      return this.countList(this.stack);
    },
  },
  methods: {
    countList(stack) {
      if (stack.list) {
        return stack.list.reduce((acc, item) => {
          if (item.kind === 'stack') {
            return (acc += this.countList(item));
          } else {
            return (acc += 1);
          }
        }, 0);
      } else {
        return 0;
      }
    },
  },
};
</script>

<style lang="sass" scoped>

  .expose-stack
    border-radius: 5px
    background-color: rgba(black, 0.05)
    margin-bottom: 15px
    &:last-child
      margin-bottom: 0
    &__top
      padding-left: 30px
      padding-right: 30px
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: 54px
    &__title
      font-weight: bold
      font-size: 18px
    &__info
      font-weight: bold
      font-size: 15px
      color: rgba(black, 0.25)
    &__bot
      padding-left: 15px
      padding-right: 15px
      padding-bottom: 15px
    &__item
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0

</style>
