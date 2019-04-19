<template>
  <header class="header">
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__list-item">
          <a class="header__link header__link--spsl" href="http://spsl.nsc.ru">
            <span>ГПНТБ</span> СО РАН
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="sass">

@import '~/styles/mixins.sass'

.header
  background-color: #222
  height: 48px
  display: flex
  align-items: center

  &__nav
    width: 1700px
    margin: 0 auto

  &__list
    list-style-type: none
    margin: 0
    padding: 0
    font-size: 0

  &__list-item
    margin: 0
    padding: 0

  &__link
    +tdn
    font-size: 14px
    color: white

    &--spsl
      position: relative
      font-weight: bold
      font-size: 22px
      margin-left: 40px
      span
        color: #f64b30
      &::after
        position: absolute
        top: -2px
        left: -40px
        content: ''
        width: 32px
        height: 32px
        background: url('~/assets/spsl-logo.svg') center no-repeat
        background-size: cover



</style>
