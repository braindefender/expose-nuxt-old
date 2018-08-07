<template>
  <div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.min.js"></script>
    <nuxt/>
  </div>
</template>

<style lang="sass">
  html
    font-family: 'PT Sans', -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif
    font-size: 16px
    word-spacing: 1px
    -ms-text-size-adjust: 100%
    -webkit-text-size-adjust: 100%
    -moz-osx-font-smoothing: grayscale
    -webkit-font-smoothing: antialiased
    box-sizing: border-box
    color: black

  *,
  *:before,
  *:after
    box-sizing: border-box
    margin: 0

  body
    margin: 0
    padding: 0

  @import '@/styles/mixins.sass'
  @import '@/styles/vars.sass'

  .bold
    font-weight: bold

  .cms
    height: 100vh
    overflow: hidden
    overflow-y: auto
  .cms-page
      background: $color-bg

  @mixin button($color)
    box-sizing: border-box
    margin: 0
    padding: 0
    user-select: none
    border: none
    outline: none
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: all ease 0.2s
    box-shadow: 0 3px 6px rgba($color, 0)
    position: relative
    background: $color
    border: 2px solid rgba($color, 0)
    +tdn
    &::before
      +posa(0)
      transition: all ease 0.2s
      content: ''
    &:hover
      box-shadow: 0px 3px 6px rgba($color, 0.4)
    &:active
      transform: scale(0.985)
      &::before
        background-color: rgba(black, 0.1)
    &:focus
      box-shadow: 0 0px 6px rgba($color, 0.8)

  .button
    +button($color-accent)
    font-family: 'PT Sans'
    color: white
    font-weight: bold
    font-size: 14px
    line-height: 20px
    padding-left: 13px
    padding-right: 13px
    height: 32px
    border-radius: 5px
    &--outline
      background: white
      color: $color-accent
      border: 2px solid $color-accent
      transition: all ease 0.3s
      &:active
        &::before
          background-color: rgba($color-accent, 0.25)

  .button-remove
    +button($color-error)
    width: 22px
    height: 22px
    border-radius: 5px
    &::after
      +posa(0)
      content: ''
      background: url('../assets/button-remove.svg') center center no-repeat

  .container
    width: 1170px
    padding-left: 10px
    padding-right: 10px
    margin: 0 auto

  .book-image
    min-height: 120px
    max-height: 400px
    position: relative
    border-radius: 5px
    &__image
      z-index: 10
      position: relative
      display: flex
      justify-content: center
      align-items: center
      border-radius: inherit
      overflow: hidden
      img
        width: 100%
    &__blur
      z-index: 5
      +blur-bg
      transition: all ease 0.3s

  .control-progress
    position: relative
    user-select: none
    border-radius: 50%
    background-color: rgba(black, 0.12)
    width: 22px
    height: 22px
    &::after
      +posa(3px)
      border-radius: inherit
      height: 16px
      width: 16px
      content: ''
      background-color: white

  .component-fade-enter-active, .component-fade-leave-active
    transition: all .8s ease

  .component-fade-enter
    opacity: 0
    transform: translateX(50px)
  .component-fade-leave-to
    opacity: 0
    transform: translateX(-50px)

  .component-fade-enter-to,
  .component-fade-leave
    opacity: 1
    transform: translateX(0px)

</style>
