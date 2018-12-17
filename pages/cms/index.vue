<template>
  <div class="cms-new-page cms-new-page">
    <div class="cms-new-page__content cms-new-page__content--auth">
      <div class="cms-auth">
        <div class="cms-auth__title">Авторизация</div>
        <div class="cms-auth__tabs">
          <button
            type="button"
            class="cms-auth__tab"
            :class="type === 'social' ? 'cms-auth__tab--active' : ''"
            @click="switchType('social')"
          >Облачная</button>
          <button
            type="button"
            class="cms-auth__tab"
            :class="type === 'social' ? '' : 'cms-auth__tab--active'"
            @click="switchType('local')"
          >Локально</button>
        </div>
        <div v-if="type === 'social'" class="cms-auth__page">
          <button
            type="button"
            class="button cms-auth__page-button"
            @click="azure"
          >Войти с помощью Microsoft</button>
        </div>
        <div v-else class="cms-auth__page">
          <div class="cms-auth__field">
            <input type="text" name="username" placeholder="Логин" v-model="username">
          </div>
          <div class="cms-auth__field">
            <input type="password" name="password" placeholder="Пароль" v-model="password">
          </div>
          <div class="cms-auth__buttons">
            <div type="button" class="button" @click="local">Войти</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  mounted() {},
  data() {
    return {
      username: '',
      password: '',
      type: 'social',
    };
  },
  methods: {
    switchType(to) {
      this.type = to;
    },
    azure() {
      this.$auth.loginWith('social');
    },
    local() {
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password,
        },
      });
    },
  },
};
</script>


<style lang="sass">
  @import '~/styles/vars.sass'

  .cms-new-page
    &__content--auth
      justify-content: center
      align-items: center
  .cms-auth
    margin: 0 auto
    width: 320px
    padding: 20px
    background-color: rgba(black, 0.01)
    border-radius: 5px
    box-shadow: 0 25px 65px rgba(black, 0.1), 0 5px 75px rgba(black, 0.05)
    border: 2px solid rgba(black, 0.1)
    &__tabs
      width: 100%
      display: flex
      border-radius: 5px
      overflow: hidden
      margin-bottom: 15px
    &__tab
      cursor: pointer
      width: 50%
      border: none
      outline: none
      padding-top: 7px
      padding-bottom: 7px
      font-family: "PT Sans"
      background-color: rgba(black, 0.05)
      &--active
        background-color: $color-accent
        color: white
        font-weight: bold
    &__page
    &__page-button
      height: 36px
      font-size: 16px
      padding-left: 15px
      padding-right: 15px
      width: 100%
    &__title
      text-align: center
      font-weight: bold
      margin-bottom: 20px
      font-size: 18px
    &__field
      margin-bottom: 20px
      input
        width: 100%
        height: 36px
        border: none
        border-radius: 5px
        border: 2px solid rgba(black, 0.15)
        padding-left: 15px
        transition: all ease-in-out 0.15s
        &:focus
          border: 0
          outline: 0
          border: 2px solid rgba($color-accent, 1)
    &__buttons
      .button
        height: 36px
        font-size: 16px
        margin-bottom: 10px
        &:last-child
          margin-bottom: 0
</style>
