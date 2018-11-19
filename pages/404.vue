<template>
  <div class="cms-new-page cms-new-page">
    <div class="cms-new-page__content cms-new-page__content--404">
      <div class="cms-404">
        <p class="cms-404__404">404</p>
        <p class="cms-404__header">Страница не найдена!</p>
        <p class="cms-404__subheader">Возможно произошла ошибка или введён неверный адрес.</p>
        <a href="/cms" class="button">Вернуться на главную страницу</a>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  .cms-new-page__content--404
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: flex
    align-items: center
    justify-content: center

  .cms-404
    width: 800px
    height: 600px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    &__404
      font-size: 180px
      font-weight: bold
      font-family: Muller
      letter-spacing: -8px
      opacity: 0.15
    &__header
      margin: 0
      padding: 0
      font-size: 48px
      margin-bottom: 4px
      letter-spacing: -1px
    &__subheader
      font-size: 20px
      margin-bottom: 40px
      opacity: 0.6
      letter-spacing: -0.5px
    .button
      min-height: 56px
      font-size: 20px
      padding-left: 40px
      padding-right: 40px
</style>
