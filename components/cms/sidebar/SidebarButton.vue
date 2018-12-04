<template>
  <div class="sidebar-button" :class="mini ? 'sidebar-button--mini' : ''" @click="onClick">
    <div class="sidebar-button__icon" :class="`sidebar-button__icon--${icon}`"></div>
    <div ref="text" class="sidebar-button__text">Создать выставку</div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: () => 'add',
    },
    text: {
      type: String,
      required: true,
      default: () => 'Кнопка',
    },
  },
  watch: {
    mini(mini) {
      if (mini) {
        this.collapse();
      } else {
      }
    },
  },
  computed: {
    mini() {
      return !this.$store.state.sidebar.open;
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
    collapse() {
      // убрать текст
      TweenMax.to(this.$refs.text, 0.15, {
        className: 'sidebar-button__text sidebar-button__text--hidden',
      });
      // сузить кнопку
    },
    expand() {},
  },
};
</script>
