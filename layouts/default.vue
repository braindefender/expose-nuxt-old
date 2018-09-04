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

  .hidden
    display: none

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
    &--white
      background-color: white

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

  .button-error
    +button($color-error)
    background-color: $color-error
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
      background-color: white
      color: $color-error
      border: 2px solid $color-error
      &:active
        &::before
          background-color: rgba($color-error, 0.25)

  .button-remove
    +button($color-error)
    width: 22px
    height: 22px
    border-radius: 5px
    &::after
      +posa(0)
      content: ''
      background: url('../assets/button-remove.svg') center center no-repeat

  .button-small
    +button($color-accent)
    border: none
    width: 22px
    height: 22px
    display: flex
    border-radius: 5px
    overflow: hidden
    &--ok
      background: url('/assets/icon-small-ok.svg') center center no-repeat
    &--up
      background: url('/assets/icon-small-up.svg') center center no-repeat
    &--add
      background: url('/assets/icon-small-add.svg') center center no-repeat
    &--copy
      background: url('/assets/icon-small-copy.svg') center center no-repeat
    &--down
      background: url('/assets/icon-small-down.svg') center center no-repeat
    &--move
      background: url('/assets/icon-small-move.svg') center center no-repeat
    &--remove
      background: url('/assets/icon-small-remove.svg') center center no-repeat
    &--rename
      background: url('/assets/icon-small-rename.svg') center center no-repeat

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

  // Main screen
  .expose-main
    &__cover
      width: 100%
      height: 320px
      position: relative
      color: white
      background-color: #333
      &-inner
        +posa(0)
        pointer-events: none
      &-content
        display: flex
        justify-content: center
        align-items: center
        pointer-events: auto
      &-title
        text-align: center
        max-width: 680px
        font-weight: bold
        font-size: 32px
        line-height: 36px
        white-space: pre
      &-image
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        &::after
          +posa(0)
          content: ''
          background-color: rgba(black, 0.4)
        img
          width: 100%

  // Category / Catalogue layouts
  .cat-layout
    max-width: 810px
    padding-bottom: 20px
    &__grid
      display: grid
      grid-template-columns: repeat(auto-fill, 395px)
      grid-auto-row: auto
      grid-gap: 30px 20px
      grid-auto-flow: row
    &__slider
      width: 100%
      height: 226px
      background-color: #333
      border-radius: 5px
    &__panel
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: 64px
    &__title
      font-size: 20px
      font-weight: bold
      font-family: 'PT Sans'
    &__action
      cursor: pointer
      font-size: 14px
      color: #4680ff
      +tdn
    &__sort
      font-size: 0
    &__sort-button
      margin: 0
      padding: 0
      font-family: 'PT Sans'
      cursor: pointer
      color: #4680ff
      border: none
      outline: none
      background: none
      font-size: 14px
      margin-right: 20px
      &:last-child
        margin-right: 0
      &--active
        font-weight: bold
        color: black

</style>
