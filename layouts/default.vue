<template>
  <div>
    <script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.min.js"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.min.css"
    >
    <nuxt/>
  </div>
</template>

<style lang="sass">

  @import '~/assets/fonts/PTSans/stylesheet.css'
  @import '~/assets/fonts/PTMono/stylesheet.css'

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

  .popover
    background-color: rgba(black, 0.75)
    backdrop-filter: blur(5px);
    color: white
    font-size: 12px
    padding: 5px 10px
    margin: 5px
    border-radius: 5px

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
    &--dimmed
      background: rgba($color-accent, 0.1)
      color: rgba(black, 0.8)
      border: 1px solid rgba($color-accent, 0.5)
      transition: all ease 0.3s


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
    position: relative
    display: flex
    width: 22px
    height: 22px
    overflow: hidden
    border: none
    border-radius: 5px
    color: white
    flex: 0 0 auto
    &::after
      position: absolute
      top: 0
      left: 0
      bottom: 0
      width: 22px
      content: ''
      background: center center no-repeat
    &--wide
      width: auto
      background-position: 0px 0px
      padding-left: 22px
      padding-right: 8px
      font-size: 12px
    &--ok
      &::after
        background-image: url('/assets/icon-small-ok.svg')
    &--up
      &::after
        background-image: url('/assets/icon-small-up.svg')
    &--add
      &::after
        background-image: url('/assets/icon-small-add.svg')
    &--copy
      &::after
        background-image: url('/assets/icon-small-copy.svg')
    &--down
      &::after
        background-image: url('/assets/icon-small-down.svg')
    &--move
      &::after
        background-image: url('/assets/icon-small-move.svg')
    &--remove
      &::after
        background-image: url('/assets/icon-small-remove.svg')
    &--rename
      &::after
        background-image: url('/assets/icon-small-rename.svg')

  .checkbox
    user-select: none
    position: relative
    display: block
    width: 22px
    height: 22px
    background-color: rgba(black, 0.12)
    border-radius: 7px
    cursor: pointer
    transition: all ease 0.15s
    &::before
      +posa(3px)
      content: ''
      border-radius: 5px
      background-color: white
      transition: all ease 0.15s
    &::after
      +posa(5px)
      content: ''
      border-radius: 3px
      transition: all ease 0.15s
    &:hover
      &::after
        background-color: rgba(black, 0.12)
    &:active
      &::after
        background-color: $color-accent
    &.checkbox--checked
      &::after
        background-color: $color-accent
      &:hover
        &::after
          box-shadow: 0px 3px 6px rgba(70, 128, 255, 0.4)
      &:active
        &::after
          background-color: rgba(black, 0.12)

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
    width: 1700px
    padding-bottom: 20px
    margin: 0 auto
    display: flex
    flex-direction: column
    &__content
      display: flex
      flex-grow: 1
      width: 100%
      justify-content: center
    &__grid
      display: grid
      grid-template-columns: 1fr 1fr 1fr
      grid-gap: 40px 40px
      grid-auto-flow: row
    &__slider
      width: 100%
      height: 226px
      background-color: #333
      border-radius: 5px
      // overflow: hidden
    &__panel
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      height: 72px
    &__title
      font-size: 20px
      font-weight: bold
      font-family: 'PT Sans'
    &__action
      +tdn
      cursor: pointer
      font-size: 14px
      color: $color-accent
    &__sort
      font-size: 0
    &__sort-button
      margin: 0
      padding: 0
      font-family: 'PT Sans'
      cursor: pointer
      color: $color-accent
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

  .cms-new-page
    display: flex
    flex-direction: row
    &__content
      width: 100%
      height: 100vh
      display: flex
      flex-grow: 1
      overflow: auto
    &__rows
      display: flex
      flex-direction: column
      flex-grow: 1
    &__columns
      display: flex
      flex-direction: row
      flex-grow: 1
    &__title
      font-weight: bold
      font-size: 18px
    &__panel
      height: 60px
      display: flex
      flex-shrink: 0
      justify-content: space-between
      align-items: center
      font-weight: bold
      font-size: 18px
      padding-left: 30px
      padding-right: 30px
      z-index: 100
      box-shadow: 0 1px 0 rgba(black, 0.1)
      background-color: #F6F7FB

  @keyframes gradientanimation
    0%
      background-position: 0% 0%
    50%
      background-position: 100% 0%
    100%
      background-position: 0% 0%

  @import '~/styles/media.sass'

</style>
