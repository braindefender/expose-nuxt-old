<template>
  <div class="sidebar">
    <div class="sidebar__panel">
      Конструктор выставок
    </div>
    <div class="sidebar__content">

      <div class="sidebar-account">
        <div class="sidebar-account__avatar-box">
          <div class="sidebar-account__avatar"></div>
        </div>
        <div class="sidebar-account__text">
          <div class="sidebar-account__name">Васильева Елена Семёновна</div>
          <div class="sidebar-account__mail">makakakakala@gpntbsib.ru</div>
        </div>
        <div class="sidebar-account__panel">
          <p>Модерируемых выставок:</p>
          <p>3</p>
        </div>
      </div>

      <div class="sidebar-button-box">
        <div class="sidebar-button">
          <div class="sidebar-button__icon"></div>
          <div class="sidebar-button__text">Информация</div>
        </div>
        <div class="sidebar-button">
          <div class="sidebar-button__icon"></div>
          <div class="sidebar-button__text">Сортировка</div>
        </div>
        <div class="sidebar-button">
          <div class="sidebar-button__icon"></div>
          <div class="sidebar-button__text">Редактирование</div>
        </div>
        <div class="sidebar-button">
          <div class="sidebar-button__icon"></div>
          <div class="sidebar-button__text">Предпоказ</div>
        </div>
      </div>

      <div class="sidebar-button">
        <div class="sidebar-button__icon"></div>
        <div class="sidebar-button__text">Выйти из аккаунта</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {};
  },
};
</script>

<style lang="sass">
  .sidebar
    background-color: #262640
    color: white
    height: 100vh
    max-width: 360px
    min-width: 360px
    overflow: auto
    &__content
      padding-top: 30px
      padding-left: 30px
      padding-right: 30px
      padding-bottom: 30px
      display: flex
      flex-direction: column
      justify-content: space-between
      flex-grow: 1
      height: calc(100% - 60px)
    &__panel
      height: 60px
      display: flex
      justify-content: flex-start
      align-items: center
      font-weight: bold
      font-size: 18px
      padding-left: 30px
      padding-right: 30px
      box-shadow: 0 1px 0 rgba(white, 0.1)

  .sidebar-button-box
    display: flex
    flex-direction: column
    .sidebar-button
      margin-bottom: 20px
      &:last-child
        margin-bottom: 0

  .sidebar-button
    padding-top: 20px
    padding-left: 20px
    padding-right: 20px
    padding-bottom: 20px
    background-color: rgba(white, 0.05)
    display: flex
    flex-direction: row
    border-radius: 10px
    transition: all ease 0.15s
    cursor: pointer
    &__icon
      width: 24px
      height: 24px
      margin-right: 20px
      background-color: rgba(white, 0.05)
    &__text
      font-weight: bold
      color: rgba(white, 0.5)
      font-size: 18px
    &:hover
      background-color: rgba(white, 0.1)

  .sidebar-account
    padding-top: 30px
    padding-left: 20px
    padding-right: 20px
    padding-bottom: 20px
    border-radius: 10px
    background-color: rgba(white, 0.05)
    &__avatar-box
      margin-bottom: 20px
      display: flex
      align-items: center
      justify-content: center
    &__avatar
      border-radius: 50%
      overflow: hidden
      width: 96px
      height: 96px
      background-color: rgba(white, 0.1)
      img
        width: 96px
        height: 96px
    &__text
      margin-bottom: 20px
      text-align: center
    &__name
      font-weight: bold
      font-size: 18px
      color: white
    &__mail
      font-size: 16px
      color: rgba(white, 0.5)
    &__panel
      padding-left: 20px
      padding-right: 20px
      min-height: 48px
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 16px
      color: rgba(white, 0.5)
      background-color: rgba(white, 0.05)
      border-radius: 5px
</style>
