<template>
  <div class="cms-new-page auth">
    <div class="auth__container">
      <div class="auth__grid">
        <div class="changelog">
          <div class="changelog__title">Изменения на {{ changelog.date }}</div>
          <div class="changelog__body">
            <div v-for="(item, index) in changelog.log" :key="index" class="changelog__item">
              <div class="changelog__place">{{ item.place }}</div>
              <ul class="changelog__list">
                <li v-for="(text, id) in item.text" :key="id" class="changelog__text">{{ text }}</li>
              </ul>
            </div>
          </div>
        </div>
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
      changelog: this.$store.state.changelog,
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
  @import '~/styles/auth.sass'

  .auth
    width: 100%
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

    &__container
      width: 1200px
      margin: 0 auto

    &__grid
      display: grid
      grid-template-columns: 1fr 1fr
      justify-content: center
      align-items: center
      justify-items: center

  .changelog
    border-radius: 5px
    box-shadow: 0 10px 40px rgba(black, 0.1)
    border: 1px solid rgba(black, 0.05)
    max-width: 400px

    &__title
      display: flex
      align-items: center
      font-size: 18px
      font-weight: bold
      height: 48px
      padding-left: 15px
      padding-right: 15px
      box-shadow: 0 1px 0px rgba(black, 0.1)

    &__body
      padding: 15px

    &__item
      margin-bottom: 15px
      &:last-child
        margin-bottom: 0

    &__list
      list-style-type: none
      margin: 0
      padding: 0
      padding-left: 15px

    &__place
      font-weight: bold
      margin-bottom: 5px

    &__text
      position: relative
      color: rgba(black, 0.6)
      font-size: 14px
      line-height: 16px
      margin-bottom: 3px
      &:last-child
        margin-bottom: 0

      &::after
        position: absolute
        left: -9px
        top: 6px
        content: ''
        background-color: rgba(black, 0.75)
        width: 4px
        height: 4px
        border-radius: 50%

</style>
