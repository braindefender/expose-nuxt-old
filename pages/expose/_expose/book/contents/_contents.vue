<template>
  <div class="wrapper">
    <a
      :href="`/expose/${expose.link}/book/${book.link}`"
      class="book-page__return-link"
    >Вернуться к книге</a>
    <div class="contents">
      <div class="contents__title"></div>
    </div>
  </div>
</template>

<style lang="sass">

.wrapper
  display: flex
  justify-content: center

.contents


</style>
